
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

  const budgetRef = useMemo(() => 
    `AFO-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`, 
  []);

  // Lógica de cálculo optimizada
  useEffect(() => {
    let subtotal = 120; // Base fija desplazamiento y preparación
    
    // Coste por tipo de campana base
    subtotal += type === 'mural' ? 50 : 90;
    
    // Filtros
    subtotal += filters * 14;
    
    // Conductos (Vertical es más caro por dificultad técnica)
    subtotal += ductsHorizontal * 18;
    subtotal += ductsVertical * 26;
    
    // Registros de limpieza
    subtotal += registers * 15;
    
    // Turbina por tamaño
    const turbinePrices = { pequeña: 100, estándar: 160, industrial: 240 };
    let turbineCost = turbinePrices[turbineSize];
    
    // Multiplicador por accesibilidad
    const accessMultipliers = { fácil: 1, media: 1.2, difícil: 1.4 };
    turbineCost *= accessMultipliers[accessibility];
    
    subtotal += turbineCost;
    
    // Recargos y descuentos finales
    if (state === 'muy-sucio') subtotal *= 1.25; // +25% por grasa crítica
    if (recurring) subtotal *= 0.85; // -15% por plan anual

    setTotal(Math.round(subtotal));
  }, [type, filters, ductsVertical, ductsHorizontal, registers, turbineSize, accessibility, state, recurring]);

  const ahorroAnual = Math.round((total / 0.85) - total);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Estilo Corporativo
    doc.setFillColor(26, 26, 255);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("AFONDO", 20, 22);
    doc.setFontSize(10);
    doc.text("HIGIENE INDUSTRIAL Y SEGURIDAD", 20, 30);
    doc.setFontSize(14);
    doc.text("PRESUPUESTO ESTIMADO", 130, 22);
    doc.setFontSize(10);
    doc.text(`ID: ${budgetRef}`, 130, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 130, 36);

    // Detalle
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Configuración de la Instalación", 20, 60);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 63, 190, 63);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const data = [
      ["Tipo de Campana", type.toUpperCase()],
      ["Número de Filtros", `${filters} unidades`],
      ["Conductos Verticales", `${ductsVertical} metros`],
      ["Conductos Horizontales", `${ductsHorizontal} metros`],
      ["Registros de Limpieza", `${registers} unidades`],
      ["Tamaño de Turbina", turbineSize.toUpperCase()],
      ["Grado de Accesibilidad", accessibility.toUpperCase()],
      ["Estado de Suciedad", state === 'normal' ? 'Normal' : 'CRÍTICO / GRASA CRISTALIZADA'],
      ["Modalidad", recurring ? 'Mantenimiento Anual (15% dto)' : 'Servicio Puntual']
    ];

    data.forEach((row, i) => {
      doc.setFont("helvetica", "bold");
      doc.text(row[0], 25, 75 + (i * 8));
      doc.setFont("helvetica", "normal");
      doc.text(row[1], 100, 75 + (i * 8));
    });

    // Total
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 155, 170, 30, 3, 3, 'F');
    doc.setTextColor(26, 26, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL ESTIMADO:", 35, 175);
    doc.text(`${total} €`, 150, 175);

    doc.save(`Presupuesto_Afondo_${budgetRef}.pdf`);
  };

  const shareWhatsApp = () => {
    const msg = `¡Hola Afondo! 👋\nHe configurado mi presupuesto online: *${budgetRef}*.\n\n🛠 *Detalle Técnico:* \n- Campana ${type} (${filters} filtros)\n- Conductos: ${ductsVertical}m Vert. / ${ductsHorizontal}m Horiz.\n- Registros: ${registers}\n- Turbina ${turbineSize} (Acceso ${accessibility})\n- Estado: ${state === 'muy-sucio' ? '🔥 CRÍTICO' : 'Normal'}\n\n💰 *Total Estimado:* ${total}€\n\n¿Podemos agendar una visita técnica para confirmar?`;
    window.open(`https://wa.me/34622064101?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getTurbineDescription = (size: TurbineSize) => {
    switch(size) {
      case 'pequeña': return "Caudal <1.500 m³/h (Cajas 7/7)";
      case 'estándar': return "Caudal 1.500-4.500 m³/h (9/9 o 12/12)";
      case 'industrial': return "Caudal >4.500 m³/h (15/15 o 2-4 CV)";
      default: return "";
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-16 md:py-24 px-4 md:px-6 mb-24 md:mb-0">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-6 md:mb-8 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </button>

        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 md:gap-4 mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary shadow-[0_0_15px_rgba(26,26,255,0.4)]' : 'bg-slate-100 dark:bg-slate-800'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between items-center px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Paso {step} de 4</p>
            <span className="text-[10px] font-bold text-slate-400">REF: {budgetRef}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[550px] flex flex-col">
          <div className="p-6 md:p-12 flex-1">
            
            {/* PASO 1: CAMPANA Y FILTROS */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">La Campana</h2>
                <p className="text-sm text-slate-500 mb-10">Configure los elementos visibles de su cocina.</p>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                  <button 
                    onClick={() => setType('mural')}
                    className={`p-6 md:p-10 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === 'mural' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <span className="material-symbols-outlined text-4xl text-primary">shelves</span>
                    <span className="font-bold dark:text-white">Mural</span>
                  </button>
                  <button 
                    onClick={() => setType('central')}
                    className={`p-6 md:p-10 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === 'central' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <span className="material-symbols-outlined text-4xl text-primary">format_overline</span>
                    <span className="font-bold dark:text-white">Central</span>
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Número de Filtros</label>
                  <div className="flex items-center justify-center gap-8">
                    <button onClick={() => setFilters(Math.max(1, filters-1))} className="w-14 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-2xl dark:text-white hover:bg-white transition-colors">-</button>
                    <span className="text-6xl font-black text-primary min-w-[80px] text-center">{filters}</span>
                    <button onClick={() => setFilters(filters+1)} className="w-14 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-2xl dark:text-white hover:bg-white transition-colors">+</button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: EXTRACCIÓN */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Extracción</h2>
                <p className="text-sm text-slate-500 mb-10">Dimensiones de los conductos de evacuación.</p>
                
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tubo Vertical</label>
                      <div className="text-3xl font-black text-primary">{ductsVertical} <span className="text-sm font-bold text-slate-400 uppercase">m</span></div>
                    </div>
                    <input 
                      type="range" min="0" max="30" step="1" value={ductsVertical} 
                      onChange={(e) => setDuctsVertical(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tubo Horizontal</label>
                      <div className="text-3xl font-black text-primary">{ductsHorizontal} <span className="text-sm font-bold text-slate-400 uppercase">m</span></div>
                    </div>
                    <input 
                      type="range" min="0" max="40" step="1" value={ductsHorizontal} 
                      onChange={(e) => setDuctsHorizontal(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-left">
                      <span className="material-symbols-outlined text-3xl text-primary">door_open</span>
                      <div>
                        <h4 className="font-bold text-sm dark:text-white">Registros a limpiar</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Unidades instaladas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setRegisters(Math.max(0, registers-1))} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white font-bold">-</button>
                      <span className="text-2xl font-black text-primary min-w-[30px] text-center">{registers}</span>
                      <button onClick={() => setRegisters(registers+1)} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: TURBINA */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Turbina</h2>
                <p className="text-sm text-slate-500 mb-8">Especificaciones del motor de extracción.</p>
                
                <div className="mb-10">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tamaño de la Turbina</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(['pequeña', 'estándar', 'industrial'] as TurbineSize[]).map((size) => (
                      <button 
                        key={size}
                        onClick={() => setTurbineSize(size)}
                        className={`p-4 md:p-6 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${turbineSize === size ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        <span className={`material-symbols-outlined ${size === 'pequeña' ? 'text-xl' : size === 'estándar' ? 'text-2xl' : 'text-3xl'} text-primary`}>cyclone</span>
                        <div className="text-center">
                          <span className="text-[11px] font-black uppercase tracking-tight dark:text-white block mb-1">{size}</span>
                          <p className="text-[9px] text-slate-500 leading-tight font-medium max-w-[100px] mx-auto">
                            {getTurbineDescription(size)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Grado de Accesibilidad</label>
                  <div className="grid grid-cols-1 gap-3">
                    {(['fácil', 'media', 'difícil'] as Accessibility[]).map((acc) => (
                      <button 
                        key={acc}
                        onClick={() => setAccessibility(acc)}
                        className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${accessibility === acc ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`material-symbols-outlined text-2xl ${accessibility === acc ? 'text-primary' : 'text-slate-300'}`}>
                            {acc === 'fácil' ? 'visibility' : acc === 'media' ? 'stairs' : 'lock_open'}
                          </span>
                          <div className="text-left">
                            <h4 className="font-bold text-sm dark:text-white uppercase tracking-tight">{acc}</h4>
                            <p className="text-[10px] text-slate-500">
                              {acc === 'fácil' && "Acceso directo sin obstáculos"}
                              {acc === 'media' && "Requiere escalera o falso techo"}
                              {acc === 'difícil' && "Fachada, altura o espacio confinado"}
                            </p>
                          </div>
                        </div>
                        {accessibility === acc && <span className="material-symbols-outlined text-primary">check_circle</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4: ESTADO TÉCNICO Y PLAN */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Estado y Plan</h2>
                <p className="text-sm text-slate-500 mb-10">Mantenimiento y condiciones actuales.</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setState('normal')}
                      className={`p-6 rounded-3xl border-2 text-left transition-all ${state === 'normal' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold text-sm mb-1 ${state === 'normal' ? 'text-primary' : 'dark:text-white'}`}>Uso Normal</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black leading-none">6-12 MESES</p>
                    </button>
                    <button 
                      onClick={() => setState('muy-sucio')}
                      className={`p-6 rounded-3xl border-2 text-left transition-all ${state === 'muy-sucio' ? 'border-red-500 bg-red-500/5' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold text-sm mb-1 ${state === 'muy-sucio' ? 'text-red-500' : 'dark:text-white'}`}>Grasa Crítica</h4>
                      <p className="text-[10px] text-red-600/60 uppercase font-black leading-none">ALTO RIESGO</p>
                    </button>
                  </div>

                  <button 
                    onClick={() => setRecurring(!recurring)}
                    className={`w-full p-6 rounded-3xl border-2 border-dashed flex items-center gap-6 transition-all ${recurring ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${recurring ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                      <span className="material-symbols-outlined text-2xl">verified</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Plan Mantenimiento Anual</h4>
                      <p className="text-[11px] text-slate-500">Descuento del <span className="text-primary font-black">15%</span> en cada intervención.</p>
                    </div>
                    {recurring && <span className="text-primary font-black text-xs shrink-0">ACTIVO</span>}
                  </button>

                  <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] text-center shadow-2xl mt-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Estimado</h3>
                    <div className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
                      {total}<span className="text-2xl ml-1 text-primary">€</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-8">
                      <button onClick={generatePDF} className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs transition-all border border-white/10">
                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
                      </button>
                      <button onClick={shareWhatsApp} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs transition-all shadow-lg shadow-green-500/20">
                        <span className="material-symbols-outlined text-sm">send</span> AGENDAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER NAVEGACION */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              {step < 4 && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inversión</span>
                  <p className="text-2xl md:text-3xl font-black text-primary tracking-tighter leading-none">{total}€</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 md:gap-4 w-full sm:w-auto">
              {step > 1 && (
                <button 
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none px-6 md:px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold dark:text-white text-sm hover:bg-white transition-all"
                >
                  Anterior
                </button>
              )}
              {step < 4 && (
                <button 
                  onClick={handleNext}
                  className="flex-[2] sm:flex-none px-10 md:px-16 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-normal md:tracking-widest text-sm shadow-xl active:scale-95 transition-all overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-8 leading-relaxed">
          * Este cálculo es una estimación técnica basada en parámetros estándar. Requiere validación física por un técnico de AFONDO.
        </p>
      </div>
    </section>
  );
};

export default Calculadora;
