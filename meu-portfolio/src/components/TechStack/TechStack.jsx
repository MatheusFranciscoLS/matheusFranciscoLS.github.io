import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './TechStack.css';

const TechStack = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section id="tech" className="section">
      <div className="container">
        
        <div className="center-text">
          <h2 className="section-title" style={{ marginBottom: '10px' }}>
            {t('tech.title')}
          </h2>
          <p className="section-subtitle">
            {t('tech.subtitle')}
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-box">
            <h3>{t('tech.backend')}</h3>
            <div className="icons-wrapper" style={{ gap: '15px' }}>
              <i className="devicon-nodejs-plain colored" title="Node.js"></i>
              <i className="devicon-python-plain colored" title="Python"></i>
              <i className="devicon-java-plain colored" title="Java 17+"></i>
              <i className="devicon-rabbitmq-plain colored" title="RabbitMQ"></i>
              <i className="devicon-spring-original colored" title="Spring Boot"></i>
              <i className="devicon-postgresql-plain colored" title="PostgreSQL"></i>
            </div>
          </div>

          <div className="tech-box">
            <h3>{t('tech.frontend')}</h3>
            <div className="icons-wrapper">
              <i className="devicon-react-original colored" title="React.js"></i>
              <i className="devicon-typescript-plain colored" title="TypeScript"></i>
              <i className="devicon-html5-plain colored" title="HTML5"></i>
              <i className="devicon-css3-plain colored" title="CSS3"></i>
            </div>
          </div>

          <div className="tech-box">
            <h3>{t('tech.devops')}</h3>
            <div className="icons-wrapper">
              <i className="devicon-git-plain colored" title="Git/GitHub"></i>
              <i className="devicon-docker-plain colored" title="Docker"></i>
              <i className="devicon-amazonwebservices-plain-wordmark colored" title="AWS Cloud"></i>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;