import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const Navbar = () => {
  const { t, lang, setLang } = useContext(LanguageContext);
  const { theme, toggleTheme } = useTheme();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container header-content">
        <a href="#" className="logo">
          {/* A palavra Portfólio vai sumir no celular para dar espaço */}
          <span className="hide-mobile">Portfólio </span>
          <span className="logo-name">MatheusFrancisco</span><span className="logo-tag">/&gt;</span>
        </a>
        
        <nav>
          <ul className={`nav-links ${isMobileOpen ? 'active' : ''}`}>
            <li><a href="#inicio" onClick={closeMobileMenu}>{t('nav.home')}</a></li>
            <li><a href="#sobre" onClick={closeMobileMenu}>{t('nav.about')}</a></li>
            <li><a href="#projetos" onClick={closeMobileMenu}>{t('nav.projects')}</a></li>
            <li><a href="#contato" className="btn-nav" onClick={closeMobileMenu}>{t('nav.contact')}</a></li>
          </ul>
        </nav>

        {/* Agrupamos as ações que ficarão sempre visíveis à direita */}
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-btn" title="Alternar Tema">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <div className="lang-switch">
            <button onClick={() => setLang('pt')} className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}>🇧🇷</button>
            <span className="divider">|</span>
            <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>🇺🇸</button>
          </div>

          <div className="mobile-menu-icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? '✕' : '☰'}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;