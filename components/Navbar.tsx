
import React from 'react';

interface NavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onNavigateHome: () => void;
  onNavigateCalculadora: () => void;
  onNavigateContacto: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDarkMode, isDarkMode, onNavigateHome, onNavigateCalculadora, onNavigateContacto }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 lg:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onNavigateHome} className="flex items-center gap-3 text-left focus:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl font-bold">cleaning_services</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-white text-lg font-bold leading-tight tracking-tight">Afondo Limpieza</span>
            <span className="text-white/70 text-xs font-normal">Expertos en Higiene Industrial</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          <button onClick={onNavigateHome} className="text-white hover:text-primary transition-colors text-sm font-medium">Inicio</button>
          <a href="#servicios" className="text-white hover:text-primary transition-colors text-sm font-medium">Servicios</a>
          <button onClick={onNavigateCalculadora} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all backdrop-blur-sm">
            Calculadora de Presupuesto
          </button>
          <button onClick={onNavigateContacto} className="text-white hover:text-primary transition-colors text-sm font-medium">Contacto</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <a href="tel:+34622064101" className="hidden sm:flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm transition-all border border-white/10">
            <span className="material-symbols-outlined text-primary">call</span>
            <span className="font-bold text-sm">622 064 101</span>
          </a>
          <button className="lg:hidden text-white p-1">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
