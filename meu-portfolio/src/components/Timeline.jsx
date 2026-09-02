export default function Timeline({ text }) {
  return (
    <section className="section timeline">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
        </div>

        <div className="timeline__list">
          {text.items.map((item) => (
            <div className={`timeline__item ${item.highlight ? 'timeline__item--highlight' : ''}`} key={item.year}>
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
      </div>
    </section>
  );
}
