
import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';

interface CalculadoraProps {
  onBack: () => void;
}

type Step = 1 | 2 | 3 | 4;
type HoodType = 'mural' | 'central';

const Calculadora: React.FC<CalculadoraProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState<HoodType>('mural');
  const [meters, setMeters] = useState(2);
  const [filters, setFilters] = useState(3);
  const [ducts, setDucts] = useState(5);
  const [turbine, setTurbine] = useState(true);
  const [state, setState] = useState<'normal' | 'muy-sucio'>('normal');
  const [recurring, setRecurring] = useState(false);
  const [total, setTotal] = useState(0);

  const budgetRef = useMemo(() => 
    `AFO-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`, 
  []);

  useEffect(() => {
    let subtotal = 120;
    subtotal += type === 'mural' ? meters * 45 : meters * 70;
    subtotal += filters * 12;
    subtotal += ducts * 18;
    if (turbine) subtotal += 160;
    
    if (state === 'muy-sucio') subtotal *= 1.25;
    if (recurring) subtotal *= 0.85;

    setTotal(Math.round(subtotal));
  }, [type, meters, filters, ducts, turbine, state, recurring]);

  const ahorroAnual = Math.round((total / 0.85) - total);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(26, 26, 255);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("AFONDO", 20, 22);
    doc.setFontSize(10);
    doc.text("HIGIENE INDUSTRIAL Y SEGURIDAD", 20, 30);
    doc.setFontSize(14);
    doc.text("PRESUPUESTO TÉCNICO", 130, 22);
    doc.setFontSize(10);
    doc.text(`ID: ${budgetRef}`, 130, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 130, 36);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Detalle de la Instalación", 20, 65);
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 68, 190, 68);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const data = [
      ["Tipo de Campana", type === 'mural' ? 'Mural (Adosada)' : 'Central (Isla)'],
      ["Metros Lineales", `${meters} m`],
      ["Cantidad de Filtros", `${filters} uds`],
      ["Conductos Estimados", `${ducts} m`],
      ["Limpieza de Turbina", turbine ? 'Incluida (Servicio Completo)' : 'No incluida'],
      ["Estado Inicial", state === 'normal' ? 'Uso normal' : 'GRASA CRÍTICA / ALTO RIESGO'],
      ["Modalidad", recurring ? 'Plan de Mantenimiento (Ahorro 15%)' : 'Limpieza Puntual']
    ];
    data.forEach((row, i) => {
      doc.setFont("helvetica", "bold");
      doc.text(row[0], 25, 80 + (i * 9));
      doc.setFont("helvetica", "normal");
      doc.text(row[1], 85, 80 + (i * 9));
    });
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 150, 170, 40, 5, 5, 'F');
    doc.setTextColor(26, 26, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL ESTIMADO:", 30, 175);
    doc.text(`${total} €`, 140, 175);
    doc.save(`Presupuesto_Afondo_${budgetRef}.pdf`);
  };

  const shareWhatsApp = () => {
    const msg = `¡Hola Afondo! 👋\nHe calculado un presupuesto online con Ref: *${budgetRef}*.\n\n📊 *Detalle:* \n- Campana ${type} de ${meters}m\n- ${filters} filtros y ${ducts}m de conductos\n- Turbina: ${turbine ? 'SÍ' : 'NO'}\n- Estado: ${state === 'muy-sucio' ? '🔥 CRÍTICO' : 'Normal'}\n- Plan: ${recurring ? 'Mantenimiento' : 'Puntual'}\n\n💰 *Total Estimado:* ${total}€\n\nQuiero confirmar el presupuesto y agendar la visita técnica.`;
    window.open(`https://wa.me/34622064101?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-16 md:py-24 px-4 md:px-6 mb-20 md:mb-0">
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
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">Paso {step}/4</p>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400">ID: {budgetRef}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-6 md:p-12 flex-1">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">La Campana</h2>
                <p className="text-sm text-slate-500 mb-8">Seleccione el tipo de instalación.</p>
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
                  <button 
                    onClick={() => setType('mural')}
                    className={`p-4 md:p-8 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${type === 'mural' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">shelves</span>
                    <span className="text-xs md:text-base font-bold dark:text-white text-center leading-tight">Mural</span>
                  </button>
                  <button 
                    onClick={() => setType('central')}
                    className={`p-4 md:p-8 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${type === 'central' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">format_overline</span>
                    <span className="text-xs md:text-base font-bold dark:text-white text-center leading-tight">Central</span>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Longitud</label>
                    <div className="text-2xl md:text-3xl font-black text-primary">{meters} <span className="text-xs font-bold text-slate-400 uppercase">metros</span></div>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="0.5" value={meters} 
                    onChange={(e) => setMeters(parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">Filtros y Extracción</h2>
                <div className="space-y-10">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Número de Filtros</label>
                    <div className="flex items-center gap-6 md:gap-8">
                      <button onClick={() => setFilters(Math.max(1, filters-1))} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-2xl dark:text-white">-</button>
                      <span className="text-4xl md:text-5xl font-black text-primary min-w-[50px] text-center">{filters}</span>
                      <button onClick={() => setFilters(filters+1)} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-2xl dark:text-white">+</button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recorrido de Conductos</label>
                    <input 
                      type="range" min="1" max="50" step="1" value={ducts} 
                      onChange={(e) => setDucts(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-3xl md:text-4xl font-black text-primary">{ducts} <span className="text-sm font-bold text-slate-400">metros</span></div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">Estado Técnico</h2>
                <p className="text-sm text-slate-500 mb-8 leading-tight">Datos clave para la seguridad preventiva.</p>
                <div className="space-y-5">
                  <button 
                    onClick={() => setTurbine(!turbine)}
                    className={`w-full p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 flex items-center justify-between transition-all ${turbine ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <div className="flex items-center gap-3 text-left overflow-hidden">
                      <span className={`material-symbols-outlined text-2xl md:text-3xl ${turbine ? 'text-primary' : 'text-slate-300'}`}>cyclone</span>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm md:text-base dark:text-white truncate">Turbina/Motor</h4>
                        <p className="text-[10px] text-slate-500 truncate">Limpieza técnica del extractor.</p>
                      </div>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative shrink-0 ${turbine ? 'bg-primary' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${turbine ? 'left-6' : 'left-1'}`} />
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button 
                      onClick={() => setState('normal')}
                      className={`p-4 md:p-6 rounded-2xl border-2 text-left transition-all ${state === 'normal' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold text-xs md:text-sm mb-1 ${state === 'normal' ? 'text-primary' : 'dark:text-white'}`}>Uso Normal</h4>
                      <p className="text-[9px] text-slate-500 uppercase font-black leading-none tracking-tighter">6-12 MESES</p>
                    </button>
                    <button 
                      onClick={() => setState('muy-sucio')}
                      className={`p-4 md:p-6 rounded-2xl border-2 text-left transition-all ${state === 'muy-sucio' ? 'border-red-500 bg-red-500/5' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold text-xs md:text-sm mb-1 ${state === 'muy-sucio' ? 'text-red-500' : 'dark:text-white'}`}>Grasa Crítica</h4>
                      <p className="text-[9px] text-red-600/60 uppercase font-black leading-none tracking-tighter">ALTO RIESGO</p>
                    </button>
                  </div>

                  <button 
                    onClick={() => setRecurring(!recurring)}
                    className={`w-full p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-dashed flex items-center gap-4 md:gap-6 transition-all ${recurring ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 flex items-center justify-center ${recurring ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <span className="material-symbols-outlined text-xl">verified</span>
                    </div>
                    <div className="text-left flex-1 overflow-hidden">
                      <h4 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white truncate">Mantenimiento Anual</h4>
                      <p className="text-[10px] text-slate-500 truncate">Ahorre un <span className="text-primary font-black">15%</span> extra.</p>
                    </div>
                    {recurring && <span className="text-[10px] text-primary font-black shrink-0">ACTIVO</span>}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in-95 duration-700 text-center py-4">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="relative bg-primary text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="material-symbols-outlined text-3xl md:text-4xl">receipt_long</span>
                  </div>
                </div>
                
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Presupuesto Estimado</h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none">{total}<span className="text-xl md:text-2xl ml-1">€</span></div>
                  {recurring && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      <span className="material-symbols-outlined text-sm">savings</span>
                      Ahorro: {ahorroAnual}€
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 px-2">
                  <button 
                    onClick={generatePDF}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl md:rounded-2xl transition-all shadow-xl text-sm"
                  >
                    <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                    Descargar PDF
                  </button>
                  <button 
                    onClick={shareWhatsApp}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 rounded-xl md:rounded-2xl transition-all shadow-xl text-sm"
                  >
                    <span className="material-symbols-outlined text-xl">send</span>
                    Agendar Visita
                  </button>
                </div>
                
                <p className="text-slate-500 text-[10px] italic mt-8 leading-tight px-4 max-w-xs mx-auto">
                  *Esta cifra es orientativa y requiere inspección visual técnica obligatoria para confirmación final.
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 md:p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="hidden sm:block">
              {step < 4 && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inversión</span>
                  <p className="text-2xl md:text-3xl font-black text-primary tracking-tighter leading-none">{total}€</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 md:gap-4 w-full sm:w-auto">
              {step > 1 && step < 4 && (
                <button 
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none px-4 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold dark:text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Anterior
                </button>
              )}
              {step < 4 && (
                <button 
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-6 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl bg-primary text-white font-black uppercase tracking-normal md:tracking-widest text-sm shadow-lg whitespace-nowrap overflow-hidden text-ellipsis active:scale-95 transition-all"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculadora;
