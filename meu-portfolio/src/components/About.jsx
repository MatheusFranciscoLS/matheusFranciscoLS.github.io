export default function About({ text }) {
  return (
    <section className="section about" id="sobre">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
        </div>

        <div className="about__grid">
          <div className="about__photo-area">
            <div className="about__badge-card">
              <div className="about__avatar-circle">
                <span>MF</span>
              </div>
              <h3 className="about__badge-name">Matheus Francisco</h3>
              <span className="about__badge-role">Desenvolvedor Full-Stack</span>
              <span className="about__badge-location">📍 Limeira, SP • Brasil</span>
            </div>
          </div>

          <div className="about__copy">
            <p>{text.intro}</p>
            <p>{text.body}</p>
            <p className="about__highlight">{text.body2}</p>
          </div>
        </div>

        <div className="about__principles">
          {text.principles.map((p) => (
            <article className="principle-card" key={p.number}>
              <span className="principle-card__num">{p.number}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
