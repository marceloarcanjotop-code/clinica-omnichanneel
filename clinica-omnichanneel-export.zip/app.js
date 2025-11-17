// ===== SIMULAÇÃO DE BANCO DE DADOS =====
class Database {
  constructor() {
    this.users = [
      { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'paciente', phone: '11999999999' },
      { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'atendente', phone: '11988888888' },
      { id: 3, name: 'Carlos Oliveira', email: 'carlos@example.com', role: 'gerente', phone: '11977777777' },
      { id: 4, name: 'Ana Costa', email: 'ana@example.com', role: 'atendente', phone: '11966666666' },
    ];

    this.channels = [
      { id: 1, name: 'whatsapp', displayName: 'WhatsApp', icon: '💬' },
      { id: 2, name: 'instagram', displayName: 'Instagram', icon: '📷' },
      { id: 3, name: 'facebook', displayName: 'Facebook', icon: '👥' },
      { id: 4, name: 'email', displayName: 'E-mail', icon: '✉️' },
      { id: 5, name: 'chat', displayName: 'Chat', icon: '💭' },
    ];

    this.specialties = [
      { id: 1, name: 'Cardiologia', description: 'Doenças do coração' },
      { id: 2, name: 'Dermatologia', description: 'Doenças da pele' },
      { id: 3, name: 'Oftalmologia', description: 'Doenças dos olhos' },
      { id: 4, name: 'Ortopedia', description: 'Doenças dos ossos' },
      { id: 5, name: 'Pediatria', description: 'Medicina infantil' },
    ];

    this.conversations = [
      { id: 1, patientId: 1, attendantId: 2, channelId: 1, status: 'in_progress', priority: 'normal', subject: 'Consulta de rotina', lastMessageAt: new Date(Date.now() - 5 * 60000), createdAt: new Date(Date.now() - 2 * 3600000), rating: null },
      { id: 2, patientId: 1, attendantId: null, channelId: 2, status: 'waiting', priority: 'high', subject: 'Dúvida sobre medicação', lastMessageAt: new Date(Date.now() - 10 * 60000), createdAt: new Date(Date.now() - 4 * 3600000), rating: null },
      { id: 3, patientId: 1, attendantId: 2, channelId: 4, status: 'resolved', priority: 'normal', subject: 'Agendamento de exame', lastMessageAt: new Date(Date.now() - 1 * 3600000), createdAt: new Date(Date.now() - 24 * 3600000), rating: 5 },
    ];

    this.messages = [
      { id: 1, conversationId: 1, senderId: 1, senderRole: 'paciente', content: 'Olá, gostaria de agendar uma consulta', createdAt: new Date(Date.now() - 2 * 3600000), messageType: 'text' },
      { id: 2, conversationId: 1, senderId: 2, senderRole: 'atendente', content: 'Claro! Qual especialidade você precisa?', createdAt: new Date(Date.now() - 1.5 * 3600000), messageType: 'text' },
      { id: 3, conversationId: 1, senderId: 1, senderRole: 'paciente', content: 'Cardiologia, por favor', createdAt: new Date(Date.now() - 1 * 3600000), messageType: 'text' },
      { id: 4, conversationId: 1, senderId: 2, senderRole: 'atendente', content: 'Perfeito! Temos disponibilidade para amanhã às 14h', createdAt: new Date(Date.now() - 5 * 60000), messageType: 'text' },
    ];

    this.appointments = [
      { id: 1, patientId: 1, specialtyId: 1, scheduledAt: new Date(Date.now() + 24 * 3600000), duration: 30, status: 'scheduled', notes: 'Primeira consulta' },
      { id: 2, patientId: 1, specialtyId: 2, scheduledAt: new Date(Date.now() + 48 * 3600000), duration: 30, status: 'confirmed', notes: 'Retorno' },
    ];

    this.metrics = {
      totalConversations: 45,
      resolvedConversations: 38,
      waitingConversations: 3,
      inProgressConversations: 4,
      avgRating: 4.7,
      avgResponseTime: 8,
    };

    this.currentUser = this.users[0]; // Usuário logado por padrão
  }

  getConversationsByPatient(patientId) {
    return this.conversations.filter(c => c.patientId === patientId);
  }

  getConversationsByAttendant(attendantId) {
    return this.conversations.filter(c => c.attendantId === attendantId);
  }

  getWaitingConversations() {
    return this.conversations.filter(c => c.status === 'waiting');
  }

  getConversationById(id) {
    return this.conversations.find(c => c.id === id);
  }

  getMessagesByConversation(conversationId) {
    return this.messages.filter(m => m.conversationId === conversationId);
  }

  addMessage(conversationId, senderId, senderRole, content) {
    const newMessage = {
      id: this.messages.length + 1,
      conversationId,
      senderId,
      senderRole,
      content,
      createdAt: new Date(),
      messageType: 'text'
    };
    this.messages.push(newMessage);
    
    // Atualizar lastMessageAt da conversa
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.lastMessageAt = new Date();
    }
    
    return newMessage;
  }

  assignConversation(conversationId, attendantId) {
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.attendantId = attendantId;
      conversation.status = 'in_progress';
    }
  }

  updateConversationStatus(conversationId, status) {
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.status = status;
    }
  }

  getAppointmentsByPatient(patientId) {
    return this.appointments.filter(a => a.patientId === patientId);
  }

  createAppointment(patientId, specialtyId, scheduledAt) {
    const newAppointment = {
      id: this.appointments.length + 1,
      patientId,
      specialtyId,
      scheduledAt,
      duration: 30,
      status: 'scheduled',
      notes: ''
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  getAttendantById(id) {
    return this.users.find(u => u.id === id && u.role === 'atendente');
  }

  getChannelById(id) {
    return this.channels.find(c => c.id === id);
  }

  getSpecialtyById(id) {
    return this.specialties.find(s => s.id === id);
  }

  getActiveAttendants() {
    return this.users.filter(u => u.role === 'atendente');
  }
}

// ===== UTILITÁRIOS =====
const Utils = {
  formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  formatTime(date) {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  formatDateTime(date) {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  },

  timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'agora';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d atrás`;
    
    return this.formatDate(date);
  },

  getStatusColor(status) {
    const colors = {
      'waiting': 'warning',
      'in_progress': 'info',
      'resolved': 'success',
      'closed': 'info',
      'scheduled': 'info',
      'confirmed': 'success',
      'cancelled': 'danger',
      'completed': 'success',
      'no_show': 'danger'
    };
    return colors[status] || 'info';
  },

  getStatusLabel(status) {
    const labels = {
      'waiting': 'Aguardando',
      'in_progress': 'Em Atendimento',
      'resolved': 'Resolvido',
      'closed': 'Fechado',
      'scheduled': 'Agendado',
      'confirmed': 'Confirmado',
      'cancelled': 'Cancelado',
      'completed': 'Concluído',
      'no_show': 'Não Compareceu'
    };
    return labels[status] || status;
  },

  getPriorityLabel(priority) {
    const labels = {
      'low': 'Baixa',
      'normal': 'Normal',
      'high': 'Alta',
      'urgent': 'Urgente'
    };
    return labels[priority] || priority;
  }
};

// ===== GERENCIADOR DE APLICAÇÃO =====
class App {
  constructor() {
    this.db = new Database();
    this.currentPage = 'home';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.navigateTo('home');
  }

  setupEventListeners() {
    // Navegação
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
      });
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      alert('Você foi desconectado!');
      this.navigateTo('login');
    });

    // Trocar usuário (para teste)
    document.getElementById('switchUserBtn')?.addEventListener('click', () => {
      const users = this.db.users;
      const currentIndex = users.findIndex(u => u.id === this.db.currentUser.id);
      const nextIndex = (currentIndex + 1) % users.length;
      this.db.currentUser = users[nextIndex];
      this.navigateTo(this.currentPage);
      alert(`Usuário alterado para: ${this.db.currentUser.name} (${this.db.currentUser.role})`);
    });
  }

  navigateTo(page) {
    this.currentPage = page;
    const mainContent = document.getElementById('mainContent');
    
    // Atualizar navegação ativa
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) {
        link.classList.add('active');
      }
    });

    // Renderizar página
    switch (page) {
      case 'home':
        mainContent.innerHTML = this.renderHome();
        break;
      case 'paciente-conversas':
        mainContent.innerHTML = this.renderPatientConversations();
        break;
      case 'paciente-agendamentos':
        mainContent.innerHTML = this.renderPatientAppointments();
        break;
      case 'atendente-inbox':
        mainContent.innerHTML = this.renderAttendantInbox();
        break;
      case 'gerente-dashboard':
        mainContent.innerHTML = this.renderManagerDashboard();
        break;
      case 'login':
        mainContent.innerHTML = this.renderLogin();
        break;
      default:
        mainContent.innerHTML = this.renderHome();
    }

    // Reconfigurar event listeners da página
    this.setupPageEventListeners();
  }

  setupPageEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
      });
    });

    // Abrir conversa
    document.querySelectorAll('.conversation-item').forEach(item => {
      item.addEventListener('click', () => {
        const conversationId = item.dataset.conversationId;
        this.openConversation(conversationId);
      });
    });

    // Assumir atendimento
    document.querySelectorAll('.btn-assign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const conversationId = btn.dataset.conversationId;
        this.db.assignConversation(conversationId, this.db.currentUser.id);
        this.navigateTo('atendente-inbox');
      });
    });

    // Enviar mensagem
    document.getElementById('sendMessageBtn')?.addEventListener('click', () => {
      this.sendMessage();
    });

    // Criar agendamento
    document.getElementById('createAppointmentBtn')?.addEventListener('click', () => {
      this.createAppointment();
    });

    // Fechar conversa
    document.getElementById('closeConversationBtn')?.addEventListener('click', () => {
      const conversationId = document.getElementById('currentConversationId')?.value;
      if (conversationId) {
        this.db.updateConversationStatus(conversationId, 'resolved');
        this.navigateTo('atendente-inbox');
      }
    });
  }

  renderHome() {
    const user = this.db.currentUser;
    const isPatient = user.role === 'paciente';
    const isAttendant = user.role === 'atendente';
    const isManager = user.role === 'gerente';

    return `
      <div class="container">
        <div class="card">
          <div class="card-header">
            <div>
              <h1>Bem-vindo, ${user.name}!</h1>
              <p class="text-gray-600">Papel: <strong>${Utils.getStatusLabel(user.role)}</strong></p>
            </div>
          </div>
          <div class="card-content">
            <p>Sistema Omnichannel de Atendimento para Clínica Médica</p>
            
            ${isPatient ? `
              <div class="grid grid-2 mt-8">
                <div class="card">
                  <h3>📞 Minhas Conversas</h3>
                  <p>Acompanhe suas conversas com a clínica através de múltiplos canais.</p>
                  <button class="btn btn-primary mt-4" onclick="app.navigateTo('paciente-conversas')">
                    Ver Conversas
                  </button>
                </div>
                <div class="card">
                  <h3>📅 Meus Agendamentos</h3>
                  <p>Visualize e gerencie seus agendamentos de consultas.</p>
                  <button class="btn btn-primary mt-4" onclick="app.navigateTo('paciente-agendamentos')">
                    Ver Agendamentos
                  </button>
                </div>
              </div>
            ` : ''}

            ${isAttendant ? `
              <div class="grid grid-2 mt-8">
                <div class="card">
                  <h3>📥 Caixa de Entrada</h3>
                  <p>Gerencie todos os atendimentos em uma única plataforma.</p>
                  <button class="btn btn-primary mt-4" onclick="app.navigateTo('atendente-inbox')">
                    Abrir Inbox
                  </button>
                </div>
              </div>
            ` : ''}

            ${isManager ? `
              <div class="grid grid-2 mt-8">
                <div class="card">
                  <h3>📊 Dashboard</h3>
                  <p>Monitore métricas e desempenho da equipe em tempo real.</p>
                  <button class="btn btn-primary mt-4" onclick="app.navigateTo('gerente-dashboard')">
                    Ver Dashboard
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  renderPatientConversations() {
    const conversations = this.db.getConversationsByPatient(this.db.currentUser.id);
    
    return `
      <div class="container">
        <h2>Minhas Conversas</h2>
        
        <div class="card mb-4">
          <button class="btn btn-primary" onclick="app.navigateTo('home')">← Voltar</button>
        </div>

        ${conversations.length === 0 ? `
          <div class="card text-center">
            <p class="text-gray-600">Nenhuma conversa iniciada</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${conversations.map(conv => {
              const channel = this.db.getChannelById(conv.channelId);
              return `
                <div class="card conversation-item cursor-pointer" data-conversation-id="${conv.id}">
                  <div class="card-header">
                    <div>
                      <h3>${conv.subject || 'Atendimento'}</h3>
                      <p class="text-gray-600 text-sm">
                        ${channel.icon} ${channel.displayName} • ${Utils.timeAgo(conv.createdAt)}
                      </p>
                    </div>
                    <span class="badge badge-${Utils.getStatusColor(conv.status)}">
                      ${Utils.getStatusLabel(conv.status)}
                    </span>
                  </div>
                  <div class="card-content">
                    <p class="text-sm text-gray-600">Última mensagem: ${Utils.timeAgo(conv.lastMessageAt)}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  }

  renderPatientAppointments() {
    const appointments = this.db.getAppointmentsByPatient(this.db.currentUser.id);
    
    return `
      <div class="container">
        <h2>Meus Agendamentos</h2>
        
        <div class="card mb-4 flex justify-between items-center">
          <button class="btn btn-primary" onclick="app.navigateTo('home')">← Voltar</button>
          <button class="btn btn-success" onclick="app.showCreateAppointmentModal()">+ Novo Agendamento</button>
        </div>

        ${appointments.length === 0 ? `
          <div class="card text-center">
            <p class="text-gray-600">Nenhum agendamento</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${appointments.map(apt => {
              const specialty = this.db.getSpecialtyById(apt.specialtyId);
              return `
                <div class="card">
                  <div class="card-header">
                    <div>
                      <h3>${specialty.name}</h3>
                      <p class="text-gray-600 text-sm">
                        📅 ${Utils.formatDateTime(apt.scheduledAt)}
                      </p>
                    </div>
                    <span class="badge badge-${Utils.getStatusColor(apt.status)}">
                      ${Utils.getStatusLabel(apt.status)}
                    </span>
                  </div>
                  <div class="card-content">
                    <p class="text-sm">Duração: ${apt.duration} minutos</p>
                    ${apt.notes ? `<p class="text-sm text-gray-600">Notas: ${apt.notes}</p>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  }

  renderAttendantInbox() {
    const myConversations = this.db.getConversationsByAttendant(this.db.currentUser.id);
    const waitingConversations = this.db.getWaitingConversations();
    
    const inProgressConversations = myConversations.filter(c => c.status === 'in_progress');
    const resolvedConversations = myConversations.filter(c => c.status === 'resolved' || c.status === 'closed');

    return `
      <div class="container">
        <h2>Caixa de Entrada</h2>
        
        <div class="card mb-4">
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Voltar</button>
        </div>

        <div class="tabs">
          <button class="tab-button active" data-tab="waiting">
            ⏳ Aguardando (${waitingConversations.length})
          </button>
          <button class="tab-button" data-tab="in_progress">
            💬 Em Atendimento (${inProgressConversations.length})
          </button>
          <button class="tab-button" data-tab="resolved">
            ✅ Resolvidos (${resolvedConversations.length})
          </button>
        </div>

        <div id="tab-waiting" class="tab-content active">
          ${waitingConversations.length === 0 ? `
            <div class="card text-center">
              <p class="text-gray-600">Nenhum atendimento aguardando</p>
            </div>
          ` : `
            <div class="space-y-4">
              ${waitingConversations.map(conv => {
                const channel = this.db.getChannelById(conv.channelId);
                return `
                  <div class="card">
                    <div class="card-header">
                      <div>
                        <h3>${conv.subject || 'Atendimento'}</h3>
                        <p class="text-gray-600 text-sm">
                          ${channel.icon} ${channel.displayName} • Paciente #${conv.patientId}
                        </p>
                      </div>
                      <button class="btn btn-success btn-small btn-assign" data-conversation-id="${conv.id}">
                        Assumir
                      </button>
                    </div>
                    <div class="card-content">
                      <p class="text-sm text-gray-600">
                        Prioridade: <strong>${Utils.getPriorityLabel(conv.priority)}</strong> • 
                        Há ${Utils.timeAgo(conv.createdAt)}
                      </p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div id="tab-in_progress" class="tab-content">
          ${inProgressConversations.length === 0 ? `
            <div class="card text-center">
              <p class="text-gray-600">Nenhum atendimento em andamento</p>
            </div>
          ` : `
            <div class="space-y-4">
              ${inProgressConversations.map(conv => {
                const channel = this.db.getChannelById(conv.channelId);
                return `
                  <div class="card conversation-item cursor-pointer" data-conversation-id="${conv.id}">
                    <div class="card-header">
                      <div>
                        <h3>${conv.subject || 'Atendimento'}</h3>
                        <p class="text-gray-600 text-sm">
                          ${channel.icon} ${channel.displayName} • Paciente #${conv.patientId}
                        </p>
                      </div>
                      <span class="badge badge-info">Em Atendimento</span>
                    </div>
                    <div class="card-content">
                      <p class="text-sm text-gray-600">Última mensagem: ${Utils.timeAgo(conv.lastMessageAt)}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div id="tab-resolved" class="tab-content">
          ${resolvedConversations.length === 0 ? `
            <div class="card text-center">
              <p class="text-gray-600">Nenhum atendimento resolvido</p>
            </div>
          ` : `
            <div class="space-y-4">
              ${resolvedConversations.map(conv => {
                const channel = this.db.getChannelById(conv.channelId);
                return `
                  <div class="card">
                    <div class="card-header">
                      <div>
                        <h3>${conv.subject || 'Atendimento'}</h3>
                        <p class="text-gray-600 text-sm">
                          ${channel.icon} ${channel.displayName} • Paciente #${conv.patientId}
                        </p>
                      </div>
                      <span class="badge badge-success">
                        ${conv.status === 'resolved' ? 'Resolvido' : 'Fechado'}
                      </span>
                    </div>
                    <div class="card-content">
                      ${conv.rating ? `<p class="text-sm">⭐ Avaliação: ${conv.rating}/5</p>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  renderManagerDashboard() {
    const metrics = this.db.metrics;
    const attendants = this.db.getActiveAttendants();
    const conversations = this.db.conversations;

    return `
      <div class="container">
        <h2>Dashboard de Métricas</h2>
        <p class="text-gray-600 mb-8">Visão geral do desempenho dos últimos 30 dias</p>
        
        <div class="card mb-4">
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Voltar</button>
        </div>

        <div class="grid grid-4">
          <div class="card">
            <h3 class="text-2xl font-bold">${metrics.totalConversations}</h3>
            <p class="text-gray-600 text-sm">Total de Atendimentos</p>
          </div>
          <div class="card">
            <h3 class="text-2xl font-bold">${metrics.waitingConversations}</h3>
            <p class="text-gray-600 text-sm">Aguardando</p>
          </div>
          <div class="card">
            <h3 class="text-2xl font-bold">${metrics.inProgressConversations}</h3>
            <p class="text-gray-600 text-sm">Em Atendimento</p>
          </div>
          <div class="card">
            <h3 class="text-2xl font-bold">${((metrics.resolvedConversations / metrics.totalConversations) * 100).toFixed(1)}%</h3>
            <p class="text-gray-600 text-sm">Taxa de Resolução</p>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="card">
            <h3>⭐ Satisfação do Paciente</h3>
            <div class="flex items-baseline gap-2 mt-4">
              <span class="text-4xl font-bold">${metrics.avgRating.toFixed(1)}</span>
              <span class="text-gray-600">/ 5.0</span>
            </div>
            <div class="flex gap-1 mt-4">
              ${[1,2,3,4,5].map(i => `
                <span style="font-size: 1.5rem;">${i <= Math.round(metrics.avgRating) ? '⭐' : '☆'}</span>
              `).join('')}
            </div>
          </div>

          <div class="card">
            <h3>👥 Equipe de Atendimento</h3>
            <div class="text-4xl font-bold mt-4 mb-4">${attendants.length}</div>
            <div class="space-y-2">
              ${attendants.slice(0, 3).map(att => `
                <div class="flex items-center gap-2">
                  <span style="color: #10b981;">●</span>
                  <span class="text-sm">${att.name}</span>
                </div>
              `).join('')}
              ${attendants.length > 3 ? `
                <p class="text-sm text-gray-600">+${attendants.length - 3} atendentes</p>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Distribuição de Status</h3>
          <div class="grid grid-4 mt-4">
            <div class="text-center p-4 bg-gray-50 rounded">
              <div class="text-2xl font-bold" style="color: #f59e0b;">${metrics.waitingConversations}</div>
              <div class="text-sm text-gray-600 mt-2">Aguardando</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded">
              <div class="text-2xl font-bold" style="color: #3b82f6;">${metrics.inProgressConversations}</div>
              <div class="text-sm text-gray-600 mt-2">Em Atendimento</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded">
              <div class="text-2xl font-bold" style="color: #10b981;">${metrics.resolvedConversations}</div>
              <div class="text-sm text-gray-600 mt-2">Resolvidos</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded">
              <div class="text-2xl font-bold" style="color: #6b7280;">${metrics.totalConversations - metrics.resolvedConversations - metrics.inProgressConversations - metrics.waitingConversations}</div>
              <div class="text-sm text-gray-600 mt-2">Outros</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderLogin() {
    return `
      <div class="container" style="max-width: 400px; margin-top: 4rem;">
        <div class="card">
          <div class="card-header text-center">
            <h2>Sistema Omnichannel</h2>
            <p class="text-gray-600">Clínica Médica</p>
          </div>
          <div class="card-content">
            <div class="form-group">
              <label>Selecione um usuário para teste:</label>
              <select id="userSelect" style="margin-bottom: 1rem;">
                ${this.db.users.map(user => `
                  <option value="${user.id}">${user.name} (${user.role})</option>
                `).join('')}
              </select>
            </div>
            <button class="btn btn-primary btn-block" onclick="app.login()">
              Entrar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  login() {
    const userSelect = document.getElementById('userSelect');
    const userId = parseInt(userSelect.value);
    const user = this.db.users.find(u => u.id === userId);
    if (user) {
      this.db.currentUser = user;
      this.navigateTo('home');
    }
  }

  openConversation(conversationId) {
    const conversation = this.db.getConversationById(conversationId);
    const messages = this.db.getMessagesByConversation(conversationId);
    const channel = this.db.getChannelById(conversation.channelId);
    const attendant = conversation.attendantId ? this.db.getAttendantById(conversation.attendantId) : null;

    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
      <div class="container">
        <div class="card mb-4">
          <button class="btn btn-secondary" onclick="app.navigateTo('${this.db.currentUser.role === 'paciente' ? 'paciente-conversas' : 'atendente-inbox'}')">
            ← Voltar
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>${conversation.subject || 'Atendimento'}</h2>
              <p class="text-gray-600 text-sm">
                ${channel.icon} ${channel.displayName}
                ${attendant ? ` • Atendente: ${attendant.name}` : ''}
              </p>
            </div>
            <span class="badge badge-${Utils.getStatusColor(conversation.status)}">
              ${Utils.getStatusLabel(conversation.status)}
            </span>
          </div>
        </div>

        <div class="card" style="height: 400px; overflow-y: auto; margin-bottom: 1rem;">
          <div class="card-content">
            ${messages.map(msg => {
              const sender = this.db.users.find(u => u.id === msg.senderId) || { name: 'Sistema' };
              const isCurrentUser = msg.senderId === this.db.currentUser.id;
              return `
                <div style="margin-bottom: 1rem; text-align: ${isCurrentUser ? 'right' : 'left'};">
                  <div style="
                    display: inline-block;
                    background-color: ${isCurrentUser ? '#0066cc' : '#f3f4f6'};
                    color: ${isCurrentUser ? 'white' : '#1f2937'};
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    max-width: 70%;
                  ">
                    <p style="margin-bottom: 0.25rem; font-weight: 500;">${sender.name}</p>
                    <p style="margin-bottom: 0.25rem;">${msg.content}</p>
                    <p style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 0;">
                      ${Utils.formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        ${conversation.status !== 'closed' ? `
          <div class="card">
            <div class="form-group mb-0">
              <textarea id="messageInput" placeholder="Digite sua mensagem..." style="margin-bottom: 1rem;"></textarea>
              <div class="flex gap-2">
                <button class="btn btn-primary flex-1" id="sendMessageBtn">
                  Enviar
                </button>
                ${this.db.currentUser.role !== 'paciente' ? `
                  <button class="btn btn-danger" id="closeConversationBtn">
                    Fechar
                  </button>
                ` : ''}
              </div>
            </div>
            <input type="hidden" id="currentConversationId" value="${conversationId}">
          </div>
        ` : `
          <div class="card text-center">
            <p class="text-gray-600">Esta conversa foi fechada</p>
          </div>
        `}
      </div>
    `;

    this.setupPageEventListeners();
  }

  sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const conversationId = parseInt(document.getElementById('currentConversationId').value);
    const content = messageInput.value.trim();

    if (!content) {
      alert('Digite uma mensagem');
      return;
    }

    this.db.addMessage(conversationId, this.db.currentUser.id, this.db.currentUser.role, content);
    messageInput.value = '';
    
    // Reabrir conversa para atualizar
    this.openConversation(conversationId);
  }

  createAppointment() {
    const specialtyId = parseInt(document.getElementById('specialtySelect').value);
    const dateInput = document.getElementById('appointmentDate').value;
    
    if (!specialtyId || !dateInput) {
      alert('Preencha todos os campos');
      return;
    }

    const scheduledAt = new Date(dateInput);
    this.db.createAppointment(this.db.currentUser.id, specialtyId, scheduledAt);
    this.navigateTo('paciente-agendamentos');
  }

  showCreateAppointmentModal() {
    const mainContent = document.getElementById('mainContent');
    const currentContent = mainContent.innerHTML;

    mainContent.innerHTML = `
      <div class="container">
        <div class="card">
          <div class="card-header">
            <h2>Novo Agendamento</h2>
          </div>
          <div class="card-content">
            <div class="form-group">
              <label>Especialidade:</label>
              <select id="specialtySelect">
                <option value="">Selecione uma especialidade</option>
                ${this.db.specialties.map(spec => `
                  <option value="${spec.id}">${spec.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Data e Hora:</label>
              <input type="datetime-local" id="appointmentDate">
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary" id="createAppointmentBtn">
                Agendar
              </button>
              <button class="btn btn-secondary" onclick="app.navigateTo('paciente-agendamentos')">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupPageEventListeners();
  }
}

// ===== INICIALIZAR APLICAÇÃO =====
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new App();
});
