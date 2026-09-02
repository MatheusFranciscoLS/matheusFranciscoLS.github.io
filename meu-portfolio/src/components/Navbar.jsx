import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


export default function Navbar({ lang, setLang, theme, toggleTheme, text }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const links = [
    ['#sobre', text.about],
    ['#projetos', text.projects],
    ['#stack', text.stack],
    ['#certificados', text.certifications],
    ['#contato', text.contact],
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__brand" href="#inicio" aria-label="Matheus Francisco">
          <span className="navbar__logo">&lt;MF /&gt;</span>
        </a>

        <nav className="navbar__nav" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
          {links.map(([href, label]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>

        <div className="navbar__actions">
          {/* Social links — always visible */}
          <a
            className="navbar__social"
            href="https://github.com/MatheusFranciscoLS"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            className="navbar__social"
            href="https://www.linkedin.com/in/matheusfranciscols"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>

          <span className="navbar__divider" aria-hidden="true" />

          <button
            className="navbar__btn"
            type="button"
            onClick={toggleTheme}
            aria-label={text.theme}
            title={text.theme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="navbar__btn navbar__lang-btn"
            type="button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={text.language}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <button
            className="navbar__btn navbar__hamburger"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? text.close : text.menu}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label={lang === 'pt' ? 'Navegação móvel' : 'Mobile navigation'}>
          {links.map(([href, label], i) => (
            <a href={href} key={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span className="mobile-drawer__num">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-drawer__socials">
          <a href="https://github.com/MatheusFranciscoLS" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            <GithubIcon size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/matheusfranciscols" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        </div>
      </div>
      {menuOpen && <div className="mobile-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}
