import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './About.css';

const About = () => {
  const { t, lang } = useContext(LanguageContext);

  // Define qual currículo baixar com base no idioma selecionado
  const cvLink = lang === 'en' ? '/assets/curriculo-en.pdf' : '/assets/curriculo-pt.pdf';

  return (
    <section id="sobre" className="section about-section">
      <div className="container">
        <div className="about-grid-layout">
          
          <div className="about-text">
            <div className="section-badge">{t('about.badge')}</div>
            <h2 
              className="section-title text-left" 
              dangerouslySetInnerHTML={{ __html: t('about.title') }} 
            />

            <p dangerouslySetInnerHTML={{ __html: t('about.desc1') }} />
            <p>{t('about.desc2')}</p>

            <div className="soft-skills">
              <span className="skill-tag">{t('about.skill1')}</span>
              <span className="skill-tag">{t('about.skill2')}</span>
              <span className="skill-tag">{t('about.skill3')}</span>
              <span className="skill-tag">{t('about.skill4')}</span>
              <span className="skill-tag">{t('about.skill5')}</span>
            </div>

            <a
              href={cvLink}
              download
              className="btn btn-outline margin-top"
            >
              {t('about.cv')}
            </a>
          </div>

          <div className="certs-wrapper">
            <h3 className="certs-title">{t('about.certs')}</h3>
            
            <div className="cert-card">
              <div className="cert-icon">🎓</div>
              <div className="cert-info">
                <h4>{t('cert.cs')}</h4>
                <p>{t('cert.cs.desc')}</p>
              </div>
            </div>
            
            <div className="cert-card">
              <div className="cert-icon">⚙️</div>
              <div className="cert-info">
                <h4>{t('cert.tec')}</h4>
                <p>{t('cert.tec.desc')}</p>
              </div>
            </div>
            
            <div className="cert-card">
              <div className="cert-icon">☕</div>
              <div className="cert-info">
                <h4>{t('cert.java')}</h4>
                <p>{t('cert.java.desc')}</p>
              </div>
            </div>
            
            <div className="cert-card">
              <div className="cert-icon">🚀</div>
              <div className="cert-info">
                <h4>{t('cert.aws')}</h4>
                <p>{t('cert.aws.desc')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;