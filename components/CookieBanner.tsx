
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
    <div className="fixed bottom-0 left-0 z-[60] flex w-full justify-center p-3 font-plex md:p-5">
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-lift md:flex-row md:items-center md:gap-6">
        <div className="flex-1">
          <h3 className="mb-1 text-[15px] font-semibold text-ink">Valoramos su privacidad</h3>
          <p className="text-[13px] leading-relaxed text-muted">
            Utilizamos cookies propias y de terceros para mejorar su experiencia y analizar el tráfico. 
            Al hacer clic en "Aceptar", acepta el uso de todas las cookies. Puede configurar sus preferencias en cualquier momento.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onManage}
            className="h-10 flex-1 rounded-lg border border-line px-4 text-[14px] font-medium text-ink-2 transition-colors hover:bg-mist md:flex-none"
          >
            Configurar
          </button>
          <button
            onClick={acceptCookies}
            className="h-10 flex-1 whitespace-nowrap rounded-lg bg-ink px-5 text-[14px] font-semibold text-white transition-colors hover:bg-ink-2 md:flex-none"
          >
            Aceptar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
