
import React from 'react';

interface HeroProps {
  onNavigateServices: () => void;
  onNavigateCalculadora: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateCalculadora }) => {
  return (
    <section className="relative flex min-h-[90vh] md:min-h-screen w-full flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiqkJXK7dDEL0GKvACYNXCL8-7_klRe300_2g0SPv0F-bIV3MY5ueoBz7yGF1ZXHwuGgA13KFHbBqpSw6jGtNGA6p7qwY_5oakgwZzidkDVFvXMXvkqzeJ6MiNQ0GUzTJuyb5d9otC5eYHvwJpSzcUk9Qt-yGIG1HhLWD9EGHtQmlcM7RXTF2juJ45ZXVIiEAExs9ugW0PQ6fl69jW1Elr4FMI4loaIL58c9-M-X3XgTn1OxpfvKmegoPECcf9-eTpH2Dh_B-NXNo")` 
          }}
          role="img"
          aria-label="Técnico realizando limpieza de campana industrial"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-900/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 pt-32 pb-40 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-5 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Alicante y Provincia</span>
        </div>

        <h1 className="mb-8 max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Limpieza de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-400">Campanas Industriales</span> en Alicante
        </h1>

        <p className="mb-12 max-w-3xl text-lg font-medium leading-relaxed text-slate-200/90 sm:text-xl">
          Especialistas en cumplimiento de normativa. Evite incendios y sanciones obteniendo su <strong>presupuesto online</strong> sin compromiso en segundos.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-5">
          <button 
            onClick={onNavigateCalculadora}
            className="group relative flex h-20 w-full max-w-md items-center justify-center gap-4 overflow-hidden rounded-2xl bg-primary px-10 transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_20px_40px_rgba(26,26,255,0.4)] hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-white font-bold text-3xl">calculate</span>
            <div className="flex flex-col items-start">
              <span className="text-xl font-black tracking-wide text-white uppercase leading-none">Calcular Presupuesto Online</span>
              <span className="text-[10px] font-bold text-white/70 uppercase mt-1 italic">Sin compromiso • En menos de 1 minuto</span>
            </div>
          </button>
          
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">bolt</span>
            Valora tu instalación y recibe una oferta técnica inmediata
          </p>
        </div>
      </div>

      {/* Quick Stats bar */}
      <div className="absolute bottom-0 z-20 w-full border-t border-white/10 bg-slate-900/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-8 md:justify-between lg:px-12">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <span className="text-xs font-black text-white uppercase tracking-widest text-left">Certificado <br/> Oficial UNE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <span className="material-symbols-outlined text-3xl">local_fire_department</span>
            </div>
            <span className="text-xs font-black text-white uppercase tracking-widest text-left">Prevención <br/> de incendios</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-400 border border-green-500/30">
              <span className="material-symbols-outlined text-3xl">gavel</span>
            </div>
            <span className="text-xs font-black text-white uppercase tracking-widest text-left">Garantía ante <br/> Sanidad</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
