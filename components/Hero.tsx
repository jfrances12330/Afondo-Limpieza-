
import React from 'react';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden">
      {/* Background Image - Optimized for LCP */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiqkJXK7dDEL0GKvACYNXCL8-7_klRe300_2g0SPv0F-bIV3MY5ueoBz7yGF1ZXHwuGgA13KFHbBqpSw6jGtNGA6p7qwY_5oakgwZzidkDVFvXMXvkqzeJ6MiNQ0GUzTJuyb5d9otC5eYHvwJpSzcUk9Qt-yGIG1HhLWD9EGHtQmlcM7RXTF2juJ45ZXVIiEAExs9ugW0PQ6fl69jW1Elr4FMI4loaIL58c9-M-X3XgTn1OxpfvKmegoPECcf9-eTpH2Dh_B-NXNo")` 
          }}
          role="img"
          aria-label="Técnico realizando limpieza de campana extractora industrial en Alicante"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 pt-20 pb-32 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">Atención Inmediata - Alicante y Provincia</span>
        </div>

        <h1 className="mb-6 max-w-5xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-xl">
          Limpieza de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Campanas Industriales</span> en Alicante
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-normal leading-relaxed text-gray-200 sm:text-xl drop-shadow-md">
          Especialistas en cumplimiento de normativa. Evita incendios, sanciones y pasa las inspecciones de Sanidad sin problemas.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group relative flex h-14 w-full max-w-xs cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(26,26,255,0.4)] hover:scale-105 active:scale-95 sm:w-auto">
            <span className="material-symbols-outlined text-white font-bold">chat</span>
            <span className="text-base font-bold tracking-wide text-white">Pide presupuesto por WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="absolute bottom-0 z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 py-6 md:justify-between lg:px-12">
          <div className="flex items-center gap-3">
            <div className="text-primary"><span className="material-symbols-outlined text-3xl">verified</span></div>
            <div className="flex flex-col"><span className="text-sm font-bold text-white uppercase">Certificado Oficial</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-primary"><span className="material-symbols-outlined text-3xl">local_fire_department</span></div>
            <div className="flex flex-col"><span className="text-sm font-bold text-white uppercase">Prevención de Incendios</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-primary"><span className="material-symbols-outlined text-3xl">gavel</span></div>
            <div className="flex flex-col"><span className="text-sm font-bold text-white uppercase">Evite posibles multas de Sanidad</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
