import React from 'react';

/** Mini pantallas ilustrativas de «¿Por qué es obligatorio…?». Decorativas: aria-hidden. */

const Row: React.FC<{ label: string; st: 'ok' | 'warn' | 'ko' }> = ({ label, st }) => (
  <div className="flex items-center justify-between border-t border-line px-3 py-1.5 first:border-t-0">
    <span className="text-[11.5px] text-ink-2">{label}</span>
    {st === 'ok' && <span className="rounded-sm bg-[#e8f7ee] px-1.5 py-0.5 font-mono text-[9.5px] text-[#15803d]">OK</span>}
    {st === 'warn' && <span className="rounded-sm bg-[#fff4db] px-1.5 py-0.5 font-mono text-[9.5px] text-[#b45309]">Revisar</span>}
    {st === 'ko' && <span className="rounded-sm bg-[#fdecec] px-1.5 py-0.5 font-mono text-[9.5px] text-[#b91c1c]">Falta</span>}
  </div>
);

export const VisualMulta: React.FC = () => (
  <div className="w-[230px] overflow-hidden rounded-lg border border-line bg-white shadow-card" aria-hidden="true">
    <div className="flex items-center gap-2 border-b border-line px-3 py-2">
      <span className="material-symbols-outlined text-[16px] text-ink-3">assignment</span>
      <span className="text-[11.5px] font-semibold text-ink">Inspección sanitaria</span>
    </div>
    <Row label="Campana y filtros" st="ok" />
    <Row label="Conductos" st="warn" />
    <Row label="Informe técnico" st="ko" />
    <div className="flex items-center justify-between bg-[#fdecec] px-3 py-2">
      <span className="font-mono text-[9.5px] text-[#b91c1c]">Infracción grave</span>
      <span className="tnum text-[13px] font-semibold text-[#b91c1c]">60.000€</span>
    </div>
  </div>
);

/**
 * Incendio de campana en bucle de 9 s: el fogón echa vapor, la grasa se pega
 * en la campana y el conducto, gotea, la barra sube a rojo, prende y el fuego
 * trepa por el conducto (efecto chimenea). Con «reducir movimiento», quieto.
 */
const CSS_INCENDIO = `
.afi * { transform-box: fill-box; }
.afi-vapor { animation: afi-vapor 9s ease-out infinite; opacity: 0; }
.afi-vapor.v2 { animation-delay: .5s; } .afi-vapor.v3 { animation-delay: 1s; }
@keyframes afi-vapor { 0%{opacity:0;transform:translateY(0)} 8%{opacity:.7} 30%{opacity:0;transform:translateY(-34px)} 100%{opacity:0;transform:translateY(-34px)} }
.afi-grasa { transform-origin: left center; animation: afi-grasa 9s ease-in-out infinite; }
@keyframes afi-grasa { 0%{transform:scaleX(.05);opacity:.4} 45%{transform:scaleX(1);opacity:1} 92%{transform:scaleX(1);opacity:1} 100%{transform:scaleX(.05);opacity:.4} }
.afi-grasa-v { transform-origin: center bottom; animation: afi-grasav 9s ease-in-out infinite; }
@keyframes afi-grasav { 0%{transform:scaleY(.05)} 45%{transform:scaleY(1)} 92%{transform:scaleY(1)} 100%{transform:scaleY(.05)} }
.afi-gota { animation: afi-gota 9s ease-in infinite; opacity: 0; }
.afi-gota.g2 { animation-delay: .9s; }
@keyframes afi-gota { 0%,30%{opacity:0;transform:translateY(0)} 33%{opacity:1;transform:translateY(0)} 42%{opacity:1;transform:translateY(30px)} 44%,100%{opacity:0;transform:translateY(30px)} }
.afi-llama { transform-origin: center bottom; animation: afi-llama 9s ease-out infinite; opacity: 0; }
@keyframes afi-llama { 0%,52%{opacity:0;transform:scale(.2)} 58%{opacity:1;transform:scale(1)} 90%{opacity:1;transform:scale(1.1)} 96%,100%{opacity:0;transform:scale(.4)} }
.afi-trepa { transform-origin: center bottom; animation: afi-trepa 9s ease-out infinite; opacity: 0; }
@keyframes afi-trepa { 0%,58%{opacity:0;transform:scaleY(0)} 72%{opacity:1;transform:scaleY(1)} 90%{opacity:1;transform:scaleY(1)} 96%,100%{opacity:0;transform:scaleY(1)} }
.afi-parpadeo { animation: afi-parp .35s ease-in-out infinite alternate; transform-origin: center bottom; }
@keyframes afi-parp { from{transform:scaleY(1) skewX(0)} to{transform:scaleY(1.12) skewX(-4deg)} }
.afi-brillo { animation: afi-brillo 9s ease-out infinite; opacity: 0; }
@keyframes afi-brillo { 0%,55%{opacity:0} 65%,90%{opacity:.55} 100%{opacity:0} }
.afi-barra { transform-origin: left center; animation: afi-barra 9s ease-in-out infinite; }
@keyframes afi-barra { 0%{transform:scaleX(.08)} 50%{transform:scaleX(.82)} 60%,92%{transform:scaleX(1)} 100%{transform:scaleX(.08)} }
.afi-txt-ok { animation: afi-ok 9s steps(1) infinite; } .afi-txt-ko { animation: afi-ko 9s steps(1) infinite; }
@keyframes afi-ok { 0%{opacity:1} 40%{opacity:0} 100%{opacity:1} } @keyframes afi-ko { 0%{opacity:0} 40%{opacity:1} 96%{opacity:0} }
@media (prefers-reduced-motion: reduce) {
  .afi *, .afi-barra, .afi-txt-ok, .afi-txt-ko { animation: none !important; }
  .afi-llama, .afi-trepa, .afi-brillo { opacity: 1; } .afi-txt-ok { opacity: 0; } .afi-txt-ko { opacity: 1; }
}
`;

export const VisualIncendio: React.FC = () => (
  <div className="w-[250px]" aria-hidden="true">
    <style>{CSS_INCENDIO}</style>
    <svg viewBox="0 0 250 140" className="afi w-full overflow-visible">
      {/* resplandor */}
      <ellipse className="afi-brillo" cx="95" cy="70" rx="90" ry="60" fill="#f97316" style={{ filter: 'blur(14px)' }} />
      {/* conducto: sale de la campana y sube */}
      <path d="M118 46 H178 a8 8 0 0 1 8 8 V2" fill="none" stroke="#c9cfda" strokeWidth="18" strokeLinejoin="round" />
      <path d="M118 46 H178 a8 8 0 0 1 8 8 V2" fill="none" stroke="#fff" strokeWidth="13" strokeLinejoin="round" />
      {/* grasa dentro del conducto */}
      <rect className="afi-grasa" x="118" y="49" width="64" height="4" rx="2" fill="#b7772f" />
      <rect className="afi-grasa-v" x="189" y="6" width="3.5" height="44" rx="1.75" fill="#b7772f" />
      {/* fuego trepando por el conducto */}
      <g className="afi-trepa">
        <path className="afi-parpadeo" d="M181 52 c-4 -10 2 -16 0 -26 c6 6 4 14 8 18 c2 -8 0 -14 3 -22 c5 10 4 22 0 30z" fill="#f2b01e" />
        <path className="afi-parpadeo" d="M184 52 c-2 -6 1 -10 0 -16 c4 4 3 9 5 12 c1 -4 0 -8 2 -12 c3 6 2 12 -1 16z" fill="#dc2626" />
      </g>
      {/* campana */}
      <path d="M40 46 H130 L146 76 H24 Z" fill="#eef0f3" stroke="#9aa3b2" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="34" y="72" width="102" height="5" rx="1.5" fill="#d5dae2" />
      {/* grasa en los filtros de la campana */}
      <rect className="afi-grasa" x="36" y="73" width="98" height="3.5" rx="1.5" fill="#b7772f" />
      {/* gotas */}
      <ellipse className="afi-gota" cx="62" cy="80" rx="2.2" ry="3" fill="#a0621f" />
      <ellipse className="afi-gota g2" cx="104" cy="80" rx="2.2" ry="3" fill="#a0621f" />
      {/* llamas en la campana */}
      <g className="afi-llama">
        <path className="afi-parpadeo" d="M58 76 c-6 -12 4 -18 2 -30 c8 8 6 18 12 22 c2 -10 -1 -16 4 -24 c8 12 6 26 -2 32z" fill="#f2b01e" />
        <path className="afi-parpadeo" d="M64 76 c-3 -7 2 -11 1 -18 c5 5 4 11 7 13 c1 -6 0 -9 3 -14 c4 8 3 15 -2 19z" fill="#dc2626" />
        <path className="afi-parpadeo" d="M96 76 c-5 -9 3 -14 1 -23 c7 6 5 14 10 17 c2 -8 -1 -12 3 -18 c7 9 5 20 -2 24z" fill="#f2b01e" />
      </g>
      {/* vapor */}
      {['', 'v2', 'v3'].map((v, i) => (
        <path key={i} className={`afi-vapor ${v}`} d={`M${70 + i * 16} 112 c-4 -6 4 -10 0 -16 c-4 -6 4 -10 0 -16`} fill="none" stroke="#b6bdca" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* fogón y sartén */}
      <rect x="30" y="122" width="110" height="14" rx="3" fill="#1a2336" />
      <rect x="62" y="114" width="46" height="8" rx="3" fill="#3b4558" />
      <rect x="106" y="116" width="22" height="3" rx="1.5" fill="#3b4558" />
      <path d="M68 122 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0" fill="none" stroke="#f97316" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 rounded-md border border-line bg-white px-3 py-2 shadow-card">
      <div className="relative mb-1 flex items-center justify-between">
        <span className="font-mono text-[9.5px] text-muted">Grasa acumulada</span>
        <span className="relative font-mono text-[9.5px]">
          <span className="afi-txt-ok absolute right-0 whitespace-nowrap text-[#b45309]">Subiendo</span>
          <span className="afi-txt-ko whitespace-nowrap text-[#b91c1c]">Alto riesgo</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div className="afi-barra h-full w-full rounded-full bg-linear-to-r from-signal to-[#dc2626]"></div>
      </div>
    </div>
  </div>
);

export const VisualGarantia: React.FC = () => (
  <div className="relative h-[140px] w-[230px]" aria-hidden="true">
    <div className="absolute left-6 top-0 h-[120px] w-[170px] rotate-[-5deg] rounded-md border border-line bg-white shadow-card"></div>
    <div className="absolute left-10 top-2 h-[124px] w-[176px] rounded-md border border-line bg-white p-3 shadow-card">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[15px] text-brand">description</span>
        <span className="text-[10.5px] font-semibold text-ink">Informe técnico de limpieza</span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-full rounded-sm bg-line"></div>
        <div className="h-1.5 w-4/5 rounded-sm bg-line"></div>
        <div className="h-1.5 w-3/5 rounded-sm bg-line"></div>
      </div>
      <div className="absolute bottom-2.5 right-2.5 flex h-12 w-12 -rotate-12 items-center justify-center rounded-full border-2 border-[#15803d] text-center font-mono text-[7.5px] leading-tight text-[#15803d]">
        UNE<br />100165
      </div>
    </div>
    <div className="absolute -left-1 bottom-0 flex flex-col gap-1">
      {['Sanidad', 'Seguros', 'Auditoría'].map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-0.5 text-[10px] text-ink-2 shadow-card">
          <span className="material-symbols-outlined text-[12px] text-[#15803d]">check_circle</span>{t}
        </span>
      ))}
    </div>
  </div>
);
