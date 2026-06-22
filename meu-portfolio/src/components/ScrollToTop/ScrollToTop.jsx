import { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Verifica a posição do scroll para mostrar ou esconder o botão
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para subir a tela suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

return (
    <button 
      className={`scroll-to-top ${isVisible ? 'show-btn' : ''}`} 
      onClick={scrollToTop}
      title="Voltar ao topo"
    >
      <i className="ph-bold ph-caret-up"></i>
    </button>
  );
};

export default ScrollToTop;