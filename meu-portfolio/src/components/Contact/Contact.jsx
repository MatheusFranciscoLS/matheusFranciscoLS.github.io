import { useContext, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t, lang } = useContext(LanguageContext);
  const [copied, setCopied] = useState(false);
  
  // Estados de controle do formulário (O toque de Sênior)
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('matheusf.ls@hotmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Função que intercepta o envio e faz via React/Fetch API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Volta ao normal depois de 5 segundos para caso ele queira enviar outro
        setTimeout(() => setFormStatus('idle'), 5000); 
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
} catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <section id="contato" className="section contact-section">
      <div className="container">
        <div className="contact-box">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>

          <div className="contact-links">
            <a
              href="https://wa.me/5519981911214?text=Olá%20Matheus,%20vi%20seu%20portfólio."
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <i className="devicon-whatsapp-plain"></i>
              <span>{t('contact.whats')}</span>
            </a>

            <button className="btn btn-outline" onClick={handleCopyEmail}>
              <span>{copied ? t('contact.copied') : t('contact.copy')}</span>
            </button>
          </div>

          <p className="contact-divider">
            {t('contact.direct')}
          </p>

          {/* Renderização Condicional do React */}
          {formStatus === 'success' ? (
            <div className="success-card">
              <div className="success-icon">✔️</div>
              <h3>{lang === 'pt' ? 'Mensagem Enviada!' : 'Message Sent!'}</h3>
              <p>{lang === 'pt' ? 'Obrigado pelo contato. Retornarei o mais breve possível.' : 'Thank you for reaching out. I will get back to you shortly.'}</p>
            </div>
          ) : (
            <form
              action="https://formspree.io/f/mjklbjbj"
              method="POST"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_gotcha" />

              <div className="input-group">
                <input type="text" name="name" placeholder={t('form.name')} required disabled={formStatus === 'submitting'} />
                <input type="email" name="email" placeholder={t('form.email')} required disabled={formStatus === 'submitting'} />
              </div>

              <textarea name="message" rows="4" placeholder={t('form.message')} required disabled={formStatus === 'submitting'}></textarea>

              <button 
                type="submit" 
                className={`btn btn-primary full ${formStatus === 'error' ? 'btn-error' : ''}`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' 
                  ? (lang === 'pt' ? 'Enviando...' : 'Sending...') 
                  : formStatus === 'error' 
                    ? (lang === 'pt' ? 'Erro! Tente novamente' : 'Error! Try again')
                    : t('contact.send')}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;