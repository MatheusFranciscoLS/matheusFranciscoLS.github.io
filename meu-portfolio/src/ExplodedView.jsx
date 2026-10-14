// Vista explodida do CogniVault: quatro camadas isométricas (interface, API, fila, banco).
// Cada camada é desenhada em coordenadas planas (0..S) e projetada com uma matriz isométrica.
const S = 128; // lado da camada
const T = 10; // espessura
const STEP = 140; // distância vertical entre camadas
const CX = 160; // eixo central
const Y0 = 22;
const K = 0.866;
const BADGE_X = 372;

const point = (u, v, y) => `${(CX + K * (u - v)).toFixed(1)},${(y + 0.5 * (u + v)).toFixed(1)}`;
const top = (y) => [point(0, 0, y), point(S, 0, y), point(S, S, y), point(0, S, y)].join(' ');
const left = (y) => [point(0, S, y), point(S, S, y), point(S, S, y + T), point(0, S, y + T)].join(' ');
const right = (y) => [point(S, 0, y), point(S, S, y), point(S, S, y + T), point(S, 0, y + T)].join(' ');

function Detail({ index }) {
  if (index === 0) {
    return (
      <>
        <rect x="12" y="12" width="104" height="104" />
        <line x1="12" y1="34" x2="116" y2="34" />
        <rect x="22" y="44" width="84" height="14" />
        <line x1="22" y1="72" x2="96" y2="72" />
        <line x1="22" y1="86" x2="84" y2="86" />
        <line x1="22" y1="100" x2="90" y2="100" />
      </>
    );
  }
  if (index === 1) {
    return (
      <>
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <rect x="16" y={18 + k * 26} width="14" height="14" />
            <line x1="38" y1={25 + k * 26} x2={110 - k * 9} y2={25 + k * 26} />
          </g>
        ))}
      </>
    );
  }
  if (index === 2) {
    return (
      <>
        {[12, 50, 88].map((x) => (
          <rect key={x} x={x} y="50" width="28" height="28" />
        ))}
        <line x1="40" y1="64" x2="50" y2="64" />
        <line x1="78" y1="64" x2="88" y2="64" />
      </>
    );
  }
  return (
    <>
      {[16, 52, 88].map((y) => (
        <g key={y}>
          <rect x="14" y={y} width="100" height="24" />
          <line x1="44" y1={y} x2="44" y2={y + 24} />
        </g>
      ))}
    </>
  );
}

export default function ExplodedView({ labels, active, onActive, label }) {
  const height = Y0 + STEP * 3 + S + T + 6;
  return (
    <svg
      className="exploded"
      viewBox={`0 0 420 ${height}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <line className="exploded__axis" x1={CX} y1="4" x2={CX} y2={height - 4} />
      {labels.map((name, i) => {
        const y = Y0 + i * STEP;
        const isActive = active === i;
        const badgeY = y + S / 2;
        return (
          <g
            key={name}
            className={`exploded__layer${isActive ? ' is-active' : ''}`}
            style={{ '--i': i }}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
          >
            <g className="exploded__slab">
              <polygon className="exploded__side exploded__side--l" points={left(y)} />
              <polygon className="exploded__side exploded__side--r" points={right(y)} />
              <polygon className="exploded__top" points={top(y)} />
              <g
                className="exploded__detail"
                transform={`matrix(${K} 0.5 ${-K} 0.5 ${CX} ${y})`}
              >
                <Detail index={i} />
              </g>
            </g>
            <g className="exploded__callout">
              <line x1={CX + K * S + 6} y1={badgeY} x2={BADGE_X - 15} y2={badgeY} />
              <circle cx={BADGE_X} cy={badgeY} r="15" />
              <text x={BADGE_X} y={badgeY + 5} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
