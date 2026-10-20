import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Mini calculadora de la portada (restyling oct-2026).
 * Usa la MISMA tarifa que components/Calculadora.tsx con sus valores por defecto
 * (conducto 2 m vertical + 3 m horizontal, turbina estándar de acceso fácil,
 * estado normal, sin plan anual). Si cambia la tarifa allí, se cambia aquí.
 * «Continuar» abre la calculadora completa con lo elegido (?c&t&d&f).
 */
const BASE = 150, POR_FILTRO = 67, CONDUCTO_DEF = 2 * 26 + 3 * 18, TURBINA_DEF = 420;

const Toggle: React.FC<{ on: boolean; label: string; icon: string; onClick: () => void }> = ({ on, label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left transition-colors ${on ? 'border-brand bg-brand-soft/70 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/25'}`}
  >
    <span className="flex items-center gap-2.5">
      <span className={`material-symbols-outlined text-[19px] ${on ? 'text-brand' : 'text-muted'}`} aria-hidden="true">{icon}</span>
      <span className="text-[14px] font-medium text-ink">{label}</span>
    </span>
    <span className={`flex h-[18px] w-8 items-center rounded-full p-0.5 transition-colors ${on ? 'bg-brand' : 'bg-line'}`} aria-hidden="true">
      <span className={`h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-3.5' : ''}`}></span>
    </span>
  </button>
);

const MiniCalc: React.FC = () => {
  const navigate = useNavigate();
  const [c, setC] = useState(true);
  const [t, setT] = useState(true);
  const [d, setD] = useState(false);
  const [f, setF] = useState(3);

  const total = useMemo(() => {
    if (!c && !t && !d) return 0;
    return BASE + (c ? f * POR_FILTRO : 0) + (d ? CONDUCTO_DEF : 0) + (t ? TURBINA_DEF : 0);
  }, [c, t, d, f]);

  const ir = () => navigate(`/calculadora?c=${+c}&t=${+t}&d=${+d}&f=${f}`);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,.65)]">
      {/* Barra de ventana */}
      <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        </span>
        <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-white px-3 py-1 font-mono text-[10.5px] text-muted">
          <span className="material-symbols-outlined text-[12px]">lock</span>
          afondolimpiezadecampanas.com/calculadora
        </span>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[15px] font-semibold">¿Qué necesitas limpiar?</p>
          <span className="font-mono text-[10.5px] text-brand">Paso 0 de 4</span>
        </div>

        <div className="space-y-2">
          <Toggle on={c} label="Campana y Filtros" icon="shelves" onClick={() => setC(!c)} />
          {c && (
            <div className="flex items-center justify-between rounded-lg bg-mist px-3.5 py-2">
              <span className="font-mono text-[11px] text-muted">Número de Filtros (Secciones)</span>
              <span className="flex items-center gap-2">
                <button type="button" aria-label="Menos filtros" onClick={() => setF(Math.max(1, f - 1))} className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white text-[15px] hover:bg-mist">-</button>
                <span className="tnum w-5 text-center text-[15px] font-semibold">{f}</span>
                <button type="button" aria-label="Más filtros" onClick={() => setF(Math.min(20, f + 1))} className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white text-[15px] hover:bg-mist">+</button>
              </span>
            </div>
          )}
          <Toggle on={t} label="Turbina (Motor)" icon="cyclone" onClick={() => setT(!t)} />
          <Toggle on={d} label="Conductos de Extracción" icon="settings_input_component" onClick={() => setD(!d)} />
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="font-mono text-[10.5px] text-muted">Inversión Estimada</p>
            <p className="tnum text-[2rem] font-semibold leading-none tracking-[-0.03em]">
              {total}<span className="ml-0.5 text-[1.1rem] text-brand">€</span>
            </p>
          </div>
          <button
            type="button"
            onClick={ir}
            disabled={!c && !t && !d}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-4 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-40"
          >
            Continuar
            <span className="material-symbols-outlined text-[17px]" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniCalc;
