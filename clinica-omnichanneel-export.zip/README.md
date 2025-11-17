# Sistema Omnichannel - Clínica Médica
## Versão HTML/CSS/JavaScript Puro

Uma aplicação web completa para gerenciamento omnichannel de atendimentos em clínica médica, desenvolvida com **HTML5, CSS3 e JavaScript vanilla** (sem dependências externas).

## 📁 Estrutura do Projeto

```
clinica-omnichannel-html/
├── index.html              # Arquivo HTML principal
├── css/
│   └── styles.css         # Estilos CSS (1000+ linhas)
├── js/
│   └── app.js             # Lógica JavaScript (800+ linhas)
└── README.md              # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Baixe ou clone os arquivos
2. Abra `index.html` no navegador
3. Pronto! A aplicação está funcionando

### Opção 2: Servir com HTTP
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server

# Com Live Server (VS Code)
Instale a extensão Live Server e clique em "Go Live"
```

Acesse: `http://localhost:8000`

## 👥 Usuários de Teste

A aplicação vem com 4 usuários pré-configurados:

| Nome | Email | Papel | Senha |
|------|-------|-------|-------|
| João Silva | joao@example.com | Paciente | (teste) |
| Maria Santos | maria@example.com | Atendente | (teste) |
| Carlos Oliveira | carlos@example.com | Gerente | (teste) |
| Ana Costa | ana@example.com | Atendente | (teste) |

**Para trocar de usuário:** Clique no botão "👤 Trocar Usuário" no canto superior direito.

## ✨ Funcionalidades

### Para Pacientes
- ✅ Visualizar conversas com a clínica
- ✅ Iniciar conversas por múltiplos canais (WhatsApp, Instagram, Facebook, E-mail, Chat)
- ✅ Agendar consultas
- ✅ Visualizar agendamentos
- ✅ Avaliar atendimento

### Para Atendentes
- ✅ Caixa de entrada unificada
- ✅ Assumir atendimentos da fila
- ✅ Responder mensagens em tempo real
- ✅ Visualizar histórico de conversas
- ✅ Fechar atendimentos
- ✅ Abas para organizar conversas (Aguardando, Em Atendimento, Resolvidos)

### Para Gerentes
- ✅ Dashboard com métricas em tempo real
- ✅ Total de atendimentos
- ✅ Atendimentos aguardando
- ✅ Atendimentos em progresso
- ✅ Taxa de resolução
- ✅ Satisfação do paciente (avaliação)
- ✅ Equipe de atendimento
- ✅ Distribuição de status

## 🎨 Design

### Cores
- **Primária:** #0066cc (Azul)
- **Sucesso:** #10b981 (Verde)
- **Aviso:** #f59e0b (Amarelo)
- **Perigo:** #ef4444 (Vermelho)

### Componentes
- Cards com sombra
- Botões com hover effects
- Badges para status
- Tabs para organização
- Formulários responsivos
- Modais para ações
- Mensagens de feedback

## 📊 Dados Simulados

A aplicação usa um banco de dados simulado em memória com:
- 4 usuários
- 5 canais de comunicação
- 5 especialidades médicas
- 3 conversas com mensagens
- 2 agendamentos
- Métricas agregadas

**Nota:** Os dados são perdidos ao recarregar a página. Para persistência, integre com um backend real.

## 🔧 Arquitetura

### Classe `Database`
Simula um banco de dados com métodos para:
- Gerenciar usuários
- CRUD de conversas
- CRUD de mensagens
- CRUD de agendamentos
- Cálculo de métricas

### Classe `App`
Gerencia a aplicação com:
- Navegação entre páginas
- Renderização de componentes
- Event listeners
- Lógica de negócio

### Objeto `Utils`
Funções utilitárias para:
- Formatação de datas/horas
- Cálculo de tempo relativo
- Mapeamento de status
- Cores e rótulos

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop:** Layout com sidebar de navegação
- **Tablet:** Sidebar reduzida
- **Mobile:** Navegação em dropdown

## 🔐 Segurança (Produção)

Para usar em produção, implemente:
- ✅ Autenticação real (OAuth, JWT)
- ✅ Validação de entrada no backend
- ✅ HTTPS/SSL
- ✅ Proteção CSRF
- ✅ Rate limiting
- ✅ Sanitização de HTML
- ✅ Criptografia de dados sensíveis

## 🚀 Próximos Passos

1. **Backend API:** Integre com Node.js/Express ou Python/Flask
2. **Banco de Dados:** Use MySQL, PostgreSQL ou MongoDB
3. **Autenticação:** Implemente OAuth ou JWT
4. **WebSockets:** Para mensagens em tempo real
5. **Notificações:** Push notifications e e-mail
6. **Integrações:** APIs de WhatsApp, Instagram, Facebook
7. **Relatórios:** Exportação de dados em PDF/Excel

## 📝 Exemplo de Integração com Backend

```javascript
// Substituir simulação de banco de dados
async function getConversations() {
  const response = await fetch('/api/conversations');
  return await response.json();
}

async function sendMessage(conversationId, content) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, content })
  });
  return await response.json();
}
```

## 🐛 Troubleshooting

### A aplicação não carrega
- Verifique se o navegador suporta ES6+
- Abra o console (F12) para ver erros

### Dados desaparecem ao recarregar
- Isso é normal (dados em memória)
- Para persistência, use localStorage ou backend

### Estilos não aparecem
- Verifique se o arquivo CSS está no caminho correto
- Limpe o cache do navegador (Ctrl+Shift+Delete)

## 📞 Suporte

Para dúvidas ou melhorias, consulte a documentação completa em `DOCUMENTACAO.md`.

## 📄 Licença

Desenvolvido para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para clínicas médicas modernas**

**Versão:** 1.0.0  
**Última atualização:** Novembro 2024
