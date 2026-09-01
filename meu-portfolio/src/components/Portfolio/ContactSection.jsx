import { ArrowUpRight, BriefcaseBusiness, Check, Copy, GitFork, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const EMAIL = 'matheusf.ls@hotmail.com';

export default function ContactSection({ text }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section contact-section" id="contato">
      <div className="section-inner contact-layout">
        <div className="contact-copy">
          <p className="section-eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>

          <div className="contact-directory">
            <a href={`mailto:${EMAIL}`}>
              <Mail size={18} aria-hidden="true" />
              <span><small>{text.email}</small>{EMAIL}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="https://wa.me/5519981911214?text=Olá%20Matheus,%20vi%20seu%20portfólio." target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              <span><small>{text.whatsapp}</small>+55 19 98191-1214</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/matheusfranciscols" target="_blank" rel="noreferrer">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              <span><small>{text.linkedin}</small>/in/matheusfranciscols</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="https://github.com/MatheusFranciscoLS" target="_blank" rel="noreferrer">
              <GitFork size={18} aria-hidden="true" />
              <span><small>{text.github}</small>@MatheusFranciscoLS</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <button className="copy-email" type="button" onClick={copyEmail}>
            {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            {copied ? text.copied : text.copy}
          </button>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/mjklbjbj"
          method="POST"
          onSubmit={submitForm}
        >
          <div className="form-header">
            <span>MESSAGE / 01</span>
            <h3>{text.formTitle}</h3>
          </div>
          <label>
            <span>{text.name}</span>
            <input name="name" type="text" autoComplete="name" required disabled={status === 'sending'} />
          </label>
          <label>
            <span>{text.emailField}</span>
            <input name="email" type="email" autoComplete="email" required disabled={status === 'sending'} />
          </label>
          <label>
            <span>{text.message}</span>
            <textarea name="message" rows="5" required disabled={status === 'sending'} />
          </label>
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            className="honeypot"
            aria-label="Leave this field empty"
          />
          <button className="button button-primary form-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? text.sending : text.send}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <p className={`form-status ${status}`} aria-live="polite">
            {status === 'success' && text.success}
            {status === 'error' && text.error}
          </p>
        </form>
      </div>
    </section>
  );
}
