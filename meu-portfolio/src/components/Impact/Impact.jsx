import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './Impact.css';

const Impact = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section id="diferenciais" className="section">
      <div className="container">
        <div className="center-text">
          <h2 className="section-title">{t('value.title')}</h2>
          <p className="section-subtitle">{t('value.subtitle')}</p>
        </div>

        <div className="value-grid">
          <div className="value-card">
            <div className="value-icon">
              <i className="ph ph-rocket-launch"></i>
            </div>
            <h3>{t('value.card1.title')}</h3>
            <p>{t('value.card1.desc')}</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="ph ph-crosshair"></i>
            </div>
            <h3>{t('value.card2.title')}</h3>
            <p>{t('value.card2.desc')}</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="ph ph-handshake"></i>
            </div>
            <h3>{t('value.card3.title')}</h3>
            <p>{t('value.card3.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;