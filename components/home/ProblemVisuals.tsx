import React from 'react';

/** Mini pantallas ilustrativas de «¿Por qué es obligatorio…?». Decorativas: aria-hidden. */

const Row: React.FC<{ label: string; st: 'ok' | 'warn' | 'ko' }> = ({ label, st }) => (
  <div className="flex items-center justify-between border-t border-line px-3 py-1.5 first:border-t-0">
    <span className="text-[11.5px] text-ink-2">{label}</span>
    {st === 'ok' && <span className="rounded bg-[#e8f7ee] px-1.5 py-0.5 font-mono text-[9.5px] text-[#15803d]">OK</span>}
    {st === 'warn' && <span className="rounded bg-[#fff4db] px-1.5 py-0.5 font-mono text-[9.5px] text-[#b45309]">Revisar</span>}
    {st === 'ko' && <span className="rounded bg-[#fdecec] px-1.5 py-0.5 font-mono text-[9.5px] text-[#b91c1c]">Falta</span>}
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

export const VisualIncendio: React.FC = () => (
  <div className="w-[240px]" aria-hidden="true">
    <svg viewBox="0 0 240 110" className="w-full">
      {/* conducto */}
      <rect x="10" y="30" width="220" height="50" rx="6" fill="#fff" stroke="#e3e6eb" />
      {/* capa de grasa que engorda hacia la campana */}
      <path d="M14 76 L226 76 L226 72 C180 72 120 66 14 58 Z" fill="#c2873a" opacity=".85" />
      <path d="M14 34 L226 34 L226 37 C180 37 120 41 14 46 Z" fill="#c2873a" opacity=".55" />
      {/* llama en la boca */}
      <path d="M22 66 c6 -10 2 -16 8 -22 c0 8 8 10 6 20 c-2 6 -12 7 -14 2z" fill="#f2b01e" />
      <path d="M26 66 c2 -5 1 -8 4 -11 c0 4 4 5 3 10 c-1 3 -6 3 -7 1z" fill="#dc2626" />
      {/* flechas del tiro */}
      <g stroke="#9aa3b2" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M70 55 h40 m-6 -5 l6 5 l-6 5" />
        <path d="M140 55 h40 m-6 -5 l6 5 l-6 5" />
      </g>
    </svg>
    <div className="mt-1 rounded-md border border-line bg-white px-3 py-2 shadow-card">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-[9.5px] text-muted">Grasa acumulada</span>
        <span className="tnum font-mono text-[9.5px] text-[#b91c1c]">Alto riesgo</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-signal to-[#dc2626]"></div>
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
        <div className="h-1.5 w-full rounded bg-line"></div>
        <div className="h-1.5 w-4/5 rounded bg-line"></div>
        <div className="h-1.5 w-3/5 rounded bg-line"></div>
      </div>
      <div className="absolute bottom-2.5 right-2.5 flex h-12 w-12 rotate-[-12deg] items-center justify-center rounded-full border-2 border-[#15803d] text-center font-mono text-[7.5px] leading-tight text-[#15803d]">
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
