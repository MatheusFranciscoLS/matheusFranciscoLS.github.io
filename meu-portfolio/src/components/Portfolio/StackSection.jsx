export default function StackSection({ text }) {
  return (
    <section className="section stack-section" id="stack">
      <div className="section-inner">
        <div className="section-heading stack-heading">
          <p className="section-eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>

        <div className="stack-grid">
          {text.groups.map((group, index) => (
            <article className="stack-group" key={group.title}>
              <div className="stack-group-title">
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="stack-items">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
