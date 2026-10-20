
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

  // Restyling oct-2026: la foto queda de apoyo detrás de la calculadora (solo
  // escritorio). Ya no es la imagen principal: se retira su preload de index.html.
  const sizes = "(min-width: 1024px) 300px, 1px";
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
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-brand/40 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-52 right-1/3 h-[420px] w-[420px] rounded-full bg-signal/10 blur-[120px]" aria-hidden="true" />
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

        {/* Composición tipo producto: calculadora viva + foto + informe + sellos */}
        <div className="relative lg:h-[600px]">
          {/* Foto (detrás) */}
          <div className="absolute left-0 top-20 hidden w-[52%] overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-lift lg:block">
            <picture className="block aspect-[4/5]">
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
              />
            </picture>
          </div>

          {/* Informe (chip flotante) */}
          <div className="absolute -right-4 bottom-2 z-20 hidden w-[220px] rounded-xl border border-line bg-white p-3.5 text-ink shadow-lift lg:block" aria-hidden="true">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-white">
                <span className="material-symbols-outlined text-[18px]">description</span>
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold">Informe técnico</p>
                <p className="font-mono text-[10px] text-muted">UNE 100165 · CTE</p>
              </div>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-1.5">
              <img src="/img/reparacion-fuga-conducto-extraccion-alicante-antes-400.webp" alt="" className="aspect-video w-full rounded object-cover" width="400" height="225" />
              <img src="/img/reparacion-fuga-conducto-extraccion-alicante-despues-400.webp" alt="" className="aspect-video w-full rounded object-cover" width="400" height="225" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted">Validez</span>
              <span className="rounded bg-[#e8f7ee] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#15803d]">6 meses</span>
            </div>
          </div>

          {/* Calculadora viva */}
          <div className="relative z-10 lg:absolute lg:right-0 lg:top-0 lg:w-[380px]">
            <MiniCalc />
          </div>

          {/* Sellos */}
          <div className="relative z-20 mt-4 rounded-xl border border-line bg-white p-2 text-ink shadow-lift lg:absolute lg:-left-8 lg:bottom-0 lg:mt-0 lg:w-[280px]">
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
