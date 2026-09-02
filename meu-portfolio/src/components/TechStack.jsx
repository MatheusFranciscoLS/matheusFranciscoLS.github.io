export default function TechStack({ text }) {
  return (
    <section className="section tech-stack" id="stack">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>

        <div className="stack__grid">
          {text.groups.map((group) => (
            <div className="stack__group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="stack__items">
                {group.items.map((item) => (
                  <span className="stack__pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
