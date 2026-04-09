export function SpiralBinding() {
  return (
    <div className="spiral-binding" aria-hidden="true">
      <svg viewBox="0 0 360 28" className="spiral-binding__svg" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#3d3d3d" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="28" fill="#111" />
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 14 + i * 15.8
          return (
            <g key={i}>
              <ellipse
                cx={x}
                cy="14"
                rx="5.2"
                ry="10"
                fill="none"
                stroke="url(#wire)"
                strokeWidth="2.4"
              />
            </g>
          )
        })}
      </svg>
      <div className="spiral-binding__hook" />
    </div>
  )
}
