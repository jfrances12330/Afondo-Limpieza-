
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

  // Generamos una referencia única para esta sesión
  const budgetRef = useMemo(() => 
    `AFO-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`, 
  []);

  // Lógica de cálculo
  useEffect(() => {
    let subtotal = 120; // Base fija desplazamiento
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
    
    // Banner Superior Corporativo
    doc.setFillColor(26, 26, 255);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("AFONDO", 20, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("HIGIENE INDUSTRIAL Y SEGURIDAD", 20, 30);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PRESUPUESTO TÉCNICO", 130, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`ID: ${budgetRef}`, 130, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 130, 36);

    // Contenido
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

    // Cuadro de Precio
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 150, 170, 40, 5, 5, 'F');
    doc.setTextColor(26, 26, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL ESTIMADO:", 30, 175);
    doc.text(`${total} €`, 140, 175);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("(Base imponible. IVA no incluido)", 140, 182);

    // Alerta de Riesgo si está muy sucio
    if (state === 'muy-sucio') {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(248, 113, 113);
      doc.roundedRect(20, 200, 170, 20, 3, 3, 'FD');
      doc.setTextColor(153, 27, 27);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("ALERTA TÉCNICA: Se ha detectado un nivel de suciedad crítico.", 28, 209);
      doc.setFont("helvetica", "normal");
      doc.text("Riesgo elevado de inflamación espontánea según CTE DB-SI.", 28, 214);
    }

    // Pie de página Legal
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    const disclaimer = [
      "Este documento es una estimación generada automáticamente y no representa un contrato vinculante.",
      "La validez del precio está sujeta a la comprobación física de accesos y estado real por nuestros técnicos.",
      "Cumplimos con la normativa UNE 100165. Certificado oficial emitido tras finalizar el servicio."
    ];
    disclaimer.forEach((line, i) => doc.text(line, 20, 240 + (i * 5)));

    doc.save(`Presupuesto_Afondo_${budgetRef}.pdf`);
  };

  const shareWhatsApp = () => {
    const msg = `¡Hola Afondo! 👋\nHe calculado un presupuesto online con Ref: *${budgetRef}*.\n\n📊 *Detalle:* \n- Campana ${type} de ${meters}m\n- ${filters} filtros y ${ducts}m de conductos\n- Turbina: ${turbine ? 'SÍ' : 'NO'}\n- Estado: ${state === 'muy-sucio' ? '🔥 CRÍTICO' : 'Normal'}\n- Plan: ${recurring ? 'Mantenimiento' : 'Puntual'}\n\n💰 *Total Estimado:* ${total}€\n\nQuiero confirmar el presupuesto y agendar la visita técnica.`;
    window.open(`https://wa.me/34622064101?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary shadow-[0_0_15px_rgba(26,26,255,0.4)]' : 'bg-slate-100 dark:bg-slate-800'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Configuración Paso {step} de 4</p>
            <span className="text-[10px] font-bold text-slate-400">ID Sesión: {budgetRef}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[550px] flex flex-col">
          <div className="p-8 md:p-12 flex-1">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Tipo de Campana</h2>
                <p className="text-slate-500 mb-8">Seleccione la disposición de su zona de cocción.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => setType('mural')}
                    className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === 'mural' ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${type === 'mural' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <span className="material-symbols-outlined text-4xl">shelves</span>
                    </div>
                    <span className="font-bold dark:text-white">Mural (Adosada)</span>
                  </button>
                  <button 
                    onClick={() => setType('central')}
                    className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === 'central' ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${type === 'central' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <span className="material-symbols-outlined text-4xl">format_overline</span>
                    </div>
                    <span className="font-bold dark:text-white">Central (Isla)</span>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Longitud de la campana</label>
                    <div className="text-3xl font-black text-primary">{meters} <span className="text-sm font-bold text-slate-400">metros</span></div>
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
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Filtros y Extracción</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">Número de Filtros</label>
                    <div className="flex items-center gap-8">
                      <button onClick={() => setFilters(Math.max(1, filters-1))} className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-2xl dark:text-white hover:bg-slate-50 transition-colors">-</button>
                      <span className="text-5xl font-black text-primary min-w-[60px] text-center">{filters}</span>
                      <button onClick={() => setFilters(filters+1)} className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-2xl dark:text-white hover:bg-slate-50 transition-colors">+</button>
                    </div>
                    <p className="text-xs text-slate-400">Contabilice tanto filtros de malla como de lamas.</p>
                  </div>
                  <div className="space-y-6">
                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">Recorrido de Conductos</label>
                    <input 
                      type="range" min="1" max="50" step="1" value={ducts} 
                      onChange={(e) => setDucts(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-4xl font-black text-primary">{ducts} <span className="text-lg text-slate-400">metros</span></div>
                    <p className="text-xs text-slate-400">Distancia estimada desde campana hasta la salida de humos.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Estado Técnico</h2>
                <p className="text-slate-500 mb-8">Esta información es clave para la seguridad preventiva.</p>
                <div className="space-y-6">
                  <button 
                    onClick={() => setTurbine(!turbine)}
                    className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${turbine ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className={`material-symbols-outlined text-3xl ${turbine ? 'text-primary' : 'text-slate-300'}`}>cyclone</span>
                      <div>
                        <h4 className="font-bold dark:text-white">Desengrase de Turbina/Motor</h4>
                        <p className="text-xs text-slate-500">Limpieza técnica de álabes y voluta del extractor.</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative ${turbine ? 'bg-primary' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${turbine ? 'left-7' : 'left-1'}`} />
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setState('normal')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${state === 'normal' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold mb-1 ${state === 'normal' ? 'text-primary' : 'dark:text-white'}`}>Uso Normal</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Limpieza cada 6-12 meses</p>
                    </button>
                    <button 
                      onClick={() => setState('muy-sucio')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${state === 'muy-sucio' ? 'border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <h4 className={`font-bold mb-1 ${state === 'muy-sucio' ? 'text-red-500' : 'dark:text-white'}`}>Grasa Crítica</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter text-red-600/60">ALTO RIESGO INCENDIO</p>
                    </button>
                  </div>

                  <button 
                    onClick={() => setRecurring(!recurring)}
                    className={`w-full p-6 rounded-3xl border-2 border-dashed flex items-center gap-6 transition-all ${recurring ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${recurring ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white">Plan Mantenimiento Anual</h4>
                      <p className="text-xs text-slate-500">Ahorre un <span className="text-primary font-black">15%</span> en cada servicio.</p>
                    </div>
                    {recurring && <span className="text-primary font-black">ACTIVO</span>}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in-95 duration-700 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="relative bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="material-symbols-outlined text-4xl">receipt_long</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-2">Presupuesto Estimado</h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="text-8xl font-black text-primary tracking-tighter leading-none">{total}<span className="text-2xl ml-1">€</span></div>
                  {recurring && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                      <span className="material-symbols-outlined text-sm">savings</span>
                      Ahorro Anual: {ahorroAnual}€
                    </div>
                  )}
                </div>

                {state === 'muy-sucio' && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-5 rounded-3xl mb-8 flex items-start gap-4 text-left">
                    <span className="material-symbols-outlined text-red-500 text-3xl shrink-0">warning</span>
                    <div>
                      <h4 className="text-red-800 dark:text-red-400 font-black text-sm uppercase">Alerta de Seguridad</h4>
                      <p className="text-red-700 dark:text-red-500 text-xs font-medium leading-relaxed">
                        Su instalación presenta una acumulación de grasa inflamable crítica. Recomendamos intervención urgente para evitar sanciones y riesgos de incendio.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl mb-8 border border-slate-100 dark:border-slate-800 text-left">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Aviso de transparencia</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs italic leading-relaxed">
                    "Este presupuesto tiene carácter orientativo. La cifra final se confirmará tras la visita técnica obligatoria de inspección de accesos y conductos. Ref: {budgetRef}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={generatePDF}
                    className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95"
                  >
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                    Descargar PDF Oficial
                  </button>
                  <button 
                    onClick={shareWhatsApp}
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95"
                  >
                    <span className="material-symbols-outlined">send</span>
                    Aceptar y Agendar Visita
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="hidden sm:block">
              {step < 4 && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Estimada</span>
                  <p className="text-3xl font-black text-primary tracking-tighter">{total}€</p>
                </div>
              )}
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              {step > 1 && step < 4 && (
                <button 
                  onClick={handlePrev}
                  className="px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all"
                >
                  Anterior
                </button>
              )}
              {step < 4 && (
                <button 
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-14 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg active:scale-95"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Norma UNE 100165</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">shield_moon</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Garantía Sanidad</span>
             </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Afondo Higiene Industrial © 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Calculadora;
