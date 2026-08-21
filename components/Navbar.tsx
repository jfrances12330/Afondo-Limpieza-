
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onNavigateHome: () => void;
  onNavigateCalculadora: () => void;
  onNavigateContacto: () => void;
  onNavigateServices: () => void;
  currentView: string;
}

// Fuente única del menú Servicios — preparada para crecer en tandas 3-5.
// Cada entrada: label visible + ruta destino. Añadir nuevas landings aquí.
const SERVICIOS = [
  { label: 'Limpieza de campanas', to: '/' },
  { label: 'Limpieza de conductos', to: '/limpieza-conductos-extraccion-alicante' },
];

const Navbar: React.FC<NavbarProps> = ({
  onToggleDarkMode,
  isDarkMode,
  onNavigateHome,
  onNavigateCalculadora,
  onNavigateContacto,
  onNavigateServices,
  currentView,
}) => {
  const isLightPage = currentView !== 'home';
  const textColor = isLightPage ? 'text-slate-900' : 'text-white';
  const subTextColor = isLightPage ? 'text-slate-500' : 'text-white/60';
  const linkColor = isLightPage ? 'text-slate-600 hover:text-primary' : 'text-white/80 hover:text-white';

  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Cierra el dropdown desktop al click fuera.
  useEffect(() => {
    if (!openDesktop) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDesktop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDesktop]);

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

        {/* Menú desktop */}
        <div className="hidden xl:flex items-center gap-5 2xl:gap-10">
          <button onClick={onNavigateHome} className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider`}>Inicio</button>

          {/* Dropdown Servicios desktop */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpenDesktop((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openDesktop}
              className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-1`}
            >
              Servicios
              <span className={`material-symbols-outlined text-base transition-transform ${openDesktop ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {openDesktop && (
              <div role="menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50">
                {SERVICIOS.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpenDesktop(false)}
                    role="menuitem"
                    className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <div className="mx-4 my-2 h-px bg-slate-100 dark:bg-slate-800"></div>
                <Link
                  to="/trabajos-realizados-alicante"
                  onClick={() => setOpenDesktop(false)}
                  role="menuitem"
                  className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Trabajos realizados
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={onNavigateCalculadora}
            className={`${isLightPage ? 'bg-primary text-white' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all backdrop-blur-md`}
          >
            Calculadora
          </button>
          <button onClick={onNavigateContacto} className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider`}>Contacto</button>
          <Link to="/zona-privada" title="Zona privada — acceso técnicos" className={`${linkColor} transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap`}>
            <span className="material-symbols-outlined text-base">lock</span>
            Zona privada
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Botón toggler móvil menú Servicios */}
          <button
            onClick={() => setOpenMobile((v) => !v)}
            aria-label="Menú de servicios"
            aria-expanded={openMobile}
            className={`xl:hidden p-3 ${isLightPage ? 'text-slate-500 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'} rounded-full transition-all`}
          >
            <span className="material-symbols-outlined text-2xl">{openMobile ? 'close' : 'menu'}</span>
          </button>
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
            <span className="font-black text-sm tracking-wide whitespace-nowrap">622 06 41 01</span>
          </a>
        </div>
      </div>

      {/* Desplegable móvil Servicios */}
      {openMobile && (
        <div className="xl:hidden max-w-7xl mx-auto mt-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2">
          <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Servicios</div>
          {SERVICIOS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              onClick={() => setOpenMobile(false)}
              className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              {s.label}
            </Link>
          ))}
          <div className="mx-4 my-2 h-px bg-slate-100 dark:bg-slate-800"></div>
          <Link
            to="/trabajos-realizados-alicante"
            onClick={() => setOpenMobile(false)}
            className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary transition-colors"
          >
            Trabajos realizados
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
