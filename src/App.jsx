import { useState } from 'react';
import './App.css';

export default function App() {
  // O useState guarda o número do slide atual (começa no 0)
  const [slideAtual, setSlideAtual] = useState(0);

  // Nossa lista de imagens e textos para o banner
  const slides = [
    {
      id: 1,
      imagem: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80",
      titulo: "Gestão de Obras Inteligente",
      texto: "Transforme o canteiro de obras em dados precisos e evite desperdícios."
    },
    {
      id: 2,
      imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
      titulo: "Tecnologia a favor da Engenharia",
      texto: "Acompanhe cronogramas, custos e produtividade em tempo real."
    },
    {
      id: 3,
      imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
      titulo: "Tudo em um só lugar",
      texto: "A plataforma definitiva para conectar engenheiros, arquitetos e gestores."
    }
  ];

  // Funções para passar as imagens
  const proximoSlide = () => {
    setSlideAtual(slideAtual === slides.length - 1 ? 0 : slideAtual + 1);
  };

  const slideAnterior = () => {
    setSlideAtual(slideAtual === 0 ? slides.length - 1 : slideAtual - 1);
  };

  return (
    <div className="landing-page">
      
      {/* HEADER REFORMULADO */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logótipo ObraSense" className="logo-img" />
          <span className="logo-texto">ObraSense</span>
        </div>
        
        <nav className="header-nav">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#sobre">Soluções</a>
          <button className="btn-acessar">Acessar Plataforma</button>
        </nav>
      </header>

      {/* BANNER CARROSSEL */}
      <main className="hero-carousel">
        
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`carousel-slide ${index === slideAtual ? 'ativo' : ''}`}
            style={{ backgroundImage: `url(${slide.imagem})` }}
          >
            {/* Uma película escura por cima da imagem para o texto ficar legível */}
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h1>{slide.titulo}</h1>
                <p>{slide.texto}</p>
                <button className="btn-destaque">Comece Agora</button>
              </div>
            </div>
          </div>
        ))}

        {/* Botões de passar o banner */}
        <button className="carousel-btn prev" onClick={slideAnterior}>&#10094;</button>
        <button className="carousel-btn next" onClick={proximoSlide}>&#10095;</button>

        {/* Bolinhas indicadoras na parte inferior */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === slideAtual ? 'ativo' : ''}`}
              onClick={() => setSlideAtual(index)}
            ></span>
          ))}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 ObraSense. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}