import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Presupuesto instantáneo de la portada (restyling oct-2026, v3).
 * Usa la MISMA tarifa que components/Calculadora.tsx con sus valores por defecto
 * (conducto 2 m vertical + 3 m horizontal, turbina estándar de acceso fácil,
 * estado normal, sin plan anual). Si cambia la tarifa allí, se cambia aquí.
 * «Continuar» abre la calculadora completa con lo elegido (?c&t&d&f).
 */
const BASE = 150, POR_FILTRO = 67, CONDUCTO_DEF = 2 * 26 + 3 * 18, TURBINA_DEF = 420;

// Número que rueda hasta el valor nuevo
const useRueda = (valor: number) => {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);
  useEffect(() => {
    const ini = desde.current, t0 = performance.now(), dur = 450;
    let raf = 0;
    const paso = (t: number) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      setMostrado(Math.round(ini + (valor - ini) * e));
      if (k < 1) raf = requestAnimationFrame(paso); else desde.current = valor;
    };
    raf = requestAnimationFrame(paso);
    return () => { cancelAnimationFrame(raf); desde.current = valor; };
  }, [valor]);
  return mostrado;
};

const Tile: React.FC<{ on: boolean; label: string; icon: string; onClick: () => void }> = ({ on, label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    className={`group relative flex flex-col items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${on ? 'border-brand bg-brand-soft/70 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/25'}`}
  >
    <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${on ? 'bg-brand text-white' : 'bg-mist text-ink-3'}`}>
      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>
    </span>
    <span className="text-[12.5px] font-medium leading-tight text-ink">{label}</span>
    <span className={`absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${on ? 'border-brand bg-brand text-white' : 'border-line bg-white'}`} aria-hidden="true">
      {on && <span className="material-symbols-outlined text-[12px]">check</span>}
    </span>
  </button>
);

const MiniCalc: React.FC = () => {
  const navigate = useNavigate();
  const [c, setC] = useState(true);
  const [t, setT] = useState(true);
  const [d, setD] = useState(false);
  const [f, setF] = useState(3);

  const lineas = useMemo(() => {
    const l: { k: string; label: string; v: number }[] = [];
    if (!c && !t && !d) return l;
    l.push({ k: 'b', label: 'Desplazamiento y materiales', v: BASE });
    if (c) l.push({ k: 'c', label: `Campana · ${f} filtros`, v: f * POR_FILTRO });
    if (t) l.push({ k: 't', label: 'Turbina estándar', v: TURBINA_DEF });
    if (d) l.push({ k: 'd', label: 'Conductos · 5 m', v: CONDUCTO_DEF });
    return l;
  }, [c, t, d, f]);
  const total = lineas.reduce((s, x) => s + x.v, 0);
  const rueda = useRueda(total);

  const ir = () => navigate(`/calculadora?c=${+c}&t=${+t}&d=${+d}&f=${f}`);

  return (
    <div className="relative">
      {/* Halo de marca detrás de la tarjeta */}
      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-linear-to-br from-brand/50 via-brand/10 to-signal/20 opacity-70 blur-2xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,.7)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1fa855] opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1fa855]"></span>
            </span>
            <span className="text-[13.5px] font-semibold">Presupuesto al instante</span>
          </span>
          <span className="font-mono text-[10.5px] text-muted">Sin compromiso</span>
        </div>

        <div className="p-5">
          <p className="mb-3 text-[14px] font-medium text-ink-2">¿Qué necesitas limpiar?</p>
          <div className="grid grid-cols-3 gap-2">
            <Tile on={c} label="Campana y Filtros" icon="shelves" onClick={() => setC(!c)} />
            <Tile on={t} label="Turbina (Motor)" icon="cyclone" onClick={() => setT(!t)} />
            <Tile on={d} label="Conductos de Extracción" icon="settings_input_component" onClick={() => setD(!d)} />
          </div>

          <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${c ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="mt-4 rounded-xl border border-line px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted">Número de Filtros (Secciones)</span>
                  <span className="tnum text-[15px] font-semibold">{f}</span>
                </div>
                <input
                  type="range" min={1} max={12} value={f}
                  onChange={(e) => setF(Number(e.target.value))}
                  aria-label="Número de filtros"
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
                />
              </div>
            </div>
          </div>

          {/* Desglose tipo recibo */}
          <ul className="mt-4 space-y-1.5 border-t border-dashed border-line pt-4">
            {lineas.map((l) => (
              <li key={l.k} className="flex items-center justify-between text-[13px]">
                <span className="text-muted">{l.label}</span>
                <span className="tnum font-medium text-ink-2">{l.v} €</span>
              </li>
            ))}
            {lineas.length === 0 && <li className="text-[13px] text-muted">Elige al menos un servicio.</li>}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4 bg-ink px-5 py-4 text-white">
          <div>
            <p className="font-mono text-[10.5px] text-white/55">Inversión Estimada</p>
            <p className="tnum text-[2.1rem] font-semibold leading-none tracking-[-0.03em]">
              {rueda}<span className="ml-0.5 text-[1.1rem] text-[#9fb0ff]">€</span>
            </p>
          </div>
          <button
            type="button"
            onClick={ir}
            disabled={!c && !t && !d}
            className="group inline-flex h-11 items-center gap-1.5 rounded-lg bg-white px-4 text-[14px] font-semibold text-ink transition-colors hover:bg-slate-100 disabled:opacity-40"
          >
            Continuar
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniCalc;
