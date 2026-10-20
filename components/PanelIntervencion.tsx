import React, { useEffect, useState } from 'react';

/**
 * Panel de intervención de muestra (página de conductos, restyling oct-2026).
 * Los cinco pasos son los del método de la propia página. Decorativo: aria-hidden.
 * Avanza solo, en bucle, para que se vea vivo; con «reducir movimiento» se queda quieto.
 */
const PASOS = ['Inspección inicial', 'Apertura de registros', 'Desengrase interior', 'Sellado de registros', 'Informe técnico'];

const PanelIntervencion: React.FC = () => {
  const [activo, setActivo] = useState(2);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActivo((a) => (a + 1) % (PASOS.length + 1)), 2200);
    return () => window.clearInterval(id);
  }, []);
  const pct = Math.round((Math.min(activo, PASOS.length) / PASOS.length) * 100);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,.65)]" aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        </span>
        <span className="font-mono text-[10.5px] text-muted">Intervención · conducto de extracción</span>
      </div>

      <div className="grid grid-cols-[120px_1fr] gap-4 p-4">
        {/* Esquema del conducto: tramo vertical + horizontal, con registros */}
        <svg viewBox="0 0 120 170" className="w-full">
          <rect x="10" y="132" width="44" height="22" rx="3" fill="#eef0fc" stroke="#1f35d1" strokeWidth="1.2" />
          <path d="M22 132 V40 a10 10 0 0 1 10 -10 H110" fill="none" stroke="#c9cfda" strokeWidth="16" strokeLinejoin="round" />
          <path d="M22 132 V40 a10 10 0 0 1 10 -10 H110" fill="none" stroke={activo >= 3 ? '#cfd6ff' : '#c2873a'} strokeWidth="9" strokeLinejoin="round" style={{ transition: 'stroke .6s' }} />
          {[[22, 100], [22, 58], [70, 30]].map(([x, y], i) => (
            <rect key={i} x={x - 6} y={y - 6} width="12" height="12" rx="2" fill={activo >= 2 ? '#1f35d1' : '#fff'} stroke="#1f35d1" strokeWidth="1.2" style={{ transition: 'fill .4s' }} />
          ))}
          <text x="10" y="166" fontSize="8.5" className="fill-[#5d6677] font-mono">campana</text>
        </svg>

        <ol className="space-y-1.5">
          {PASOS.map((p, i) => {
            const hecho = i < activo, ahora = i === activo;
            return (
              <li key={p} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${ahora ? 'bg-brand-soft' : ''}`}>
                <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border font-mono text-[9px] ${hecho ? 'border-[#16a34a] bg-[#16a34a] text-white' : ahora ? 'border-brand text-brand' : 'border-line text-muted'}`}>
                  {hecho ? <span className="material-symbols-outlined text-[12px]">check</span> : i + 1}
                </span>
                <span className={hecho ? 'text-ink-3' : ahora ? 'font-semibold text-ink' : 'text-muted'}>{p}</span>
                {ahora && <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-brand"></span>}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[10.5px] text-muted">Progreso</span>
          <span className="tnum font-mono text-[10.5px] text-ink">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-brand transition-[width] duration-700" style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default PanelIntervencion;
