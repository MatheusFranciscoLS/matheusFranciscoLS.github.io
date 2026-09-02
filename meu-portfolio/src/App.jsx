import { useContext, useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import FeaturedProjects from './components/FeaturedProjects';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProjectArchive from './components/ProjectArchive';
import ScrollReveal from './components/ScrollReveal';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import { LanguageContext } from './context/LanguageContext';
import { copy } from './data/copy';
import { useTheme } from './hooks/useTheme';

function App() {
  const { lang, setLang } = useContext(LanguageContext);
  const { theme, toggleTheme } = useTheme();
  const text = copy[lang];

  useEffect(() => {
    const isPt = lang === 'pt';
    document.documentElement.lang = isPt ? 'pt-BR' : 'en';
    document.title = isPt
      ? 'Matheus Francisco — Desenvolvedor Full-Stack'
      : 'Matheus Francisco — Full-Stack Developer';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.content = isPt
        ? 'Portfólio de Matheus Francisco: desenvolvedor full-stack com formação SENAI, Ciência da Computação e 9 anos de experiência profissional.'
        : 'Matheus Francisco portfolio: full-stack developer with SENAI training, Computer Science and 9 years of professional experience.';
    }
  }, [lang]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        {lang === 'pt' ? 'Ir para o conteúdo' : 'Skip to content'}
      </a>
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        text={text.nav}
      />
      <main id="conteudo">
        <Hero lang={lang} text={text.hero} />
        <ScrollReveal><About text={text.about} /></ScrollReveal>
        <ScrollReveal><FeaturedProjects lang={lang} text={text.featured} /></ScrollReveal>
        <ScrollReveal><TechStack text={text.stack} /></ScrollReveal>
        <ScrollReveal><Timeline text={text.timeline} /></ScrollReveal>
        <ScrollReveal><ProjectArchive lang={lang} text={text.archive} /></ScrollReveal>
        <ScrollReveal><Contact text={text.contact} /></ScrollReveal>
      </main>
      <Footer text={text.footer} />
    </div>
  );
}

export default App;
