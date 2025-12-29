
import React from 'react';

interface NavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onNavigateHome: () => void;
  onNavigateCalculadora: () => void;
  onNavigateContacto: () => void;
  onNavigateServices: () => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onToggleDarkMode, 
  isDarkMode, 
  onNavigateHome, 
  onNavigateCalculadora, 
  onNavigateContacto,
  onNavigateServices,
  currentView 
}) => {
  const isLightPage = currentView !== 'home';
  const textColor = isLightPage ? 'text-slate-900' : 'text-white';
  const subTextColor = isLightPage ? 'text-slate-500' : 'text-white/60';
  const linkColor = isLightPage ? 'text-slate-600 hover:text-primary' : 'text-white/80 hover:text-white';

  return (
    <nav className={`${isLightPage ? 'relative bg-white border-b border-slate-100 shadow-sm' : 'absolute'} top-0 left-0 w-full z-50 px-6 py-6 lg:px-12 transition-all`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onNavigateHome} 
          className="flex items-center gap-4 group focus:outline-none"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-3xl">cleaning_services</span>
          </div>
          <div className="flex flex-col text-left">
            <span className={`${textColor} text-xl font-black leading-none tracking-tight transition-colors uppercase`}>AFONDO</span>
            <span className={`${subTextColor} text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors`}>Higiene Industrial</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-10">
          <button onClick={onNavigateHome} className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider`}>Inicio</button>
          <button onClick={onNavigateServices} className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider`}>Servicios</button>
          <button 
            onClick={onNavigateCalculadora} 
            className={`${isLightPage ? 'bg-primary text-white' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all backdrop-blur-md`}
          >
            Calculadora
          </button>
          <button onClick={onNavigateContacto} className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider`}>Contacto</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleDarkMode}
            className={`p-3 ${isLightPage ? 'text-slate-500 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'} rounded-full transition-all`}
          >
            <span className="material-symbols-outlined text-2xl">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <a href="tel:+34622064101" className={`hidden sm:flex items-center gap-3 text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl shadow-xl shadow-primary/20 transition-all border border-white/10 group`}>
            <span className="material-symbols-outlined text-white group-hover:rotate-12 transition-transform">call</span>
            <span className="font-black text-sm tracking-wide">622 06 41 01</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
