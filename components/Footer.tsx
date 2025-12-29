
import React from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'aviso-legal' | 'privacidad' | 'cookies') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 text-left focus:outline-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl font-bold">cleaning_services</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Afondo Limpieza</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">Alicante Industrial Hygiene</span>
            </div>
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            <button onClick={() => onNavigate('aviso-legal')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Aviso Legal</button>
            <button onClick={() => onNavigate('privacidad')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Privacidad</button>
            <button onClick={() => onNavigate('cookies')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Cookies</button>
            <a href="https://wa.me/34622064101" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">WhatsApp</a>
          </div>
        </div>
        
        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 dark:text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Afondo Limpieza Industrial. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">verified</span> Alicante</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">security</span> UNE 100165</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
