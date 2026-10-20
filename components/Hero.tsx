
import React from 'react';

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

  // Restyling oct-2026: la foto pasa a una columna; el preload de index.html
  // lleva este mismo `sizes`.
  const sizes = "(min-width: 1024px) 560px, calc(100vw - 2.5rem)";
  const sellos = [
    { icon: 'verified', text: <>Certificado <br className="hidden" /> técnico UNE</> },
    { icon: 'local_fire_department', text: <>Prevención <br className="hidden" /> de incendios</> },
    { icon: 'gavel', text: <>Garantía ante <br className="hidden" /> Sanidad</> },
  ];

  return (
    <section className="relative overflow-hidden bg-ink font-plex text-white">
      {/* Retícula técnica muy tenue: plano de instalación, no decoración de IA */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
            <span className="font-mono text-[12px] text-white/80">Alicante y Provincia</span>
          </div>

          <h1 className="text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-[3.25rem] lg:text-[3.6rem]">
            Limpieza de <span className="text-[#b9c4ff]">Campanas Industriales</span> en Alicante
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300 sm:text-lg">
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
        </div>

        {/* Foto + panel de garantías, al estilo ficha de producto */}
        <div className="relative pb-10 lg:pb-0">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-lift">
            <picture className="block aspect-[4/3]">
              <source type="image/webp" srcSet={heroSrcSet('webp')} sizes={sizes} />
              <img
                src={`${heroBase}-1280.jpg`}
                srcSet={heroSrcSet('jpg')}
                sizes={sizes}
                alt="Equipo de extracción en la cubierta de un edificio: dos turbinas cilíndricas conectadas a conductos de chapa"
                className="h-full w-full object-cover"
                width="1920"
                height="1440"
                decoding="async"
                // @ts-ignore - fetchpriority es un atributo válido de HTML5
                fetchpriority="high"
              />
            </picture>
          </div>
          <div className="absolute -bottom-2 left-4 right-4 rounded-xl border border-line bg-white p-2 text-ink shadow-lift sm:left-auto sm:right-[-12px] sm:w-[290px] lg:-bottom-8 lg:-left-10 lg:right-auto">
            {sellos.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 ${i > 0 ? 'border-t border-line' : ''}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                </span>
                <span className="text-[14px] font-medium leading-snug">{s.text}</span>
                <span className="material-symbols-outlined ml-auto text-[18px] text-[#1fa855]">check_circle</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
