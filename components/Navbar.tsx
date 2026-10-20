import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from './ui';

interface NavbarProps {
  // Restyling oct-2026: el conmutador de modo oscuro se retira de la web pública.
  // Las props se conservan para no tocar a los llamadores.
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
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

const linkCls = 'text-[14.5px] font-medium text-ink-3 hover:text-ink transition-colors';
const itemCls = 'block rounded-md px-3 py-2.5 text-[14.5px] font-medium text-ink-2 hover:bg-mist hover:text-ink transition-colors';

const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateCalculadora,
  onNavigateContacto,
}) => {
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
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-line/80 bg-white/85 backdrop-blur-md font-plex">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <button onClick={onNavigateHome} className="focus:outline-hidden">
          <Brand
            name={<span className="inline-block lowercase first-letter:uppercase">AFONDO</span>}
            sub="Higiene Industrial"
          />
        </button>

        {/* Menú desktop */}
        <div className="hidden xl:flex items-center gap-8">
          <button onClick={onNavigateHome} className={linkCls}>Inicio</button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpenDesktop((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openDesktop}
              className={`${linkCls} flex items-center gap-0.5`}
            >
              Servicios
              <span className={`material-symbols-outlined text-[18px] transition-transform ${openDesktop ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {openDesktop && (
              <div role="menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl border border-line bg-white p-1.5 shadow-lift z-50">
                {SERVICIOS.map((s) => (
                  <Link key={s.to} to={s.to} onClick={() => setOpenDesktop(false)} role="menuitem" className={itemCls}>
                    {s.label}
                  </Link>
                ))}
                <div className="mx-3 my-1.5 h-px bg-line"></div>
                <Link to="/trabajos-realizados-alicante" onClick={() => setOpenDesktop(false)} role="menuitem" className={itemCls}>
                  Trabajos realizados
                </Link>
              </div>
            )}
          </div>

          <button onClick={onNavigateCalculadora} className={linkCls}>
            Calculadora
          </button>
          <button onClick={onNavigateContacto} className={linkCls}>Contacto</button>
          <Link to="/zona-privada" title="Zona privada — acceso técnicos" className={`${linkCls} flex items-center gap-1 whitespace-nowrap`}>
            <span className="material-symbols-outlined text-[17px]">lock</span>
            Zona privada
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a href="tel:+34622064101" className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-[14px] font-semibold text-white hover:bg-ink-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="tnum whitespace-nowrap">622 06 41 01</span>
          </a>
          <button
            onClick={() => setOpenMobile((v) => !v)}
            aria-label="Menú de servicios"
            aria-expanded={openMobile}
            className="xl:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink hover:bg-mist transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">{openMobile ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Desplegable móvil */}
      {openMobile && (
        <div className="xl:hidden border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-3 py-3 sm:px-4">
            <div className="px-3 pb-1 pt-2 font-mono text-[11px] text-muted">Servicios</div>
            {SERVICIOS.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpenMobile(false)} className={itemCls}>
                {s.label}
              </Link>
            ))}
            <Link to="/trabajos-realizados-alicante" onClick={() => setOpenMobile(false)} className={itemCls}>
              Trabajos realizados
            </Link>
            <div className="mx-3 my-2 h-px bg-line"></div>
            <button onClick={() => { setOpenMobile(false); onNavigateCalculadora(); }} className={`${itemCls} w-full text-left`}>Calculadora</button>
            <button onClick={() => { setOpenMobile(false); onNavigateContacto(); }} className={`${itemCls} w-full text-left`}>Contacto</button>
            <Link to="/zona-privada" onClick={() => setOpenMobile(false)} className={`${itemCls} flex items-center gap-1.5`}>
              <span className="material-symbols-outlined text-[17px]">lock</span>
              Zona privada
            </Link>
            <a href="tel:+34622064101" className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg bg-ink text-[15px] font-semibold text-white sm:hidden">
              <span className="material-symbols-outlined text-[18px]">call</span>
              622 06 41 01
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
