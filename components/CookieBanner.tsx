
import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onManage: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onManage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('afondo-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('afondo-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] p-4 md:p-6 flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="w-full max-w-4xl bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-white font-bold text-lg mb-2">Valoramos su privacidad</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar su experiencia y analizar el tráfico. 
            Al hacer clic en "Aceptar", acepta el uso de todas las cookies. Puede configurar sus preferencias en cualquier momento.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button 
            onClick={onManage}
            className="text-slate-400 hover:text-white text-sm font-bold transition-colors py-2 px-4"
          >
            Configurar
          </button>
          <button 
            onClick={acceptCookies}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Aceptar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
