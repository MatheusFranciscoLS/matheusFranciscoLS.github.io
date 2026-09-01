import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header({ lang, setLang, theme, toggleTheme, text }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const navItems = [
    ['#perfil', text.profile],
    ['#stack', text.stack],
    ['#projetos', text.work],
    ['#contato', text.contact],
  ];

  const socialLinks = [
    ['https://github.com/MatheusFranciscoLS', 'GitHub', 'GH'],
    ['https://www.linkedin.com/in/matheusfranciscols', 'LinkedIn', 'in'],
  ];

  return (
    <header className={`topbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a className="brand" href="#inicio" aria-label={`Matheus Francisco — ${lang === 'pt' ? 'início' : 'home'}`}>
        <span className="brand-mark">MF</span>
        <span className="brand-name">Matheus Francisco</span>
      </a>

      <nav className="desktop-nav" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
        {navItems.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
      </nav>

      <div className="topbar-actions">
        <div className="social-controls" role="group" aria-label={lang === 'pt' ? 'Links profissionais' : 'Professional links'}>
          {socialLinks.map(([href, label, mark]) => (
            <a
              className="control control-social"
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${label} — Matheus Francisco`}
              title={label}
              key={label}
            >
              <span className="social-monogram" aria-hidden="true">{mark}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
        <button
          className="control control-theme"
          type="button"
          onClick={toggleTheme}
          aria-label={text.theme}
          title={text.theme}
        >
          {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>
        <button
          className="control control-lang"
          type="button"
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          aria-label={text.language}
        >
          <span className={lang === 'pt' ? 'active' : ''}>PT</span>
          <i>/</i>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
        <button
          className="control menu-toggle"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? text.close : text.menu}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <nav className="mobile-nav" aria-label={lang === 'pt' ? 'Navegação móvel' : 'Mobile navigation'}>
        {navItems.map(([href, label], index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>
            {label}
          </a>
        ))}
        <div className="mobile-socials">
          {socialLinks.map(([href, label, mark]) => (
            <a href={href} target="_blank" rel="noreferrer noopener" key={label}>
              <span className="social-monogram" aria-hidden="true">{mark}</span>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
