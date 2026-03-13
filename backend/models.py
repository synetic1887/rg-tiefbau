"""Database models for RG Tiefbau CMS, Tickets, and Chat."""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class SiteContent(Base):
    """Editable website content blocks."""
    __tablename__ = "site_content"

    id = Column(Integer, primary_key=True)
    section = Column(String(100), nullable=False)  # e.g. "hero", "about", "services"
    key = Column(String(100), nullable=False)       # e.g. "title", "subtitle", "description"
    value = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<SiteContent {self.section}.{self.key}>"


class Ticket(Base):
    """Customer inquiry / contact form submission."""
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    company = Column(String(200), default="")
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=False)
    service = Column(String(100), nullable=False)
    location = Column(String(200), default="")
    message = Column(Text, nullable=False)
    status = Column(String(50), default="neu")  # neu, in_bearbeitung, erledigt, archiviert
    notes = Column(Text, default="")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    chat_messages = relationship("ChatMessage", back_populates="ticket", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Ticket #{self.id} {self.name} - {self.status}>"


class ChatSession(Base):
    """Live chat session."""
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True)
    session_id = Column(String(100), unique=True, nullable=False)
    visitor_name = Column(String(200), default="Besucher")
    status = Column(String(50), default="active")  # active, closed
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<ChatSession {self.session_id}>"


class ChatMessage(Base):
    """Individual chat message."""
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=True)
    sender = Column(String(50), nullable=False)  # "visitor" or "admin"
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    session = relationship("ChatSession", back_populates="messages")
    ticket = relationship("Ticket", back_populates="chat_messages")

    def __repr__(self):
        return f"<ChatMessage {self.sender}: {self.message[:30]}>"
