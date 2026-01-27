
import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';

interface CalculadoraProps {
  onBack: () => void;
}

type Step = 1 | 2 | 3 | 4;
type HoodType = 'mural' | 'central';
type TurbineSize = 'pequeña' | 'estándar' | 'industrial';
type Accessibility = 'fácil' | 'media' | 'difícil';

const Calculadora: React.FC<CalculadoraProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>(1);

  // Paso 1: Campana y Filtros
  const [type, setType] = useState<HoodType>('mural');
  const [filters, setFilters] = useState(3);

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
    let subtotal = 150; // Base fija (Desplazamiento/ Preparacion/ Recoger)
    subtotal += filters * 67; // 67€ por sección de 0.5m (que incluye campana + filtro)
    subtotal += ductsHorizontal * 18;
    subtotal += ductsVertical * 26;
    subtotal += registers * 30;

    const turbinePrices = { pequeña: 360, estándar: 420, industrial: 780 };
    let turbineCost = turbinePrices[turbineSize];
    const accessMultipliers = { fácil: 1, media: 1.2, difícil: 1.4 };
    turbineCost *= accessMultipliers[accessibility];

    subtotal += turbineCost;
    if (state === 'muy-sucio') subtotal *= 1.25;
    if (recurring) subtotal *= 0.85;

    setTotal(Math.round(subtotal));
  }, [filters, ductsVertical, ductsHorizontal, registers, turbineSize, accessibility, state, recurring]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

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

    lineItem("Tipo de Campana:", type.toUpperCase());
    lineItem("Secciones (Filtros):", `${filters} unidades (${campanaMeters}m de campana)`);
    lineItem("Tiempo Estimado:", `${estimatedHours} horas de intervención`);
    lineItem("Conducto Vertical:", `${ductsVertical} metros`);
    lineItem("Conducto Horizontal:", `${ductsHorizontal} metros`);
    lineItem("Registros Técnicos:", `${registers} unidades`);
    lineItem("Caudal Turbina:", `${turbineSize.toUpperCase()} (${getTurbineDescription(turbineSize)})`);
    lineItem("Accesibilidad:", accessibility.toUpperCase());
    lineItem("Estado de Suciedad:", state === 'muy-sucio' ? "GRASA CRÍTICA (+25%)" : "NORMAL");
    lineItem("Plan Mantenimiento:", recurring ? "SÍ (Descuento 15% aplicado)" : "NO");

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
    doc.text("* Incluye Certificado de Higienización oficial para Sanidad y Seguros.", 20, 285);

    doc.save(`Presupuesto_Afondo_${budgetRef}.pdf`);
  };

  const shareWhatsApp = () => {
    const msg = `¡Hola Afondo! 👋 He generado un presupuesto online: *${budgetRef}*\n\n` +
      `📊 *DETALLE DE INSTALACIÓN:*\n` +
      `- *Tipo:* Campana ${type.toUpperCase()}\n` +
      `- *Dimensiones:* ${filters} secciones (${campanaMeters}m)\n` +
      `- *Tiempo est.:* ${estimatedHours}h de trabajo\n` +
      `- *Extracción:* ${ductsVertical}m vert. / ${ductsHorizontal}m horiz.\n` +
      `- *Registros:* ${registers} uds.\n` +
      `- *Turbina:* ${turbineSize.toUpperCase()} (Acceso ${accessibility})\n` +
      `- *Estado:* ${state === 'muy-sucio' ? '❌ GRASA CRÍTICA' : '✅ Normal'}\n` +
      `- *Plan Anual:* ${recurring ? 'SÍ (15% dto)' : 'No'}\n\n` +
      `💰 *INVERSIÓN ESTIMADA: ${total}€*\n` +
      `-----------------------------------\n` +
      `¿Cuándo podríais pasar a validar la instalación?`;
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

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-8 md:py-24 px-4 md:px-6 mb-24 md:mb-0">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-4 md:mb-8 hover:gap-3 transition-all text-sm"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Volver
        </button>

        <div className="mb-6 md:mb-10">
          <div className="flex items-center gap-2 md:gap-4 mb-3">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`} />
            ))}
          </div>
          <div className="flex justify-between items-center px-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Paso {step} de 4</p>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID: {budgetRef}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[520px] flex flex-col">
          <div className="p-4 md:p-10 flex-1">

            {/* PASO 1: CAMPANA */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">La Campana</h2>
                <p className="text-sm text-slate-500 mb-8 md:mb-10 font-medium">Cada sección de campana incluye su limpieza técnica interior y el filtro.</p>

                <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-12">
                  <button onClick={() => setType('mural')} className={`p-4 md:p-10 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-2 md:gap-4 ${type === 'mural' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}>
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">shelves</span>
                    <span className="font-bold text-xs md:text-base dark:text-white uppercase tracking-wider">Mural</span>
                  </button>
                  <button onClick={() => setType('central')} className={`p-4 md:p-10 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-2 md:gap-4 ${type === 'central' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}>
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">format_overline</span>
                    <span className="font-bold text-xs md:text-base dark:text-white uppercase tracking-wider">Central</span>
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Número de Filtros (Secciones)</label>
                  <div className="flex items-center justify-center gap-6 md:gap-8 mb-6">
                    <button onClick={() => setFilters(Math.max(1, filters - 1))} className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xl dark:text-white hover:bg-white transition-all">-</button>
                    <span className="text-4xl md:text-6xl font-black text-primary min-w-[60px] md:min-w-[80px]">{filters}</span>
                    <button onClick={() => setFilters(filters + 1)} className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xl dark:text-white hover:bg-white transition-all">+</button>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Longitud Campana</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">{campanaMeters}m</p>
                    </div>
                    <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Tiempo Estimado</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">{estimatedHours}h</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: EXTRACCIÓN */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Extracción</h2>
                <p className="text-sm text-slate-500 mb-8 md:mb-10 font-medium">Metraje de conductos y accesos técnicos.</p>

                <div className="space-y-6 md:space-y-10">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conducto Vertical</label>
                      <div className="text-2xl font-black text-primary">{ductsVertical}m</div>
                    </div>
                    <input type="range" min="0" max="30" step="1" value={ductsVertical} onChange={(e) => setDuctsVertical(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conducto Horizontal</label>
                      <div className="text-2xl font-black text-primary">{ductsHorizontal}m</div>
                    </div>
                    <input type="range" min="0" max="40" step="1" value={ductsHorizontal} onChange={(e) => setDuctsHorizontal(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
                  </div>

                  <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-primary">door_open</span>
                      <h4 className="font-bold text-xs dark:text-white uppercase tracking-wider">Registros técnicos</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setRegisters(Math.max(0, registers - 1))} className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white font-bold">-</button>
                      <span className="text-xl font-black text-primary min-w-[24px] text-center">{registers}</span>
                      <button onClick={() => setRegisters(registers + 1)} className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: TURBINA */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Turbina</h2>
                <p className="text-sm text-slate-500 mb-8 font-medium">Motor y complejidad de acceso.</p>

                <div className="mb-8 md:mb-10">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Capacidad de Extracción (Caudal)</label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                    {(['pequeña', 'estándar', 'industrial'] as TurbineSize[]).map((size) => (
                      <button key={size} onClick={() => setTurbineSize(size)} className={`p-3 md:p-6 rounded-xl border-2 transition-all flex flex-col items-center text-center ${turbineSize === size ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}>
                        <span className="material-symbols-outlined text-xl md:text-2xl text-primary mb-1">cyclone</span>
                        <span className="text-[10px] font-black uppercase dark:text-white block tracking-tight">{size}</span>
                        <p className="text-[9px] font-bold text-slate-500 mt-1">{getTurbineDescription(size)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex gap-3">
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">info</span>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 italic font-medium leading-relaxed">
                      El precio de la turbina es orientativo. Se ajustará definitivamente al identificar el modelo exacto durante la visita técnica.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Grado de Accesibilidad</label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['fácil', 'media', 'difícil'] as Accessibility[]).map((acc) => (
                      <button key={acc} onClick={() => setAccessibility(acc)} className={`p-3 md:p-4 rounded-xl border-2 flex items-center justify-between transition-all ${accessibility === acc ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-xl text-primary">
                            {acc === 'fácil' ? 'visibility' : acc === 'media' ? 'stairs' : 'lock_open'}
                          </span>
                          <div className="text-left">
                            <h4 className="font-bold text-[11px] dark:text-white uppercase tracking-wider">{acc}</h4>
                            <p className="text-[9px] text-slate-500 font-medium">{getAccessDescription(acc)}</p>
                          </div>
                        </div>
                        {accessibility === acc && <span className="material-symbols-outlined text-primary text-xl">check_circle</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4: ESTADO Y PLAN (Optimizado para móvil según solicitud) */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
                <header className="mb-4">
                     <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Estado y Garantía</h2>
                     <p className="text-[11px] md:text-sm text-slate-500 font-medium">Seguridad y cumplimiento de normativa.</p>
                </header>

                <div className="flex flex-col gap-4 flex-1">
                  
                  {/* Riesgo / Termómetro */}
                  <div className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${state === 'muy-sucio' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${state === 'muy-sucio' ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'}`}>
                        <span className="material-symbols-outlined">{state === 'muy-sucio' ? 'warning' : 'check'}</span>
                    </div>
                    <div>
                        <h4 className={`font-black text-[10px] uppercase tracking-widest ${state === 'muy-sucio' ? 'text-red-600' : 'text-green-600'}`}>
                            {state === 'muy-sucio' ? 'RIESGO CRÍTICO DE INCENDIO' : 'ESTADO DE MANTENIMIENTO'}
                        </h4>
                        <p className="text-[10px] text-slate-600 font-medium leading-tight">
                            {state === 'muy-sucio' 
                                ? 'La acumulación de grasa gotea y puede inflamarse en segundos. Requiere limpieza urgente.' 
                                : 'Limpieza preventiva recomendada cada 6-12 meses según normativa.'}
                        </p>
                    </div>
                  </div>

                  {/* Cards de Estado con "Test del Dedo" */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setState('normal')}
                      className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 ${state === 'normal' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                    >
                      <span className={`text-[11px] font-black uppercase tracking-wider ${state === 'normal' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>Uso Normal</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Sin goteo visible</span>
                    </button>
                    <button
                      onClick={() => setState('muy-sucio')}
                      className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 ${state === 'muy-sucio' ? 'border-red-500 bg-red-50' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                    >
                      <span className={`text-[11px] font-black uppercase tracking-wider ${state === 'muy-sucio' ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>Grasa Crítica</span>
                      <span className="text-[8px] font-black text-red-400 uppercase">Pasa el dedo: ¡Gotea!</span>
                    </button>
                  </div>

                  {/* Plan Mantenimiento + Certificado */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                        onClick={() => setRecurring(!recurring)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 border-dashed flex items-center gap-3 transition-all ${recurring ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50/50'}`}
                    >
                        <span className={`material-symbols-outlined text-xl ${recurring ? 'text-primary' : 'text-slate-400'}`}>verified</span>
                        <div className="text-left">
                            <h4 className="font-black text-[9px] text-slate-900 dark:text-white tracking-widest">PLAN ANUAL (-15%)</h4>
                            <p className="text-[9px] text-slate-500 font-medium">Intervenciones periódicas.</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900">
                        <span className="material-symbols-outlined text-xl text-amber-500">workspace_premium</span>
                        <div className="text-left">
                            <h4 className="font-black text-[9px] text-slate-900 dark:text-white tracking-widest uppercase">CERTIFICACIÓN INCLUIDA</h4>
                            <p className="text-[9px] text-slate-500 font-medium">Válido para Sanidad y Seguros.</p>
                        </div>
                    </div>
                  </div>

                  {/* Total Estimado Bloque Oscuro */}
                  <div className="bg-[#0a0a1a] dark:bg-slate-950 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl mt-auto overflow-hidden relative">
                    <div className="text-center relative z-10">
                      <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] md:tracking-[0.3em] mb-2 md:mb-3 block">TOTAL ESTIMADO</span>
                      <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-6 md:mb-8">
                        <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">{total}</span>
                        <span className="text-2xl md:text-3xl font-black text-primary mb-1 md:mb-2">€</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <button onClick={generatePDF} className="bg-[#1f2128] hover:bg-[#2a2d36] text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-widest transition-all">
                          <span className="material-symbols-outlined text-base md:text-lg">picture_as_pdf</span> PDF
                        </button>
                        <button onClick={shareWhatsApp} className="bg-[#22c55e] hover:bg-[#1db053] text-white font-black py-3 px-3 md:py-4 md:px-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-1.5 md:gap-2 text-[8px] md:text-xs uppercase tracking-widest shadow-lg shadow-green-500/20 transition-all text-center leading-tight">
                          <span className="material-symbols-outlined text-base md:text-lg">near_me</span>
                          <span>agenda tu cita por whatsapp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER NAVEGACION - PRECIO APILADO EN MÓVIL PARA PASOS 1-3 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 md:p-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Desktop View */}
            <div className="hidden sm:block">
              {step < 4 && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inversión Estimada</span>
                  <p className="text-4xl font-black text-primary tracking-tighter leading-none">{total}€</p>
                </div>
              )}
            </div>

            {/* Navegación (Botones) */}
            <div className="flex gap-3 w-full sm:w-auto">
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none px-6 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold dark:text-white text-xs hover:bg-white transition-all uppercase tracking-widest"
                >
                  Anterior
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={handleNext}
                  className="flex-[2] sm:flex-none px-10 h-12 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                >
                  Continuar
                </button>
              )}
            </div>

            {/* Móvil View: Inversión debajo de botones */}
            <div className="sm:hidden w-full text-center border-t border-slate-200 dark:border-slate-700 pt-3 mt-1">
              {step < 4 ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Actual:</span>
                  <span className="text-2xl font-black text-primary tracking-tight leading-none">{total}<span className="text-sm ml-0.5 font-bold">€</span></span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">verified</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Presupuesto finalizado</span>
                </div>
              )}
            </div>

          </div>
        </div>

        <p className="mt-4 text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">
          * Importe estimado sujeto a validación técnica física por el equipo de AFONDO.
        </p>
      </div>
    </section>
  );
};

export default Calculadora;
