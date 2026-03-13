"""RG Tiefbau — FastAPI Backend (CMS, Tickets, Chat)."""

from dotenv import load_dotenv
load_dotenv()

import os
import uuid
import json
import logging
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy import select, update, delete, func
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
import hashlib
import hmac

logger = logging.getLogger("rg-tiefbau")

from database import get_db, init_db
from models import AdminUser, SiteContent, Ticket, ChatSession, ChatMessage

# --- App Setup ---
app = FastAPI(title="RG Tiefbau CMS", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Auth Config ---
SECRET_KEY = os.environ.get("SECRET_KEY", "rg-tiefbau-secret-key-change-in-production")

# --- Email Config (Resend) ---
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
EMAIL_FROM = os.environ.get("EMAIL_FROM", "onboarding@resend.dev")
EMAIL_TO = os.environ.get("EMAIL_TO", "info@rg-tiefbau.de")

# --- WebSocket connections ---
active_connections: dict[str, WebSocket] = {}        # session_id -> visitor ws
admin_connections: dict[str, WebSocket] = {}          # session_id -> admin ws
admin_broadcast_connections: list[WebSocket] = []     # all admin dashboard ws


# --- Pydantic Schemas ---
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TicketCreate(BaseModel):
    name: str
    company: str = ""
    email: str
    phone: str
    service: str
    location: str = ""
    message: str

class TicketUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class ContentUpdate(BaseModel):
    section: str
    key: str
    value: str

class ChatMessageIn(BaseModel):
    message: str
    session_id: Optional[str] = None


# --- Auth Helpers ---
def hash_password(password: str) -> str:
    return hashlib.sha256((password + SECRET_KEY).encode()).hexdigest()

def create_token(username: str) -> str:
    import base64, json as _json
    payload = {"sub": username, "exp": (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()}
    data = base64.urlsafe_b64encode(_json.dumps(payload).encode()).decode()
    sig = hmac.new(SECRET_KEY.encode(), data.encode(), hashlib.sha256).hexdigest()
    return f"{data}.{sig}"

def verify_token(token: str) -> Optional[str]:
    try:
        import base64, json as _json
        data, sig = token.rsplit(".", 1)
        expected = hmac.new(SECRET_KEY.encode(), data.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return None
        payload = _json.loads(base64.urlsafe_b64decode(data))
        exp = datetime.fromisoformat(payload["exp"])
        if datetime.now(timezone.utc) > exp:
            return None
        return payload.get("sub")
    except Exception:
        return None

async def get_current_admin(token: str = Query(...), db: AsyncSession = Depends(get_db)):
    username = verify_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Ungültiger Token")
    result = await db.execute(select(AdminUser).where(AdminUser.username == username))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Benutzer nicht gefunden")
    return user


# --- Startup ---
@app.on_event("startup")
async def startup():
    await init_db()
    # Create default admin user if none exists
    async for db in get_db():
        result = await db.execute(select(AdminUser))
        if not result.scalar_one_or_none():
            admin = AdminUser(
                username="admin",
                password_hash=hash_password("admin123")
            )
            db.add(admin)
            await db.commit()
        # Seed default content if empty
        result = await db.execute(select(SiteContent))
        if not result.first():
            await seed_content(db)
        break


async def seed_content(db: AsyncSession):
    """Seed initial website content."""
    defaults = [
        ("hero", "label", "Tiefbau & Erdarbeiten aus Butzbach"),
        ("hero", "title", "Wir bewegen Erde und schaffen Grundlagen."),
        ("hero", "subtitle", "RG Tiefbau ist Ihr zuverlässiger Partner für professionelle Erdarbeiten, Tiefbau und Hochbau — von der Baugrube bis zum fertigen Industriebau, deutschlandweit."),
        ("about", "title", "Kompetenz und Erfahrung aus dem Herzen Hessens"),
        ("about", "subtitle", "Mit Sitz in Butzbach verbinden wir regionale Verwurzelung mit deutschlandweiter Einsatzbereitschaft. Unser erfahrenes Team realisiert Projekte jeder Größenordnung — von der kleinen Gartengestaltung bis zum großen Industriebau."),
        ("services", "title", "Unser Leistungsspektrum"),
        ("services", "subtitle", "Von Erdarbeiten über Hochbau bis zum Garten- und Landschaftsbau — wir bieten Ihnen das komplette Paket aus einer Hand."),
        ("contact", "title", "Ihr Projekt besprechen"),
        ("contact", "subtitle", "Sie planen ein Bauprojekt? Kontaktieren Sie uns für ein unverbindliches Angebot. Wir melden uns innerhalb von 24 Stunden bei Ihnen."),
        ("contact", "address", "RG Tiefbau\n35510 Butzbach"),
        ("contact", "phone", "+49 (0) 6033 / XXX XXX"),
        ("contact", "email", "info@rg-tiefbau.de"),
        ("contact", "hours", "Mo — Fr: 07:00 — 17:00 Uhr"),
        ("stats", "projects", "200"),
        ("stats", "experience", "20"),
        ("stats", "employees", "35"),
        ("stats", "states", "16"),
    ]
    for section, key, value in defaults:
        db.add(SiteContent(section=section, key=key, value=value))
    await db.commit()


# =============================================
# AUTH ROUTES
# =============================================
@app.post("/api/auth/login", response_model=TokenResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AdminUser).where(AdminUser.username == req.username))
    user = result.scalar_one_or_none()
    if not user or user.password_hash != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Ungültige Anmeldedaten")
    token = create_token(user.username)
    return TokenResponse(access_token=token)


# =============================================
# CONTENT / CMS ROUTES
# =============================================
@app.get("/api/content")
async def get_all_content(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteContent))
    items = result.scalars().all()
    content = {}
    for item in items:
        if item.section not in content:
            content[item.section] = {}
        content[item.section][item.key] = {
            "id": item.id,
            "value": item.value,
            "updated_at": item.updated_at.isoformat() if item.updated_at else None
        }
    return content

@app.put("/api/content")
async def update_content(
    data: ContentUpdate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    result = await db.execute(
        select(SiteContent).where(
            SiteContent.section == data.section,
            SiteContent.key == data.key
        )
    )
    item = result.scalar_one_or_none()
    if item:
        item.value = data.value
        item.updated_at = datetime.now(timezone.utc)
    else:
        item = SiteContent(section=data.section, key=data.key, value=data.value)
        db.add(item)
    await db.commit()
    return {"status": "ok", "section": data.section, "key": data.key}

@app.delete("/api/content/{content_id}")
async def delete_content(
    content_id: int,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    await db.execute(delete(SiteContent).where(SiteContent.id == content_id))
    await db.commit()
    return {"status": "deleted"}


# =============================================
# TICKET ROUTES
# =============================================
def send_ticket_email(ticket_data: TicketCreate):
    """Send notification email via Resend API. Failures are logged, never block the request."""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured — skipping email notification")
        return

    service_labels = {
        "erdaushub": "Erdaushub",
        "erdarbeiten": "Erdarbeiten",
        "hochbau": "Hochbauarbeiten",
        "industriebau": "Industriebauten — Erdbau",
        "galabau": "Garten- & Landschaftsbau",
        "sonstiges": "Sonstiges",
    }

    service = service_labels.get(ticket_data.service, ticket_data.service)

    html_body = f"""<html><body style="font-family:sans-serif;color:#333;">
<h2 style="color:#C8902E;">Neue Kontaktanfrage</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">{ticket_data.name}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Firma</td><td style="padding:8px;border-bottom:1px solid #eee;">{ticket_data.company or '—'}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:{ticket_data.email}">{ticket_data.email}</a></td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:{ticket_data.phone}">{ticket_data.phone}</a></td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Leistung</td><td style="padding:8px;border-bottom:1px solid #eee;">{service}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Standort</td><td style="padding:8px;border-bottom:1px solid #eee;">{ticket_data.location or '—'}</td></tr>
</table>
<h3 style="margin-top:20px;">Nachricht:</h3>
<p style="background:#f9f9f9;padding:16px;border-left:4px solid #C8902E;">{ticket_data.message}</p>
<hr style="margin-top:30px;border:none;border-top:1px solid #eee;">
<p style="font-size:12px;color:#999;">Diese E-Mail wurde automatisch von rg-tiefbau.de gesendet.</p>
</body></html>"""

    try:
        resp = httpx.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
            json={
                "from": EMAIL_FROM,
                "to": [EMAIL_TO],
                "subject": f"Neue Anfrage: {service} — {ticket_data.name}",
                "html": html_body,
            },
            timeout=10,
        )
        if resp.status_code == 200:
            result = resp.json()
            logger.info(f"Email sent via Resend: {result.get('id')} for {ticket_data.name}")
        else:
            logger.error(f"Resend API error {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.error(f"Failed to send email via Resend: {e}")


@app.post("/api/tickets")
async def create_ticket(data: TicketCreate, db: AsyncSession = Depends(get_db)):
    ticket = Ticket(
        name=data.name,
        company=data.company,
        email=data.email,
        phone=data.phone,
        service=data.service,
        location=data.location,
        message=data.message,
    )
    db.add(ticket)
    await db.commit()
    await db.refresh(ticket)

    # Send email notification
    try:
        send_ticket_email(data)
    except Exception as e:
        logger.error(f"Email notification failed: {e}")

    # Notify admin dashboards
    for ws in admin_broadcast_connections:
        try:
            await ws.send_json({
                "type": "new_ticket",
                "ticket": {
                    "id": ticket.id,
                    "name": ticket.name,
                    "service": ticket.service,
                    "status": ticket.status,
                    "created_at": ticket.created_at.isoformat()
                }
            })
        except Exception:
            pass

    return {"status": "ok", "ticket_id": ticket.id}

@app.get("/api/tickets")
async def list_tickets(
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    query = select(Ticket).order_by(Ticket.created_at.desc())
    if status:
        query = query.where(Ticket.status == status)
    result = await db.execute(query)
    tickets = result.scalars().all()
    return [
        {
            "id": t.id,
            "name": t.name,
            "company": t.company,
            "email": t.email,
            "phone": t.phone,
            "service": t.service,
            "location": t.location,
            "message": t.message,
            "status": t.status,
            "notes": t.notes,
            "created_at": t.created_at.isoformat(),
            "updated_at": t.updated_at.isoformat(),
        }
        for t in tickets
    ]

@app.get("/api/tickets/{ticket_id}")
async def get_ticket(
    ticket_id: int,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket nicht gefunden")
    return {
        "id": ticket.id,
        "name": ticket.name,
        "company": ticket.company,
        "email": ticket.email,
        "phone": ticket.phone,
        "service": ticket.service,
        "location": ticket.location,
        "message": ticket.message,
        "status": ticket.status,
        "notes": ticket.notes,
        "created_at": ticket.created_at.isoformat(),
        "updated_at": ticket.updated_at.isoformat(),
    }

@app.patch("/api/tickets/{ticket_id}")
async def update_ticket(
    ticket_id: int,
    data: TicketUpdate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket nicht gefunden")
    if data.status is not None:
        ticket.status = data.status
    if data.notes is not None:
        ticket.notes = data.notes
    ticket.updated_at = datetime.now(timezone.utc)
    await db.commit()
    return {"status": "ok"}

@app.delete("/api/tickets/{ticket_id}")
async def delete_ticket(
    ticket_id: int,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    await db.execute(delete(Ticket).where(Ticket.id == ticket_id))
    await db.commit()
    return {"status": "deleted"}

@app.get("/api/tickets/stats/overview")
async def ticket_stats(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    total = (await db.execute(select(func.count(Ticket.id)))).scalar()
    neu = (await db.execute(select(func.count(Ticket.id)).where(Ticket.status == "neu"))).scalar()
    in_bearbeitung = (await db.execute(
        select(func.count(Ticket.id)).where(Ticket.status == "in_bearbeitung")
    )).scalar()
    erledigt = (await db.execute(
        select(func.count(Ticket.id)).where(Ticket.status == "erledigt")
    )).scalar()
    return {
        "total": total,
        "neu": neu,
        "in_bearbeitung": in_bearbeitung,
        "erledigt": erledigt
    }


# =============================================
# CHAT ROUTES & WEBSOCKET
# =============================================
@app.get("/api/chat/sessions")
async def list_chat_sessions(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    result = await db.execute(
        select(ChatSession).order_by(ChatSession.updated_at.desc())
    )
    sessions = result.scalars().all()
    return [
        {
            "id": s.id,
            "session_id": s.session_id,
            "visitor_name": s.visitor_name,
            "status": s.status,
            "created_at": s.created_at.isoformat(),
            "updated_at": s.updated_at.isoformat(),
        }
        for s in sessions
    ]

@app.get("/api/chat/sessions/{session_id}/messages")
async def get_chat_messages(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    result = await db.execute(
        select(ChatSession).where(ChatSession.session_id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session nicht gefunden")

    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at)
    )
    messages = result.scalars().all()
    return [
        {
            "id": m.id,
            "sender": m.sender,
            "message": m.message,
            "created_at": m.created_at.isoformat(),
        }
        for m in messages
    ]


# --- Visitor WebSocket ---
@app.websocket("/api/chat/ws")
async def chat_websocket(websocket: WebSocket, db: AsyncSession = Depends(get_db)):
    await websocket.accept()
    session_id = str(uuid.uuid4())[:8]

    # Create chat session in DB
    chat_session = ChatSession(session_id=session_id)
    db.add(chat_session)
    await db.commit()
    await db.refresh(chat_session)

    active_connections[session_id] = websocket

    # Send session ID to visitor
    await websocket.send_json({"session_id": session_id})

    # Notify admins about new chat
    for aws in admin_broadcast_connections:
        try:
            await aws.send_json({
                "type": "new_chat",
                "session_id": session_id,
                "created_at": chat_session.created_at.isoformat()
            })
        except Exception:
            pass

    try:
        while True:
            data = await websocket.receive_json()
            msg_text = data.get("message", "")

            # Save message
            msg = ChatMessage(
                session_id=chat_session.id,
                sender="visitor",
                message=msg_text
            )
            db.add(msg)
            await db.commit()

            # Forward to admin if connected
            admin_ws = admin_connections.get(session_id)
            if admin_ws:
                try:
                    await admin_ws.send_json({
                        "type": "visitor_message",
                        "session_id": session_id,
                        "message": msg_text,
                        "created_at": msg.created_at.isoformat()
                    })
                except Exception:
                    pass

            # Notify all admin dashboards
            for aws in admin_broadcast_connections:
                try:
                    await aws.send_json({
                        "type": "visitor_message",
                        "session_id": session_id,
                        "message": msg_text
                    })
                except Exception:
                    pass

    except WebSocketDisconnect:
        active_connections.pop(session_id, None)
        chat_session.status = "closed"
        chat_session.updated_at = datetime.now(timezone.utc)
        await db.commit()


# --- Admin WebSocket for chat ---
@app.websocket("/api/chat/admin/ws")
async def admin_chat_websocket(websocket: WebSocket, db: AsyncSession = Depends(get_db)):
    await websocket.accept()
    admin_broadcast_connections.append(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")

            if action == "join_chat":
                sid = data.get("session_id")
                admin_connections[sid] = websocket

            elif action == "send_message":
                sid = data.get("session_id")
                msg_text = data.get("message", "")

                # Find chat session
                result = await db.execute(
                    select(ChatSession).where(ChatSession.session_id == sid)
                )
                session = result.scalar_one_or_none()
                if session:
                    msg = ChatMessage(
                        session_id=session.id,
                        sender="admin",
                        message=msg_text
                    )
                    db.add(msg)
                    await db.commit()

                    # Forward to visitor
                    visitor_ws = active_connections.get(sid)
                    if visitor_ws:
                        try:
                            await visitor_ws.send_json({
                                "message": msg_text
                            })
                        except Exception:
                            pass

    except WebSocketDisconnect:
        admin_broadcast_connections.remove(websocket)
        # Clean up admin connections
        for sid, ws in list(admin_connections.items()):
            if ws == websocket:
                admin_connections.pop(sid, None)


# =============================================
# STATIC FILES & SPA
# =============================================
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..")

app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")
app.mount("/img", StaticFiles(directory=os.path.join(FRONTEND_DIR, "img")), name="img")
app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")

@app.get("/admin")
async def serve_admin():
    return FileResponse(os.path.join(FRONTEND_DIR, "admin.html"))

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
