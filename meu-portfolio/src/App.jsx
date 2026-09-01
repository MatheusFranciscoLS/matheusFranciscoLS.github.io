import { useContext, useEffect } from 'react';
import ContactSection from './components/Portfolio/ContactSection';
import FeaturedWork from './components/Portfolio/FeaturedWork';
import Footer from './components/Portfolio/Footer';
import Header from './components/Portfolio/Header';
import Hero from './components/Portfolio/Hero';
import ProfileSection from './components/Portfolio/ProfileSection';
import ProjectArchive from './components/Portfolio/ProjectArchive';
import StackSection from './components/Portfolio/StackSection';
import Reveal from './components/Reveal/Reveal';
import { LanguageContext } from './context/LanguageContext';
import { copy } from './data/copy';
import { useTheme } from './hooks/useTheme';
import './portfolio.css';

function App() {
  const { lang, setLang } = useContext(LanguageContext);
  const { theme, toggleTheme } = useTheme();
  const text = copy[lang];

  useEffect(() => {
    const isPortuguese = lang === 'pt';
    document.documentElement.lang = isPortuguese ? 'pt-BR' : 'en';
    document.title = isPortuguese
      ? 'Matheus Francisco — Desenvolvedor Full-Stack'
      : 'Matheus Francisco — Full-Stack Developer';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = isPortuguese
        ? 'Portfólio de Matheus Francisco: produtos full-stack, arquitetura de software, dados e inteligência artificial.'
        : 'Matheus Francisco portfolio: full-stack products, software architecture, data and artificial intelligence.';
    }
  }, [lang]);

  return (
    <div className="site-shell">
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        text={text.nav}
      />
      <main>
        <Hero lang={lang} text={text.hero} />
        <Reveal><FeaturedWork lang={lang} text={text.featured} /></Reveal>
        <Reveal><ProjectArchive lang={lang} text={text.archive} /></Reveal>
        <Reveal><ProfileSection text={text.profile} /></Reveal>
        <Reveal><StackSection text={text.stack} /></Reveal>
        <Reveal><ContactSection text={text.contact} /></Reveal>
      </main>
      <Footer text={text.footer} />
    </div>
  );
}

export default App;
