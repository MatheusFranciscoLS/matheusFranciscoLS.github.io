export default function ProfileSection({ text }) {
  return (
    <section className="section profile-section" id="perfil">
      <div className="section-inner">
        <div className="profile-intro">
          <div className="section-heading">
            <p className="section-eyebrow">{text.eyebrow}</p>
            <h2>{text.title}</h2>
          </div>
          <div className="profile-copy">
            <p className="profile-lead">{text.intro}</p>
            <p>{text.body}</p>
          </div>
        </div>

        <div className="principles-grid">
          {text.principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>

        <div className="path-layout">
          <div className="path-title">
            <span>PATH / 2022—NOW</span>
            <h3>{text.pathTitle}</h3>
          </div>
          <ol className="path-list">
            {text.path.map((item) => (
              <li key={item.year + item.title}>
                <span>{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
