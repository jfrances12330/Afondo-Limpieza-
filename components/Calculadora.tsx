
import React from 'react';

interface CalculadoraProps {
  onBack: () => void;
}

const Calculadora: React.FC<CalculadoraProps> = ({ onBack }) => {
  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-12 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Inicio
        </button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Presupuesto Online Instantáneo
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Complete los datos de su instalación para recibir una estimación sin compromiso. Analizaremos sus necesidades técnicas en tiempo real.
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Fondo decorativo industrial */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          {/* Contenedor principal de la calculadora */}
          <div id="contenedor-calculadora-afondo" className="relative z-10 min-h-[400px] flex flex-col items-center justify-center text-center">
            {/* Aquí se integrará el script de la calculadora de presupuesto */}
            <div className="p-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl w-full">
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">analytics</span>
              <p className="text-slate-400 dark:text-slate-500 font-medium">Cargando interfaz de cálculo inteligente...</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <span className="material-symbols-outlined text-primary mb-2">speed</span>
            <h4 className="font-bold dark:text-white">Rápido</h4>
            <p className="text-sm text-slate-500">Estimación en menos de 60 segundos.</p>
          </div>
          <div className="p-6">
            <span className="material-symbols-outlined text-primary mb-2">fact_check</span>
            <h4 className="font-bold dark:text-white">Preciso</h4>
            <p className="text-sm text-slate-500">Basado en metros lineales de conducto.</p>
          </div>
          <div className="p-6">
            <span className="material-symbols-outlined text-primary mb-2">description</span>
            <h4 className="font-bold dark:text-white">Sin Compromiso</h4>
            <p className="text-sm text-slate-500">Reciba el PDF en su email opcionalmente.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculadora;
