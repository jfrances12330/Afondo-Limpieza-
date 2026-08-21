import React, { useState } from 'react';
import { ACCESS_CODE } from '../CertificateGenerator';

// Envoltorio de acceso para el hub y la herramienta de reseñas.
// Escribe la MISMA clave y el MISMO valor que el gate interno del generador
// (`afondo_unlock` = ACCESS_CODE): así una sola validación sirve para las dos
// herramientas y el gate del generador nunca llega a pintarse.
const GateAcceso: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => sessionStorage.getItem('afondo_unlock') === ACCESS_CODE
  );
  const [codigo, setCodigo] = useState('');
  const [verCodigo, setVerCodigo] = useState(false);
  const [error, setError] = useState('');

  const tryUnlock = () => {
    if (codigo.trim() === ACCESS_CODE) {
      sessionStorage.setItem('afondo_unlock', ACCESS_CODE);
      setUnlocked(true);
      setError('');
    } else {
      setError('Código incorrecto.');
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl p-8 sm:p-10">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary">
          <span className="material-symbols-outlined text-2xl">lock</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white text-center">
          Zona privada
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-primary text-center mt-1 mb-8">
          Afondo
        </p>

        <label htmlFor="codigo-acceso" className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Código de acceso
        </label>
        <div className="relative">
          <input
            id="codigo-acceso"
            type={verCodigo ? 'text' : 'password'}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
            placeholder="Código de acceso"
            className="w-full h-14 pl-4 pr-14 text-base rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setVerCodigo((v) => !v)}
            aria-label={verCodigo ? 'Ocultar código' : 'Mostrar código'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">
              {verCodigo ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          onClick={tryUnlock}
          className="mt-6 w-full h-14 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-wider rounded-xl transition-all"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default GateAcceso;
