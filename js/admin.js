/* ============================================
   RG Tiefbau — Admin Panel JavaScript
   ============================================ */

const API = window.location.origin + '/api';
const WS_BASE = (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.host + '/api';
let token = localStorage.getItem('rg_token') || '';
let adminWs = null;
let activeChat = null;

// --- Helpers ---
function api(path, opts = {}) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${API}${path}${token ? `${sep}token=${token}` : ''}`;
  return fetch(url, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts
  });
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function formatService(val) {
  const map = {
    erdauszug: 'Erdauszug', erdarbeiten: 'Erdarbeiten', vorverlegung: 'Vorverlegung',
    hochbau: 'Hochbauarbeiten', industriebau: 'Industriebauten', galabau: 'GaLaBau',
    sonstiges: 'Sonstiges'
  };
  return map[val] || val;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (token) {
    showAdmin();
  }

  // Login form
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        token = data.access_token;
        localStorage.setItem('rg_token', token);
        showAdmin();
      } else {
        document.getElementById('loginError').textContent = 'Ungültige Anmeldedaten';
      }
    } catch {
      document.getElementById('loginError').textContent = 'Server nicht erreichbar';
    }
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    token = '';
    localStorage.removeItem('rg_token');
    document.getElementById('adminLayout').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
  });

  // Sidebar navigation
  document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      switchSection(section);
    });
  });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadTickets(tab.dataset.filter);
    });
  });

  // Close ticket modal
  document.getElementById('closeTicketModal').addEventListener('click', () => {
    document.getElementById('ticketModal').style.display = 'none';
  });

  document.getElementById('ticketModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('ticketModal')) {
      document.getElementById('ticketModal').style.display = 'none';
    }
  });

  // Admin chat send
  document.getElementById('adminMsgSend').addEventListener('click', sendAdminMessage);
  document.getElementById('adminMsgInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendAdminMessage();
  });
});


function showAdmin() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminLayout').style.display = 'flex';
  loadDashboard();
  connectAdminWs();
}

function switchSection(name) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  const sectionId = 'section' + name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById(sectionId).style.display = 'block';

  const link = document.querySelector(`.sidebar-link[data-section="${name}"]`);
  if (link) link.classList.add('active');

  if (name === 'dashboard') loadDashboard();
  if (name === 'tickets') loadTickets('all');
  if (name === 'chat') loadChatSessions();
  if (name === 'content') loadContent();
}


// =============================================
// DASHBOARD
// =============================================
async function loadDashboard() {
  try {
    const [statsRes, ticketsRes] = await Promise.all([
      api('/tickets/stats/overview'),
      api('/tickets')
    ]);

    if (statsRes.ok) {
      const stats = await statsRes.json();
      document.getElementById('statTotal').textContent = stats.total;
      document.getElementById('statNeu').textContent = stats.neu;
      document.getElementById('statBearbeitung').textContent = stats.in_bearbeitung;
      document.getElementById('statErledigt').textContent = stats.erledigt;
      document.getElementById('ticketBadge').textContent = stats.neu;
    }

    if (ticketsRes.ok) {
      const tickets = await ticketsRes.json();
      const tbody = document.getElementById('dashboardTickets');
      tbody.innerHTML = tickets.slice(0, 5).map(t => `
        <tr>
          <td>#${t.id}</td>
          <td>${escapeHtml(t.name)}</td>
          <td>${formatService(t.service)}</td>
          <td><span class="status-badge ${t.status}">${t.status.replace('_', ' ')}</span></td>
          <td>${formatDate(t.created_at)}</td>
          <td><button class="btn-sm blue" onclick="openTicket(${t.id})">Details</button></td>
        </tr>
      `).join('');
    }
  } catch {
    console.log('Dashboard: Backend nicht erreichbar');
  }
}


// =============================================
// TICKETS
// =============================================
async function loadTickets(filter) {
  try {
    const url = filter === 'all' ? '/tickets' : `/tickets?status=${filter}`;
    const res = await api(url);
    if (!res.ok) return;

    const tickets = await res.json();
    const tbody = document.getElementById('ticketsList');
    tbody.innerHTML = tickets.map(t => `
      <tr>
        <td>#${t.id}</td>
        <td>${escapeHtml(t.name)}</td>
        <td>${escapeHtml(t.company || '-')}</td>
        <td>${formatService(t.service)}</td>
        <td>${escapeHtml(t.location || '-')}</td>
        <td><span class="status-badge ${t.status}">${t.status.replace('_', ' ')}</span></td>
        <td>${formatDate(t.created_at)}</td>
        <td>
          <button class="btn-sm blue" onclick="openTicket(${t.id})">Details</button>
        </td>
      </tr>
    `).join('');
  } catch {
    console.log('Tickets laden fehlgeschlagen');
  }
}

async function openTicket(id) {
  try {
    const res = await api(`/tickets/${id}`);
    if (!res.ok) return;

    const t = await res.json();
    const body = document.getElementById('ticketModalBody');
    body.innerHTML = `
      <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${escapeHtml(t.name)}</span></div>
      <div class="detail-row"><span class="detail-label">Firma:</span><span class="detail-value">${escapeHtml(t.company || '-')}</span></div>
      <div class="detail-row"><span class="detail-label">E-Mail:</span><span class="detail-value"><a href="mailto:${escapeHtml(t.email)}">${escapeHtml(t.email)}</a></span></div>
      <div class="detail-row"><span class="detail-label">Telefon:</span><span class="detail-value"><a href="tel:${escapeHtml(t.phone)}">${escapeHtml(t.phone)}</a></span></div>
      <div class="detail-row"><span class="detail-label">Leistung:</span><span class="detail-value">${formatService(t.service)}</span></div>
      <div class="detail-row"><span class="detail-label">Ort:</span><span class="detail-value">${escapeHtml(t.location || '-')}</span></div>
      <div class="detail-row"><span class="detail-label">Status:</span><span class="detail-value"><span class="status-badge ${t.status}">${t.status.replace('_', ' ')}</span></span></div>
      <div class="detail-row"><span class="detail-label">Erstellt:</span><span class="detail-value">${formatDate(t.created_at)}</span></div>
      <div class="detail-row"><span class="detail-label">Nachricht:</span></div>
      <p style="padding:16px;background:var(--bg);border-radius:8px;margin-bottom:16px;font-size:0.9375rem;color:var(--text-light);line-height:1.7;">${escapeHtml(t.message)}</p>

      <div class="form-group">
        <label>Interne Notizen</label>
        <textarea id="ticketNotes" placeholder="Notizen zum Ticket...">${escapeHtml(t.notes || '')}</textarea>
      </div>

      <div class="detail-actions">
        <button class="btn-sm orange" onclick="updateTicketStatus(${t.id}, 'in_bearbeitung')">In Bearbeitung</button>
        <button class="btn-sm green" onclick="updateTicketStatus(${t.id}, 'erledigt')">Erledigt</button>
        <button class="btn-sm gray" onclick="updateTicketStatus(${t.id}, 'archiviert')">Archivieren</button>
        <button class="btn-sm blue" onclick="saveTicketNotes(${t.id})">Notizen speichern</button>
        <button class="btn-sm red" onclick="deleteTicket(${t.id})">Löschen</button>
      </div>
    `;

    document.getElementById('ticketModal').style.display = 'flex';
  } catch {
    console.log('Ticket laden fehlgeschlagen');
  }
}

async function updateTicketStatus(id, status) {
  await api(`/tickets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  document.getElementById('ticketModal').style.display = 'none';
  loadTickets('all');
  loadDashboard();
}

async function saveTicketNotes(id) {
  const notes = document.getElementById('ticketNotes').value;
  await api(`/tickets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ notes })
  });
  alert('Notizen gespeichert!');
}

async function deleteTicket(id) {
  if (!confirm('Ticket wirklich löschen?')) return;
  await api(`/tickets/${id}`, { method: 'DELETE' });
  document.getElementById('ticketModal').style.display = 'none';
  loadTickets('all');
  loadDashboard();
}


// =============================================
// CHAT
// =============================================
function connectAdminWs() {
  try {
    adminWs = new WebSocket(`${WS_BASE}/chat/admin/ws`);

    adminWs.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'new_chat') {
        loadChatSessions();
        const badge = document.getElementById('chatBadge');
        badge.textContent = parseInt(badge.textContent) + 1;
      }

      if (data.type === 'visitor_message' && data.session_id === activeChat) {
        appendAdminChatMsg(data.message, 'visitor', data.created_at);
      }

      if (data.type === 'new_ticket') {
        const badge = document.getElementById('ticketBadge');
        badge.textContent = parseInt(badge.textContent) + 1;
        loadDashboard();
      }
    };

    adminWs.onclose = () => {
      setTimeout(connectAdminWs, 3000);
    };
  } catch {
    setTimeout(connectAdminWs, 3000);
  }
}

async function loadChatSessions() {
  try {
    const res = await api('/chat/sessions');
    if (!res.ok) return;

    const sessions = await res.json();
    const list = document.getElementById('chatSessionsList');

    const activeSessions = sessions.filter(s => s.status === 'active');
    document.getElementById('chatBadge').textContent = activeSessions.length;

    list.innerHTML = sessions.map(s => `
      <div class="chat-session-item ${s.session_id === activeChat ? 'active' : ''}"
           onclick="openChatSession('${s.session_id}')">
        <h4>
          <span class="chat-session-status ${s.status}"></span>
          ${escapeHtml(s.visitor_name)} (${s.session_id})
        </h4>
        <p>${formatDate(s.created_at)}</p>
      </div>
    `).join('') || '<p style="padding:20px;color:var(--text-muted);">Keine Chat-Sessions vorhanden.</p>';
  } catch {
    console.log('Chat-Sessions laden fehlgeschlagen');
  }
}

async function openChatSession(sessionId) {
  activeChat = sessionId;

  // Join the chat via WebSocket
  if (adminWs && adminWs.readyState === WebSocket.OPEN) {
    adminWs.send(JSON.stringify({ action: 'join_chat', session_id: sessionId }));
  }

  // Load existing messages
  try {
    const res = await api(`/chat/sessions/${sessionId}/messages`);
    if (!res.ok) return;

    const messages = await res.json();
    const container = document.getElementById('adminChatMessages');
    container.innerHTML = messages.map(m => `
      <div class="chat-msg ${m.sender}">
        <p>${escapeHtml(m.message)}</p>
        <span class="chat-msg-time">${formatDate(m.created_at)}</span>
      </div>
    `).join('') || '<p class="chat-placeholder">Noch keine Nachrichten.</p>';

    container.scrollTop = container.scrollHeight;

    document.getElementById('adminChatInput').style.display = 'flex';

    // Refresh session list to show active state
    loadChatSessions();
  } catch {
    console.log('Chat-Nachrichten laden fehlgeschlagen');
  }
}

function appendAdminChatMsg(text, sender, timestamp) {
  const container = document.getElementById('adminChatMessages');
  const placeholder = container.querySelector('.chat-placeholder');
  if (placeholder) placeholder.remove();

  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.innerHTML = `
    <p>${escapeHtml(text)}</p>
    <span class="chat-msg-time">${timestamp ? formatDate(timestamp) : 'Jetzt'}</span>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendAdminMessage() {
  const input = document.getElementById('adminMsgInput');
  const text = input.value.trim();
  if (!text || !activeChat) return;

  if (adminWs && adminWs.readyState === WebSocket.OPEN) {
    adminWs.send(JSON.stringify({
      action: 'send_message',
      session_id: activeChat,
      message: text
    }));
  }

  appendAdminChatMsg(text, 'admin');
  input.value = '';
}


// =============================================
// CONTENT CMS
// =============================================
async function loadContent() {
  try {
    const res = await api('/content');
    if (!res.ok) return;

    const content = await res.json();
    const editor = document.getElementById('contentEditor');
    let html = '';

    const sectionNames = {
      hero: 'Hero-Bereich',
      about: 'Über uns',
      services: 'Leistungen',
      contact: 'Kontakt',
      stats: 'Statistiken'
    };

    for (const [section, fields] of Object.entries(content)) {
      html += `<div class="content-section"><h3>${sectionNames[section] || section}</h3>`;

      for (const [key, data] of Object.entries(fields)) {
        const isLong = data.value.length > 100;
        const inputType = isLong ? 'textarea' : 'input';
        const fieldId = `content_${section}_${key}`;

        html += `
          <div class="content-field">
            <label>${key}</label>
            <${inputType}
              id="${fieldId}"
              data-section="${section}"
              data-key="${key}"
              ${inputType === 'input' ? `type="text" value="${escapeHtml(data.value)}"` : ''}
            >${inputType === 'textarea' ? escapeHtml(data.value) : ''}</${inputType}>
            <button class="content-save-btn" onclick="saveContent('${section}', '${key}', '${fieldId}')">
              Speichern
            </button>
            <span class="save-indicator" id="saved_${fieldId}">Gespeichert!</span>
          </div>
        `;
      }

      html += '</div>';
    }

    editor.innerHTML = html;
  } catch {
    document.getElementById('contentEditor').innerHTML =
      '<p style="color:var(--text-muted);">Backend nicht erreichbar. Bitte starten Sie den Server.</p>';
  }
}

async function saveContent(section, key, fieldId) {
  const el = document.getElementById(fieldId);
  const value = el.value;

  try {
    const res = await api('/content', {
      method: 'PUT',
      body: JSON.stringify({ section, key, value })
    });

    if (res.ok) {
      const indicator = document.getElementById(`saved_${fieldId}`);
      indicator.classList.add('visible');
      setTimeout(() => indicator.classList.remove('visible'), 2000);
    }
  } catch {
    alert('Fehler beim Speichern.');
  }
}

// Make functions globally available
window.openTicket = openTicket;
window.updateTicketStatus = updateTicketStatus;
window.saveTicketNotes = saveTicketNotes;
window.deleteTicket = deleteTicket;
window.openChatSession = openChatSession;
window.saveContent = saveContent;
