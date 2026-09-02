import { Award, CheckCircle2, Clock } from 'lucide-react';

export default function Timeline({ text }) {
  return (
    <section className="section timeline" id="formacao">
      <div className="container">
        {/* Trajetória */}
        <div className="section-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
        </div>

        <div className="timeline__list">
          {text.items.map((item) => (
            <div
              className={`timeline__item ${item.highlight ? 'timeline__item--highlight' : ''}`}
              key={item.year}
            >
              <div className="timeline__marker" aria-hidden="true">
                <span className="timeline__dot" />
                <span className="timeline__line" />
              </div>
              <div className="timeline__content">
                <span className="timeline__year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificações em Destaque */}
        {text.certifications && (
          <div className="certifications-block">
            <div className="section-heading">
              <p className="eyebrow">
                <Award size={14} aria-hidden="true" />
                {text.certificationsEyebrow}
              </p>
              <h2>{text.certificationsTitle}</h2>
              {text.certificationsIntro && <p>{text.certificationsIntro}</p>}
            </div>

            <div className="certifications__grid">
              {text.certifications.map((cert) => (
                <article className="cert-card card" key={cert.title}>
                  <div className="cert-card__top">
                    <span className="cert-card__badge">
                      <Clock size={12} aria-hidden="true" />
                      {cert.hours}
                    </span>
                    <span className="cert-card__year">{cert.year}</span>
                  </div>

                  <h3 className="cert-card__title">{cert.title}</h3>
                  <p className="cert-card__issuer">
                    <CheckCircle2 size={13} className="cert-card__check" aria-hidden="true" />
                    {cert.issuer}
                  </p>

                  <p className="cert-card__desc">{cert.description}</p>

                  <div className="cert-card__tags">
                    {cert.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
