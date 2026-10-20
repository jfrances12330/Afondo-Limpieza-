
import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';

interface CalculadoraProps {
  onBack: () => void;
}

type Step = 0 | 1 | 2 | 3 | 4;
type HoodType = 'mural' | 'central';
type TurbineSize = 'pequeña' | 'estándar' | 'industrial';
type Accessibility = 'fácil' | 'media' | 'difícil';

const Calculadora: React.FC<CalculadoraProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>(0);

  // Lo que se eligió en la mini calculadora de la portada llega por la URL
  // (?c=1&t=1&d=0&f=3). Sin parámetros, los valores de siempre.
  const qs = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const qBool = (k: string, def: boolean) => (qs.has(k) ? qs.get(k) === '1' : def);
  const qFiltros = Math.min(20, Math.max(1, parseInt(qs.get('f') || '3', 10) || 3));

  // Paso 0: Selección de Servicios
  const [includeHood, setIncludeHood] = useState(qBool('c', true));
  const [includeTurbine, setIncludeTurbine] = useState(qBool('t', true));
  const [includeDucts, setIncludeDucts] = useState(qBool('d', false));

  // Paso 1: Campana y Filtros
  const [type, setType] = useState<HoodType>('mural');
  const [filters, setFilters] = useState(qFiltros);

  // Paso 2: Extracción
  const [ductsVertical, setDuctsVertical] = useState(2);
  const [ductsHorizontal, setDuctsHorizontal] = useState(3);
  const [registers, setRegisters] = useState(0);

  // Paso 3: Turbina
  const [turbineSize, setTurbineSize] = useState<TurbineSize>('estándar');
  const [accessibility, setAccessibility] = useState<Accessibility>('fácil');

  // Paso 4: Estado y Plan
  const [state, setState] = useState<'normal' | 'muy-sucio'>('normal');
  const [recurring, setRecurring] = useState(false);

  const [total, setTotal] = useState(0);

  // Cálculos dinámicos
  const campanaMeters = filters * 0.5;
  const estimatedHours = filters * 1;

  const budgetRef = useMemo(() =>
    `AFO-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
    []);

  // Lógica de cálculo técnica
  useEffect(() => {
    if (!includeHood && !includeTurbine && !includeDucts) {
      setTotal(0);
      return;
    }

    let subtotal = 150; // Base fija por desplazamiento y materiales

    if (includeHood) {
      subtotal += filters * 67; // 67€ por sección de 0.5m (que incluye campana + filtro)
    }

    if (includeDucts) {
      subtotal += ductsHorizontal * 18;
      subtotal += ductsVertical * 26;
      subtotal += registers * 30;
    }

    if (includeTurbine) {
      const turbinePrices = { pequeña: 360, estándar: 420, industrial: 780 };
      let turbineCost = turbinePrices[turbineSize];
      const accessMultipliers = { fácil: 1, media: 1.2, difícil: 1.4 };
      turbineCost *= accessMultipliers[accessibility];
      subtotal += turbineCost;
    }

    if (state === 'muy-sucio') subtotal *= 1.25;
    if (recurring) subtotal *= 0.85;

    setTotal(Math.round(subtotal));
  }, [includeHood, includeTurbine, includeDucts, filters, ductsVertical, ductsHorizontal, registers, turbineSize, accessibility, state, recurring]);

  const handleNext = () => {
    if (step === 0) {
      if (includeHood) setStep(1);
      else if (includeDucts) setStep(2);
      else if (includeTurbine) setStep(3);
      else setStep(4);
      return;
    }
    if (step === 1) {
      if (includeDucts) setStep(2);
      else if (includeTurbine) setStep(3);
      else setStep(4);
      return;
    }
    if (step === 2) {
      if (includeTurbine) setStep(3);
      else setStep(4);
      return;
    }
    setStep((s) => Math.min(s + 1, 4) as Step);
  };

  const handlePrev = () => {
    if (step === 4) {
      if (includeTurbine) setStep(3);
      else if (includeDucts) setStep(2);
      else if (includeHood) setStep(1);
      else setStep(0);
      return;
    }
    if (step === 3) {
      if (includeDucts) setStep(2);
      else if (includeHood) setStep(1);
      else setStep(0);
      return;
    }
    if (step === 2) {
      if (includeHood) setStep(1);
      else setStep(0);
      return;
    }
    setStep((s) => Math.max(s - 1, 0) as Step);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(26, 26, 255);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("AFONDO", 20, 22);
    doc.setFontSize(10);
    doc.text("HIGIENE INDUSTRIAL Y SEGURIDAD", 20, 30);
    doc.text(`ID: ${budgetRef}`, 130, 30);

    // Body
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text("DETALLE DEL PRESUPUESTO ESTIMADO", 20, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    let y = 75;
    const lineItem = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, y);
      y += 8;
    };

    if (includeHood) {
      lineItem("Limpieza Campana:", "SÍ");
      lineItem("- Secciones (Filtros):", `${filters} uds (${campanaMeters}m)`);
      // lineItem("Tipo de Campana:", type.toUpperCase()); // Removed as per new step 1
      // lineItem("Tiempo Estimado:", `${estimatedHours} horas de intervención`); // Removed as per new step 1
    }
    if (includeDucts) {
      lineItem("Limpieza Conductos:", "SÍ");
      lineItem("- Metros totales:", `${ductsVertical + ductsHorizontal}m`);
      // lineItem("Conducto Vertical:", `${ductsVertical} metros`); // Removed as per new step 2
      // lineItem("Conducto Horizontal:", `${ductsHorizontal} metros`); // Removed as per new step 2
      // lineItem("Registros Técnicos:", `${registers} unidades`); // Removed as per new step 2
    }
    if (includeTurbine) {
      lineItem("Limpieza Turbina:", `SÍ (${turbineSize.toUpperCase()})`);
      // lineItem("Caudal Turbina:", `${turbineSize.toUpperCase()} (${getTurbineDescription(turbineSize)})`); // Removed as per new step 3
      // lineItem("Accesibilidad:", accessibility.toUpperCase()); // Removed as per new step 3
    }

    lineItem("Estado Suciedad:", state === 'muy-sucio' ? "GRASA CRÍTICA (+25%)" : "NORMAL");
    lineItem("Plan Mantenimiento:", recurring ? "SÍ (-15%)" : "NO");

    // Total
    y += 10;
    doc.setFillColor(248, 250, 252);
    doc.rect(20, y, 170, 20, 'F');
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL ESTIMADO:", 30, y + 13);
    doc.text(`${total} EUR`, 140, y + 13);

    // Footer note
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("* Este documento es una estimación sujeta a validación física por técnicos de AFONDO.", 20, 280);
    doc.text("* Incluye Informe técnico de higienización — soporte documental ante Sanidad y Seguros.", 20, 285);

    doc.save(`Presupuesto_Afondo_${budgetRef}.pdf`);
  };

  const shareWhatsApp = () => {
    let services = "";
    if (includeHood) services += `✅ Campana (${filters} filtros)\n`;
    if (includeTurbine) services += `✅ Turbina (${turbineSize.toUpperCase()})\n`;
    if (includeDucts) services += `✅ Conductos (${ductsVertical + ductsHorizontal}m)\n`;

    const msg = `¡Hola Afondo! 👋 He generado un presupuesto online: *${budgetRef}*\n\n` +
      `🛠️ *SERVICIOS SOLICITADOS:*\n${services}\n` +
      `📊 *DETALLE:*\n` +
      `- *Estado:* ${state === 'muy-sucio' ? '❌ GRASA CRÍTICA' : '✅ Normal'}\n` +
      `- *Plan Anual:* ${recurring ? 'SÍ (15% dto)' : 'No'}\n\n` +
      `💰 *INVERSIÓN ESTIMADA: ${total}€*\n` +
      `-----------------------------------\n` +
      `¿Cuándo podríais venir a verlo?`;
    window.open(`https://wa.me/34622064101?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getTurbineDescription = (size: TurbineSize) => {
    switch (size) {
      case 'pequeña': return "<1.500 m³/h";
      case 'estándar': return "1.500-4.500 m³/h";
      case 'industrial': return ">4.500 m³/h";
      default: return "";
    }
  };

  const getAccessDescription = (acc: Accessibility) => {
    switch (acc) {
      case 'fácil': return "Acceso a nivel de suelo";
      case 'media': return "Escalera o desmontaje leve";
      case 'difícil': return "Espacio confinado o >3m";
      default: return "";
    }
  };

  // Restyling oct-2026: misma lógica y mismos textos; aspecto de pasarela de pago.
  const opt = (on: boolean) =>
    `rounded-lg border transition-colors ${on ? 'border-brand bg-brand-soft/60 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/25'}`;
  const lbl = 'block font-mono text-[11.5px] text-muted';
  const stepper = 'flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-[18px] font-medium text-ink transition-colors hover:bg-mist';

  return (
    <section className="min-h-screen bg-mist px-4 pb-28 pt-6 font-plex text-ink md:px-6 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted transition-colors hover:text-ink"
          >
            <span className="material-symbols-outlined text-[17px] transition-transform group-hover:-translate-x-0.5">arrow_back</span>
            Volver
          </button>
          <span className="flex items-center gap-2 text-[14px] font-semibold text-ink" aria-hidden="true">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-white">
              <span className="material-symbols-outlined text-[16px]">cleaning_services</span>
            </span>
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= s ? 'bg-brand' : 'bg-line'}`} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11.5px] text-brand">Paso {step} de 4</p>
            <span className="font-mono text-[11.5px] text-muted">ID: {budgetRef}</span>
          </div>
          <div className="mt-2 hidden justify-between sm:flex">
            {['Inicio', 'Campana', 'Extracción', 'Motor', 'Garantía'].map((label, i) => (
              <span key={label} className={`text-[12px] font-medium ${step >= i ? 'text-ink' : 'text-muted/60'}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[1fr_300px]">
        <div className="flex min-h-[500px] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="flex-1 p-5 md:p-8">

            {/* PASO 0: SELECCIÓN DE SERVICIOS */}
            {step === 0 && (
              <div>
                <h2 className="mb-1.5 text-[1.6rem] font-semibold tracking-[-0.02em] md:text-[1.9rem]">¿Qué necesitas limpiar?</h2>
                <p className="mb-7 text-[15px] text-muted">Selecciona los elementos de tu sistema de extracción.</p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'hood', label: 'Campana y Filtros', icon: 'shelves', state: includeHood, setter: setIncludeHood },
                    { id: 'turbine', label: 'Turbina (Motor)', icon: 'cyclone', state: includeTurbine, setter: setIncludeTurbine },
                    { id: 'ducts', label: 'Conductos de Extracción', icon: 'settings_input_component', state: includeDucts, setter: setIncludeDucts }
                  ].map((service) => (
                    <button
                      key={service.id}
                      onClick={() => service.setter(!service.state)}
                      aria-pressed={service.state}
                      className={`${opt(service.state)} flex items-center justify-between px-5 py-4 text-left`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-md ${service.state ? 'bg-white text-brand' : 'bg-mist text-ink-3'}`}>
                          <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                        </span>
                        <span className="text-[15.5px] font-medium">{service.label}</span>
                      </div>
                      <span className={`flex h-5 w-5 items-center justify-center rounded border ${service.state ? 'border-brand bg-brand text-white' : 'border-line bg-white'}`}>
                        {service.state && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 1: CAMPANA */}
            {step === 1 && (
              <div>
                <h2 className="mb-1.5 text-[1.6rem] font-semibold tracking-[-0.02em] md:text-[1.9rem]">Detalles de Campana</h2>
                <p className="mb-8 text-[15px] text-muted">Dimensiones para el cálculo de tiempo y materiales.</p>

                <div className="rounded-lg border border-line p-6 text-center md:p-8">
                  <label className={`${lbl} mb-5`}>Número de Filtros (Secciones)</label>
                  <div className="mb-6 flex items-center justify-center gap-6">
                    <button onClick={() => setFilters(Math.max(1, filters - 1))} className={stepper}>-</button>
                    <span className="tnum min-w-[72px] text-[3rem] font-semibold leading-none text-ink">{filters}</span>
                    <button onClick={() => setFilters(filters + 1)} className={stepper}>+</button>
                  </div>
                  <div className="mx-auto grid max-w-xs grid-cols-2 overflow-hidden rounded-lg border border-line">
                    <div className="bg-mist px-4 py-3">
                      <p className={lbl}>Longitud Campana</p>
                      <p className="tnum mt-1 text-[1.25rem] font-semibold">{campanaMeters}m</p>
                    </div>
                    <div className="border-l border-line bg-mist px-4 py-3">
                      <p className={lbl}>Tiempo Estimado</p>
                      <p className="tnum mt-1 text-[1.25rem] font-semibold">{estimatedHours}h</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: EXTRACCIÓN */}
            {step === 2 && (
              <div>
                <h2 className="mb-1.5 text-[1.6rem] font-semibold tracking-[-0.02em] md:text-[1.9rem]">Conductos</h2>
                <p className="mb-8 text-[15px] text-muted">Metraje de conductos y accesos técnicos.</p>

                <div className="space-y-7">
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <label className={lbl}>Conducto Vertical</label>
                      <div className="tnum text-[1.4rem] font-semibold text-ink">{ductsVertical}m</div>
                    </div>
                    <input type="range" min="0" max="30" step="1" value={ductsVertical} onChange={(e) => setDuctsVertical(parseInt(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <label className={lbl}>Conducto Horizontal</label>
                      <div className="tnum text-[1.4rem] font-semibold text-ink">{ductsHorizontal}m</div>
                    </div>
                    <input type="range" min="0" max="40" step="1" value={ductsHorizontal} onChange={(e) => setDuctsHorizontal(parseInt(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand" />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-lg border border-line p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[22px] text-brand">door_open</span>
                      <div>
                        <h4 className="flex items-center gap-1 text-[14.5px] font-medium">
                          Registros técnicos
                          <span className="material-symbols-outlined cursor-help text-[15px] text-muted" title="Compuertas de acceso necesarias para limpiar tramos largos de conducto">info</span>
                        </h4>
                        <p className="text-[12.5px] text-muted">Compuertas de acceso para limpieza de conductos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setRegisters(Math.max(0, registers - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line font-medium hover:bg-mist">-</button>
                      <span className="tnum min-w-[24px] text-center text-[1.2rem] font-semibold">{registers}</span>
                      <button onClick={() => setRegisters(registers + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line font-medium hover:bg-mist">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: TURBINA */}
            {step === 3 && (
              <div>
                <h2 className="mb-1.5 text-[1.6rem] font-semibold tracking-[-0.02em] md:text-[1.9rem]">La Turbina</h2>
                <p className="mb-7 text-[15px] text-muted">Motor y complejidad de acceso.</p>

                <div className="mb-8">
                  <label className={`${lbl} mb-3`}>Capacidad de Extracción (Caudal)</label>
                  <div className="mb-3 grid grid-cols-3 gap-2 md:gap-3">
                    {(['pequeña', 'estándar', 'industrial'] as TurbineSize[]).map((size) => (
                      <button key={size} onClick={() => setTurbineSize(size)} aria-pressed={turbineSize === size} className={`${opt(turbineSize === size)} flex flex-col items-center p-3 text-center md:p-4`}>
                        <span className="material-symbols-outlined mb-1 text-[20px] text-brand">cyclone</span>
                        <span className="block text-[13.5px] font-medium capitalize">{size}</span>
                        <p className="tnum mt-0.5 font-mono text-[10.5px] text-muted">{getTurbineDescription(size)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2.5 rounded-lg bg-mist p-3.5">
                    <span className="material-symbols-outlined shrink-0 text-[18px] text-brand">info</span>
                    <p className="text-[12.5px] leading-relaxed text-ink-3">
                      El precio de la turbina es orientativo. Se ajustará definitivamente al identificar el modelo exacto durante la visita técnica.
                    </p>
                  </div>
                </div>

                <div>
                  <label className={`${lbl} mb-3`}>Grado de Accesibilidad</label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['fácil', 'media', 'difícil'] as Accessibility[]).map((acc) => (
                      <button key={acc} onClick={() => setAccessibility(acc)} aria-pressed={accessibility === acc} className={`${opt(accessibility === acc)} flex items-center justify-between px-4 py-3`}>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px] text-brand">
                            {acc === 'fácil' ? 'visibility' : acc === 'media' ? 'stairs' : 'lock_open'}
                          </span>
                          <div className="text-left">
                            <h4 className="text-[14px] font-medium capitalize">{acc}</h4>
                            <p className="text-[12.5px] text-muted">{getAccessDescription(acc)}</p>
                          </div>
                        </div>
                        {accessibility === acc && <span className="material-symbols-outlined text-[20px] text-brand">check_circle</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4: ESTADO Y PLAN */}
            {step === 4 && (
              <div className="flex h-full flex-col">
                <header className="mb-5">
                  <h2 className="mb-1.5 text-[1.6rem] font-semibold tracking-[-0.02em] md:text-[1.9rem]">Estado y Garantía</h2>
                  <p className="text-[15px] text-muted">Seguridad y cumplimiento de normativa.</p>
                </header>

                <div className="flex flex-1 flex-col gap-3">
                  <div className={`flex items-center gap-3.5 rounded-lg border p-4 ${state === 'muy-sucio' ? 'border-[#fecaca] bg-[#fef2f2]' : 'border-[#bbf7d0] bg-[#f0fdf4]'}`}>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${state === 'muy-sucio' ? 'bg-[#dc2626]' : 'bg-[#16a34a]'}`}>
                      <span className="material-symbols-outlined text-[20px]">{state === 'muy-sucio' ? 'warning' : 'check'}</span>
                    </span>
                    <div>
                      <h4 className={`font-mono text-[11.5px] font-medium ${state === 'muy-sucio' ? 'text-[#b91c1c]' : 'text-[#15803d]'}`}>
                        {state === 'muy-sucio' ? 'RIESGO CRÍTICO DE INCENDIO' : 'ESTADO DE MANTENIMIENTO'}
                      </h4>
                      <p className="text-[13px] leading-snug text-ink-3">
                        {state === 'muy-sucio'
                          ? 'La acumulación de grasa gotea y puede inflamarse en segundos. Requiere limpieza urgente.'
                          : 'Limpieza preventiva recomendada cada 6-12 meses según normativa.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setState('normal')}
                      aria-pressed={state === 'normal'}
                      className={`${opt(state === 'normal')} flex flex-col items-center justify-center gap-0.5 p-3 text-center`}
                    >
                      <span className="text-[14px] font-medium">Uso Normal</span>
                      <span className="font-mono text-[10.5px] text-muted">Sin goteo visible</span>
                    </button>
                    <button
                      onClick={() => setState('muy-sucio')}
                      aria-pressed={state === 'muy-sucio'}
                      className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border p-3 text-center transition-colors ${state === 'muy-sucio' ? 'border-[#dc2626] bg-[#fef2f2] ring-1 ring-[#dc2626]' : 'border-line bg-white hover:border-ink/25'}`}
                    >
                      <span className={`text-[14px] font-medium ${state === 'muy-sucio' ? 'text-[#b91c1c]' : ''}`}>Grasa Crítica</span>
                      <span className="font-mono text-[10.5px] text-[#dc2626]">Pasa el dedo: ¡Gotea!</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div
                      onClick={() => setRecurring(!recurring)}
                      role="button"
                      aria-pressed={recurring}
                      className={`relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-lg border border-dashed p-4 transition-colors ${recurring ? 'border-brand bg-brand-soft/60' : 'border-line bg-white hover:border-ink/25'}`}
                    >
                      <span className={`material-symbols-outlined text-[20px] ${recurring ? 'text-brand' : 'text-muted'}`}>verified</span>
                      <div className="text-left">
                        <h4 className="font-mono text-[11.5px] font-medium">PLAN ANUAL (-15%)</h4>
                        <p className="text-[12.5px] text-muted">Intervenciones periódicas.</p>
                      </div>
                      {recurring && (
                        <div className="absolute right-0 top-0 rounded-bl-md bg-brand px-2 py-0.5 font-mono text-[10px] text-white">
                          AHORRAS {Math.round(total / 0.85 * 0.15)}€
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-4">
                      <span className="material-symbols-outlined text-[20px] text-[#b45309]">workspace_premium</span>
                      <div className="text-left">
                        <h4 className="font-mono text-[11.5px] font-medium uppercase">CERTIFICACIÓN INCLUIDA</h4>
                        <p className="text-[12.5px] text-muted">Válido para Sanidad y Seguros.</p>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-auto rounded-xl bg-ink p-5 text-white md:p-6">
                    <div className="mb-5 flex items-end justify-between">
                      <span className="font-mono text-[11.5px] text-white/60">TOTAL ESTIMADO</span>
                      <div className="flex items-baseline gap-1">
                        <span className="tnum text-[2.75rem] font-semibold leading-none tracking-[-0.03em]">{total}</span>
                        <span className="text-[1.4rem] font-semibold text-[#9fb0ff]">€</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button onClick={generatePDF} className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-[13.5px] font-semibold transition-colors hover:bg-white/10">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span> PDF
                      </button>
                      <button onClick={shareWhatsApp} className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-[#1fa855] px-2 text-center text-[12.5px] font-semibold leading-tight transition-colors hover:bg-[#178a45] md:text-[13.5px]">
                        <span className="material-symbols-outlined text-[18px]">near_me</span>
                        <span className="first-letter:uppercase">agenda tu cita por whatsapp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NAVEGACIÓN — en móvil va fija abajo */}
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:static md:bg-white md:p-5 md:backdrop-blur-none">
            <div className="flex items-center gap-3">
              {/* Móvil: precio a la izquierda de los botones */}
              <div className="flex-1 md:hidden">
                {step < 4 ? (
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[10.5px] text-muted">Inversión Actual:</span>
                    <span className="tnum text-[1.4rem] font-semibold leading-none text-ink">{total}<span className="ml-0.5 text-[15px]">€</span></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-[#16a34a]">verified</span>
                    <span className="font-mono text-[11px] text-muted">Presupuesto finalizado</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 md:w-full md:justify-end">
                {step > 0 && (
                  <button
                    onClick={handlePrev}
                    className="h-11 rounded-lg border border-line bg-white px-4 text-[14.5px] font-medium text-ink transition-colors hover:bg-mist md:px-5"
                  >
                    Anterior
                  </button>
                )}
                {step < 4 && (
                  <button
                    onClick={handleNext}
                    className="h-11 rounded-lg bg-brand px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 md:px-8"
                    disabled={step === 0 && !includeHood && !includeTurbine && !includeDucts}
                  >
                    Continuar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resumen lateral (escritorio) */}
        <aside className="hidden rounded-xl border border-line bg-white p-5 shadow-card md:sticky md:top-6 md:block">
          {step < 4 && (
            <div className="flex flex-col">
              <span className="mb-1.5 font-mono text-[11.5px] text-muted">Inversión Estimada</span>
              <p className="tnum text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-ink">{total}€</p>
            </div>
          )}
          <ul className="mt-5 space-y-2.5 border-t border-line pt-5" aria-hidden="true">
            {[
              { on: includeHood, icon: 'shelves' },
              { on: includeTurbine, icon: 'cyclone' },
              { on: includeDucts, icon: 'settings_input_component' },
            ].map((r) => (
              <li key={r.icon} className={`flex items-center gap-2.5 ${r.on ? 'text-ink' : 'text-muted/50'}`}>
                <span className="material-symbols-outlined text-[18px]">{r.icon}</span>
                <span className="h-px flex-1 bg-line"></span>
                <span className="material-symbols-outlined text-[18px]">{r.on ? 'check_circle' : 'radio_button_unchecked'}</span>
              </li>
            ))}
          </ul>
        </aside>
        </div>

        <p className="mt-5 text-center text-[12px] leading-relaxed text-muted md:text-left">
          * Importe estimado sujeto a validación técnica física por el equipo de AFONDO.
        </p>
      </div>
    </section>
  );
};

export default Calculadora;
