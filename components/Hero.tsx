
import React from 'react';
import MiniCalc from './home/MiniCalc';

interface HeroProps {
  onNavigateServices: () => void;
  onNavigateCalculadora: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateCalculadora }) => {
  // Foto de archivo (Pexels), no es un trabajo de Afondo: procedencia en
  // docs/FOTOS-STOCK-PROCEDENCIA.md. Es lo primero que se sustituye cuando
  // llegue material propio -> docs/FOTOS-PENDIENTES-SUSTITUIR.md.
  // El preload de index.html apunta a estas tres mismas variantes.
  const heroBase = "/img/stock-equipo-extraccion-cubierta-1";
  const heroSrcSet = (ext: string) =>
    `${heroBase}-800.${ext} 800w, ${heroBase}-1280.${ext} 1280w, ${heroBase}-1920.${ext} 1920w`;

  // Restyling oct-2026: la foto queda como fondo apagado del bloque; la pieza
  // principal es el presupuesto al instante. Sin preload en index.html.
  const sellos = [
    { icon: 'verified', text: <>Certificado <br className="hidden" />  técnico UNE</> },
    { icon: 'local_fire_department', text: <>Prevención <br className="hidden" />  de incendios</> },
    { icon: 'gavel', text: <>Garantía ante <br className="hidden" />  Sanidad</> },
  ];

  return (
    <section className="relative overflow-hidden bg-ink font-plex text-white">
      {/* Foto de archivo de fondo, muy apagada */}
      <picture className="pointer-events-none absolute inset-0 block opacity-[0.18]">
        <source type="image/webp" srcSet={heroSrcSet('webp')} sizes="100vw" />
        <img
          src={`${heroBase}-1280.jpg`}
          srcSet={heroSrcSet('jpg')}
          sizes="100vw"
          alt="Equipo de extracción en la cubierta de un edificio: dos turbinas cilíndricas conectadas a conductos de chapa"
          className="h-full w-full object-cover grayscale"
          width="1920"
          height="1440"
          decoding="async"
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/60" aria-hidden="true" />
      {/* Retícula técnica muy tenue: plano de instalación, no decoración de IA */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-brand/40 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-52 right-1/3 h-[420px] w-[420px] rounded-full bg-signal/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-md border border-white/15 bg-white/4 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
            <span className="font-mono text-[12px] text-white/80">Alicante y Provincia</span>
          </div>

          <h1 className="text-[2.35rem] font-semibold leading-[1.06] tracking-tight sm:text-[3.25rem] lg:text-[3.6rem]">
            Limpieza de <span className="text-[#b9c4ff]">Campanas Industriales</span> en Alicante
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300 sm:text-lg sm:leading-7">
            Especialistas en cumplimiento de normativa. Evite incendios y sanciones obteniendo su <strong className="font-semibold text-white">presupuesto online</strong> sin compromiso en segundos.
          </p>

          <div className="mt-9">
            <button
              onClick={onNavigateCalculadora}
              className="group inline-flex h-[52px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-white px-6 text-ink transition-colors hover:bg-slate-100 sm:w-auto"
            >
              <span className="material-symbols-outlined text-[22px] text-brand" aria-hidden="true">calculate</span>
              <span className="text-[16px] font-semibold">Calcular Presupuesto</span>
              <span className="material-symbols-outlined text-[20px] text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true">arrow_forward</span>
            </button>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-white/55">
              <span className="text-white/70">Sin compromiso • Online</span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true"></span>
              <p className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-signal">bolt</span>
                Valora tu instalación ahora
              </p>
            </div>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-2 border-t border-white/10 pt-6 sm:grid-cols-3">
            {sellos.map((x, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/6 text-[#b9c4ff]">
                  <span className="material-symbols-outlined text-[18px]">{x.icon}</span>
                </span>
                <span className="text-[13px] font-medium leading-snug text-white/85">{x.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Presupuesto al instante */}
        <div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
          <MiniCalc />
        </div>
      </div>
    </section>
  );
};

export default Hero;
