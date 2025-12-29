
import React from 'react';

interface ContactSectionProps {
  onNavigate: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const phone = "+34622064101";
  const phoneDisplay = "622 064 101";

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Vías de Contacto Directas</span>
          <h2 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-black tracking-tight mb-8">
            ¿Hablamos ahora? <br /> Elige tu medio favorito.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Sin formularios complejos. Recibe una valoración en pocos minutos enviando una foto de tu instalación por WhatsApp o llamándonos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* WhatsApp Card - Primary Sales Channel */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </span>
            </div>
            
            <div className="mb-8 p-6 bg-green-500 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[64px] font-light">chat</span>
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">WhatsApp Business</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-xs">
              Ideal para enviarnos fotos de tu campana y recibir un presupuesto rápido.
            </p>
            
            <div className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-16 rounded-2xl flex items-center justify-center gap-3 transition-colors text-lg shadow-lg shadow-green-500/20">
              <span>Chatear con un experto</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400 italic">Respuesta en pocos minutos</p>
          </a>

          {/* Call Card - Direct Contact */}
          <a 
            href={`tel:${phone}`} 
            className="group relative bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                Directo
              </span>
            </div>
            
            <div className="mb-8 p-6 bg-primary rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[64px] font-light">call</span>
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Llamada Directa</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-xs">
              Habla con nuestros técnicos para emergencias o dudas sobre la normativa.
            </p>
            
            <div className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-16 rounded-2xl flex items-center justify-center gap-3 transition-colors text-xl shadow-lg shadow-primary/20 tracking-wide">
              <span>{phoneDisplay}</span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400 italic">Atención inmediata 24/7</p>
          </a>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
          >
            Ver todas las opciones de contacto y ubicación
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
