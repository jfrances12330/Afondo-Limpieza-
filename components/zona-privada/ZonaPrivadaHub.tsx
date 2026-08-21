import React from 'react';
import { Link } from 'react-router-dom';

const ZonaPrivadaHub: React.FC = () => (
  <div className="min-h-screen bg-surface-light dark:bg-surface-dark px-6 py-16 sm:py-24">
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          Zona privada
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-primary mt-2">
          Afondo
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          to="/zona-privada/certificado"
          className="group block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all p-8 sm:p-10 text-center"
        >
          <span className="material-symbols-outlined block text-5xl leading-none mb-5 text-primary" aria-hidden="true">description</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            Certificado de limpieza
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Crear el informe de una intervención y descargar el PDF
          </p>
        </Link>

        <Link
          to="/zona-privada/resenas"
          className="group block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all p-8 sm:p-10 text-center"
        >
          <span className="material-symbols-outlined block text-5xl leading-none mb-5 text-primary" aria-hidden="true">star</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            Pedir reseña
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Enviar el mensaje de reseña por WhatsApp a un cliente
          </p>
        </Link>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/"
          className="text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
        >
          ← Volver a la web
        </Link>
      </div>
    </div>
  </div>
);

export default ZonaPrivadaHub;
