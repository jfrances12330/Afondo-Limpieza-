
import React from 'react';

interface LegalProps {
  onBack: () => void;
}

const AvisoLegal: React.FC<LegalProps> = ({ onBack }) => {
  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-12 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Inicio
        </button>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12">Aviso Legal</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <p className="text-slate-600 dark:text-slate-400 italic">
            [Añada aquí el contenido legal de su empresa, CIF, domicilio social y datos de contacto oficiales]
          </p>
          
          <div className="h-96 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center">
            <span className="text-slate-400">Espacio reservado para texto legal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvisoLegal;
