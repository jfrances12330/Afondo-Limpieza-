import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder de la Tanda A. La herramienta real llega en la Tanda B.
const ResenasTool: React.FC = () => (
  <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex items-center justify-center px-6 py-24">
    <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl p-8 sm:p-10 text-center">
      <span className="material-symbols-outlined !text-5xl mb-5 text-primary" aria-hidden="true">star</span>
      <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
        Pedir reseña
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
        Herramienta en construcción
      </p>
      <Link
        to="/zona-privada"
        className="mt-8 inline-block text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
      >
        ← Volver a la zona privada
      </Link>
    </div>
  </div>
);

export default ResenasTool;
