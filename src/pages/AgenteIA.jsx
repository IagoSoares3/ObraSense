import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css'; // Reaproveita o visual da base
import './AgenteIA.css'; // Estilos específicos do chat (vamos criar a seguir)

export default function AgenteIA() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [input, setInput] = useState('');
  
  // Estado inicial das mensagens
  const [mensagens, setMensagens] = useState([
    { 
      autor: 'ia', 
      texto: 'Olá! Sou o Agente ObraSense. Posso cruzar dados de cronograma, alertar sobre orçamentos ou auditar demandas. O que você precisa analisar hoje?' 
    }
  ]);

  // Função que envia a mensagem e simula a resposta
  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Adiciona a mensagem do usuário na tela
    const novaMensagemUsuario = { autor: 'usuario', texto: input };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setInput('');

    // 2. BACKEND: É aqui que você fará a requisição (fetch) para o seu webhook do n8n ou API Python.
    // Exemplo: fetch('URL_DO_N8N', { method: 'POST', body: JSON.stringify({ pergunta: input }) })
    
    // Simulando o tempo de resposta da IA:
    setTimeout(() => {
      setMensagens((prev) => [
        ...prev, 
        { autor: 'ia', texto: 'Processando a sua solicitação nos bancos de dados da obra... [Integração com backend pendente]' }
      ]);
    }, 1500);
  };

  return (
    <div className={`dashboard-container ${sidebarAberta ? '' : 'sidebar-fechada'}`}>
      
      {/* 1. BARRA LATERAL (Note o Link do react-router-dom) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="ObraSense" className="sidebar-logo" />
          {sidebarAberta && <h2>ObraSense</h2>}
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" title="Visão Geral">
            <span className="material-symbols-outlined">dashboard</span>
            {sidebarAberta && <span>Visão Geral</span>}
          </Link>
          <Link to="#" title="Minhas Obras">
            <span className="material-symbols-outlined">construction</span>
            {sidebarAberta && <span>Minhas Obras</span>}
          </Link>
          <Link to="#" title="Orçamentos">
            <span className="material-symbols-outlined">payments</span>
            {sidebarAberta && <span>Orçamentos</span>}
          </Link>
          <Link to="#" title="Cronogramas">
            <span className="material-symbols-outlined">calendar_month</span>
            {sidebarAberta && <span>Cronogramas</span>}
          </Link>
          <Link to="/agente" className="active" title="Agente IA">
            <span className="material-symbols-outlined">smart_toy</span>
            {sidebarAberta && <span>Agente IA</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/')} className="btn-sair" title="Sair">
            <span className="material-symbols-outlined">logout</span>
            {sidebarAberta && <span>Sair da Plataforma</span>}
          </button>
        </div>
      </aside>

      {/* 2. ÁREA PRINCIPAL */}
      <main className="main-content">
        
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="btn-toggle-sidebar" onClick={() => setSidebarAberta(!sidebarAberta)}>
              <span className="material-symbols-outlined">{sidebarAberta ? 'menu_open' : 'menu'}</span>
            </button>
            <div className="topbar-search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Procurar projetos, relatórios..." />
            </div>
          </div>
          <div className="topbar-user">
            <span className="ia-status">🟢 Agente Ativo</span>
            <div className="user-avatar" title="Iago Soares">IS</div>
          </div>
        </header>

        {/* 3. CONTEÚDO: CHAT DO AGENTE */}
        <div className="agente-container">
          
          <div className="header-data">
            <h1>Central de Inteligência</h1>
            <p>Faça perguntas sobre os dados da obra ou peça para gerar alertas.</p>
          </div>

          <div className="chat-window">
            <div className="chat-history">
              {mensagens.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.autor}`}>
                  <div className="message-avatar">
                    {msg.autor === 'ia' ? <span className="material-symbols-outlined">smart_toy</span> : 'IS'}
                  </div>
                  <div className="message-bubble">
                    {msg.texto}
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={enviarMensagem}>
              <input 
                type="text" 
                placeholder="Ex: Qual o custo atual da fundação do Bloco A?" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn-enviar-chat">
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}