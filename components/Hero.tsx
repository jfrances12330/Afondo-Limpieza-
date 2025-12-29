
import React from 'react';

interface HeroProps {
  onNavigateServices: () => void;
  onNavigateCalculadora: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateCalculadora }) => {
  const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqkJXK7dDEL0GKvACYNXCL8-7_klRe300_2g0SPv0F-bIV3MY5ueoBz7yGF1ZXHwuGgA13KFHbBqpSw6jGtNGA6p7qwY_5oakgwZzidkDVFvXMXvkqzeJ6MiNQ0GUzTJuyb5d9otC5eYHvwJpSzcUk9Qt-yGIG1HhLWD9EGHtQmlcM7RXTF2juJ45ZXVIiEAExs9ugW0PQ6fl69jW1Elr4FMI4loaIL58c9-M-X3XgTn1OxpfvKmegoPECcf9-eTpH2Dh_B-NXNo";

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center items-center overflow-hidden">
      {/* 
         Elemento invisible para disparar la carga de la imagen con prioridad alta. 
         Añadimos dimensiones para ayudar al navegador a reservar espacio.
      */}
      <img 
        src={heroImageUrl} 
        alt="" 
        className="hidden" 
        width="1920"
        height="1080"
        // @ts-ignore - fetchpriority es un atributo válido de HTML5
        fetchpriority="high" 
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url("${heroImageUrl}")` 
          }}
          role="img"
          aria-label="Técnico realizando limpieza de campana industrial"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-900/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 pt-32 pb-48 md:pt-36 md:pb-56 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-4 md:mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-5 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Alicante y Provincia</span>
        </div>

        <h1 className="mb-4 md:mb-6 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
          Limpieza de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-400">Campanas Industriales</span> en Alicante
        </h1>

        <p className="mb-8 md:mb-10 max-w-4xl text-base font-medium leading-relaxed text-slate-200/90 sm:text-xl lg:text-2xl">
          Especialistas en cumplimiento de normativa. Evite incendios y sanciones obteniendo su <strong>presupuesto online</strong> sin compromiso en segundos.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-6">
          <button 
            onClick={onNavigateCalculadora}
            className="group relative flex h-20 md:h-24 w-full max-w-xl items-center justify-center gap-4 overflow-hidden rounded-[2rem] bg-primary px-10 transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_25px_50px_rgba(26,26,255,0.45)] hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-white font-bold text-3xl md:text-4xl">calculate</span>
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-2xl font-black tracking-wide text-white uppercase leading-none">Calcular Presupuesto</span>
              <span className="text-[10px] md:text-[11px] font-bold text-white/70 uppercase mt-1.5 italic">Sin compromiso • Online</span>
            </div>
          </button>
          
          <p className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">bolt</span>
            Valora tu instalación ahora
          </p>
        </div>
      </div>

      {/* Quick Stats bar */}
      <div className="absolute bottom-0 z-20 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 px-4 py-6 md:py-8 md:gap-16 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-primary/20 text-primary border border-primary/30 shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl">verified</span>
            </div>
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest text-left leading-tight">Certificado <br className="hidden md:block"/> Oficial UNE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl">local_fire_department</span>
            </div>
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest text-left leading-tight">Prevención <br className="hidden md:block"/> de incendios</span>
          </div>
          <div className="hidden xs:flex items-center gap-4">
            <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl">gavel</span>
            </div>
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest text-left leading-tight">Garantía ante <br className="hidden md:block"/> Sanidad</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
