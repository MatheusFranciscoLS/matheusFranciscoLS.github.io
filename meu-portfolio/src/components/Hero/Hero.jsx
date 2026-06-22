import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useContext(LanguageContext);
  const [typedText, setTypedText] = useState('');
  const fullText = t('hero.subrole'); // O texto que vem do dicionário

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Velocidade da digitação (50ms por letra)

    return () => clearInterval(interval);
  }, [fullText]); // Se trocar de idioma, ele digita de novo!

  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="badge">{t('hero.badge')}</div>

          <h1>
            <span>{t('hero.role')}</span> <br />
<span className="text-gradient">{typedText}</span>
<span className="typing-cursor">|</span>
          </h1>

          <p className="bio">{t('hero.bio')}</p>

          <div className="hero-buttons">
            <a href="#projetos" className="btn btn-primary">
              {t('hero.ctaPrimary')}
            </a>
            <a href="https://github.com/MatheusFranciscoLS" target="_blank" rel="noreferrer" className="btn btn-outline">
              <i className="devicon-github-original"></i>
              <span>{t('hero.ctaSecondary')}</span>
            </a>
          </div>

          <div className="stats-row">
            <div className="stat">
              <strong>{t('hero.stat1Title')}</strong>
              <span>{t('hero.stat1Desc')}</span>
            </div>

            <div className="stat">
              <strong>{t('hero.stat2Title')}</strong>
              <span>{t('hero.stat2Desc')}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-card">
            {/* O caminho puxa direto da pasta public/assets */}
            <img src="/assets/avatar.png" alt="Matheus Francisco" className="avatar-img" />
            
            <div className="floating-badge badge-java">
              <i className="devicon-java-plain"></i>
            </div>
            <div className="floating-badge badge-react">
              <i className="devicon-react-original"></i>
            </div>
            <div className="floating-badge badge-spring">
              <i className="devicon-spring-original"></i>
            </div>
            <div className="floating-badge badge-js">
              <i className="devicon-javascript-plain"></i>
            </div>
          </div>
          <div className="bg-blur"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;