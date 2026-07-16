
import React, { useState, useEffect, useRef, useCallback, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { CIUDADES } from '../data/cobertura';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

/**
 * Tanda 2.2 · rediseño estético completo — sin tocar copy, H1-H3, head, JSON-LD ni enlaces.
 * Añade: scroll reveal (IntersectionObserver), gradient meshes, blur orbs decorativos,
 * cards con backdrop-blur y bordes con gradient, timeline visual en método, tags con
 * stagger de entrada, hero con más aire + stats bar tipo home + gradient text en H1.
 */

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
const useInView = <T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.15 }) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      opts,
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView]);
  return { ref, inView };
};

// Component wrapper: aplica animación fade-in + translate-up al entrar en viewport.
type RevealProps = PropsWithChildren<{ delay?: number; className?: string }>;
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style: React.CSSProperties = { transitionDelay: `${delay}ms` };
  const cls = `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`;
  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: '¿Cada cuánto hay que limpiar los conductos de extracción de un restaurante?',
    // TODO Jaime: incorporar periodicidad recomendada por tipo de cocina.
    a: 'Depende del volumen y el tipo de cocina: no es lo mismo una freidora a pleno rendimiento que una cocina de vapor. Como referencia general del sector, en cocinas de uso intensivo se recomienda al menos una limpieza interior anual. En la inspección inicial te decimos la periodicidad recomendada para tu caso.',
  },
  {
    q: '¿Qué norma regula la limpieza de conductos de extracción de humos?',
    a: 'Las referencias principales son la norma UNE 100165 (extracción de humos y ventilación de cocinas), el Código Técnico de la Edificación (CTE DB-SI de seguridad en caso de incendio y DB-HS3 de calidad del aire interior) y el Reglamento (CE) 852/2004 de higiene de los productos alimenticios. Nuestro informe técnico se elabora siguiendo criterios de la UNE 100165 y el CTE.',
  },
  {
    q: '¿Por qué se incendian los conductos de extracción?',
    a: 'Porque la grasa acumulada en el interior es combustible. Basta una llamarada en cocina o una temperatura elevada mantenida para que la grasa del arranque del conducto prenda, y el propio tiro del sistema propaga el fuego por el interior del conducto hacia arriba. Es una de las causas típicas de incendio grave en hostelería.',
  },
  {
    q: '¿Qué es el efecto chimenea?',
    a: 'Es el tiro natural que se genera en un conducto vertical: el aire caliente asciende y arrastra aire fresco desde abajo. En un incendio de conducto ese tiro actúa como un fuelle que alimenta las llamas con oxígeno y las acelera hacia las plantas superiores y la cubierta, por el interior de una tubería a la que los bomberos no pueden acceder directamente.',
  },
  {
    q: '¿Sirve limpiar solo la campana y los filtros sin limpiar el conducto?',
    a: 'No es suficiente. La campana y los filtros son la parte visible, pero la grasa que atraviesa los filtros se deposita en el interior del conducto, que es donde se origina y propaga el incendio. Una limpieza completa incluye el desengrase interior del conducto en todos sus tramos.',
  },
  {
    q: '¿Qué es un registro o ventana de inspección y por qué es importante?',
    a: 'Es una apertura practicable en el conducto que permite acceder a su interior para inspeccionarlo y limpiarlo. Muchos conductos se instalaron sin registros suficientes: en esos casos, abrimos ventanas de inspección en los puntos necesarios y las sellamos al terminar, dejando accesos practicables para futuros mantenimientos.',
  },
  {
    q: '¿Qué me entregáis al terminar el trabajo?',
    a: 'Un informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE, con fotografías del antes y el después de cada tramo tratado, alcance de la intervención, fecha y datos del técnico. Es la documentación que puede requerirte tu aseguradora, sanidad o la propiedad del local.',
  },
  {
    q: '¿Trabajáis fuera de Alicante ciudad?',
    a: 'Sí. Damos servicio en toda la provincia de Alicante: Alicante, Alcoy, Altea, Benidorm, Dénia, El Campello, Elche, Elda, Guardamar, Jávea, Orihuela, San Vicente del Raspeig, Santa Pola, Torrevieja y Villajoyosa, entre otras poblaciones. Nuestra base está en San Vicente del Raspeig.',
  },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4">
      {FAQ_ITEMS.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={i * 60}>
            <div className={`group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border rounded-2xl shadow-sm transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary/40 shadow-primary/10 shadow-lg' : 'border-slate-100 dark:border-slate-800 hover:border-primary/30'}`}>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white pr-2">{it.q}</span>
                <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary text-white' : ''}`}>
                  <span className="material-symbols-outlined text-xl">expand_more</span>
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {it.a}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

// ─── CTAs ───────────────────────────────────────────────────────────────────
const CTAPrimary: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => {
  // Efecto "magnético" suave: sigue el cursor un poco.
  const btn = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.current.style.transform = `translate(${x * 0.06}px, ${y * 0.15 - 4}px)`;
  }, []);
  const reset = useCallback(() => {
    if (btn.current) btn.current.style.transform = 'translate(0,0)';
  }, []);
  return (
    <a
      ref={btn}
      onMouseMove={onMove}
      onMouseLeave={reset}
      href="tel:+34622064101"
      className="group relative flex h-20 md:h-24 w-full max-w-xl items-center justify-center gap-4 overflow-hidden rounded-[2rem] bg-primary px-8 md:px-10 transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_25px_50px_rgba(26,26,255,0.45)] mx-auto"
    >
      {/* brillo interior */}
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></span>
      <span className="material-symbols-outlined text-white font-bold text-3xl md:text-4xl relative z-10">call</span>
      <div className="flex flex-col items-start relative z-10">
        <span className="text-lg md:text-2xl font-black tracking-wide text-white uppercase leading-none">{text}</span>
        {sub && <span className="text-[10px] md:text-[11px] font-bold text-white/70 uppercase mt-1.5 italic">{sub}</span>}
      </div>
    </a>
  );
};

const CTASecondary: React.FC = () => (
  <a
    href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-green-500/40 active:scale-95"
  >
    <span className="material-symbols-outlined">chat</span>
    WhatsApp
  </a>
);

// ─── Decorativos ─────────────────────────────────────────────────────────────
// Blur orbs de fondo para dar profundidad.
const Orb: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} aria-hidden="true" />
);

// Grid pattern sutil para bloques oscuros (tipo Linear/Vercel).
const GridPattern: React.FC = () => (
  <div
    className="absolute inset-0 opacity-[0.07] pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
      backgroundSize: '56px 56px',
      maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
    }}
    aria-hidden="true"
  />
);

// ─── Página ─────────────────────────────────────────────────────────────────
const LimpiezaConductos: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Navbar
        onToggleDarkMode={() => document.documentElement.classList.toggle('dark')}
        isDarkMode={false}
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateCalculadora={() => { window.location.href = '/calculadora'; }}
        onNavigateContacto={() => { window.location.href = '/contacto'; }}
        onNavigateServices={() => { window.location.href = '/#servicios'; }}
        // "home" hace que el nav sea absolute+transparente sobre el hero oscuro.
        currentView="home"
      />

      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="relative flex min-h-[100svh] w-full flex-col justify-center items-center overflow-hidden bg-slate-950">
          {/* Fondo imagen + overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-[0.28] bg-cover bg-center bg-no-repeat scale-110"
              style={{
                backgroundImage:
                  "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuBMJSp4bqbkiqdVdN-PE_YlaJHONjVHgCTgeIXkj1gDryN2gS3yVKhMWd8rQ-wKLVQ4xYbfqvVfZa34T4DjHfyMCn2vV8GvNtQSKLXYyPx7EmA8Oy2Hg9n6d1DBEyS2TwgIdhDjtimS7341ch-8c49zOmtcjuaf5Qz5j9iOUJgyuzUNg1njEOzUR_eAtzJgF9T0pMlKdwXtuFatTM2zml4jJIIMhl3OnRe4mA0RjVHuZY7a4Dz9dI8qggimQ8jintFWvzpKCEgcAzM\")",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" aria-hidden="true"></div>
            {/* orbs de color */}
            <Orb className="bg-primary/25 w-[560px] h-[560px] -top-40 -left-40 animate-pulse" />
            <Orb className="bg-cyan-500/15 w-[520px] h-[520px] bottom-0 -right-40" />
            <GridPattern />
          </div>

          <div className="relative z-10 w-full max-w-6xl px-6 lg:px-12 pt-40 pb-40 md:pt-48 md:pb-48 flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-5 py-2 backdrop-blur-md mb-6 md:mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Servicio · Alicante y provincia</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-6 md:mb-8 max-w-5xl text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Limpieza de conductos de extracción en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-400">Alicante</span>: desengrase interior de tramos verticales y horizontales
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-6 md:mb-8 max-w-3xl text-base font-medium leading-relaxed text-slate-200/90 sm:text-lg lg:text-xl">
                La grasa que no ves es la que quema. En Afondo realizamos la limpieza de conductos de extracción de humos en cocinas industriales de Alicante y provincia: abrimos registros de inspección, desengrasamos el interior del conducto en toda su longitud —tramos verticales y horizontales— y lo documentamos con un informe técnico con fotografías del antes y el después, siguiendo criterios de la norma UNE 100165 y del CTE.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mb-10 md:mb-12 max-w-3xl text-sm md:text-base text-slate-300/90 leading-relaxed">
                Soy Jaime Gascón López, técnico especialista en limpieza y desengrase de sistemas de extracción, autónomo con seguro de responsabilidad civil en vigor. Si tienes un restaurante, bar, hotel o cocina colectiva en la provincia de Alicante, llámame al <strong className="text-white">622 064 101</strong> y te digo qué necesita tu instalación.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col items-center justify-center gap-6">
                <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto sin compromiso" />
                <CTASecondary />
              </div>
            </Reveal>
          </div>

          {/* Stats bar inferior (patrón home) */}
          <div className="absolute bottom-0 z-20 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4 py-5 md:py-6 md:gap-12 lg:px-12">
              {[
                { icon: 'verified', color: 'primary', label: 'Informe técnico\nUNE 100165 · CTE' },
                { icon: 'local_fire_department', color: 'orange', label: 'Prevención de\nincendio en conducto' },
                { icon: 'inventory_2', color: 'green', label: 'Registros y\nventanas de inspección' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div className={`flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl shrink-0 border ${
                    b.color === 'primary' ? 'bg-primary/20 text-primary border-primary/30' :
                    b.color === 'orange' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    <span className="material-symbols-outlined text-xl md:text-3xl">{b.icon}</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest text-left leading-tight whitespace-pre-line">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Qué son los conductos ═══ */}
        <section className="relative bg-white dark:bg-slate-900 py-24 md:py-32 overflow-hidden">
          <Orb className="bg-primary/5 w-[600px] h-[600px] -top-40 -right-40" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Contexto técnico</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Qué son los conductos de extracción y por qué acumulan grasa
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                <p>
                  El conducto de extracción es la tubería que conecta la campana de tu cocina con la salida de humos al exterior. Cada servicio de cocina arrastra vapores cargados de grasa que los filtros no retienen al 100%: una parte atraviesa la campana y se va condensando en las paredes interiores del conducto, capa sobre capa, día tras día.
                </p>
                <p>
                  El problema es que esa grasa no se ve. La campana puede estar reluciente por fuera mientras el conducto acumula milímetros de grasa carbonizable en su interior, especialmente en los tramos verticales (donde la grasa escurre y se concentra) y en los codos y tramos horizontales (donde se deposita por gravedad). Limpiar solo la campana y los filtros es limpiar la puerta de casa y dejar el incendio dentro.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-12 md:mt-16 relative rounded-[2rem] p-[1px] bg-gradient-to-br from-primary/40 via-transparent to-cyan-400/30">
                <div className="rounded-[calc(2rem-1px)] bg-slate-50 dark:bg-slate-800/60 backdrop-blur-xl p-8 md:p-10">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-black leading-tight mb-3">
                        Señales de que tu conducto necesita una limpieza interior
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        Goteo de grasa por juntas del conducto o por la campana, olor a grasa quemada al encender el extractor, pérdida de tiro (el humo vuelve a la cocina), ruido o vibración anormal del extractor, y manchas de grasa en la salida de humos de cubierta. Si tu último desengrase interior de conducto no está documentado con fecha y fotos, asume que está pendiente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ El riesgo real ═══ */}
        <section className="relative bg-slate-50 dark:bg-slate-950 py-24 md:py-32 overflow-hidden">
          <Orb className="bg-red-500/10 w-[500px] h-[500px] -top-40 -left-40" />
          <Orb className="bg-orange-500/10 w-[400px] h-[400px] bottom-0 right-0" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16">
              <span className="text-red-600 dark:text-red-400 font-black text-[10px] tracking-[0.3em] uppercase mb-4">Por qué importa</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                El riesgo real: efecto chimenea e incendio en el conducto
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                <p>
                  Cuando una llama o una temperatura alta alcanza la grasa acumulada en el arranque del conducto, esa grasa prende. Y un conducto vertical cargado de grasa se comporta exactamente como una chimenea: el propio tiro del sistema alimenta el fuego con oxígeno y lo propaga hacia arriba a gran velocidad, atravesando plantas, falsos techos y cubiertas. Es el llamado efecto chimenea, y es la razón por la que un incendio de conducto es tan destructivo y tan difícil de extinguir: el fuego avanza por el interior de una tubería inaccesible.
                </p>
                <p>
                  A esto se suma la parte legal y aseguradora: el Código Técnico de la Edificación (CTE DB-SI y DB-HS3) y el Reglamento (CE) 852/2004 de higiene alimentaria exigen que las instalaciones de extracción se mantengan en condiciones adecuadas. Tras un siniestro, la aseguradora suele revisar si puedes acreditar el mantenimiento del sistema de extracción. Sin informe técnico documentado, la cobertura puede quedar comprometida.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Método — timeline visual ═══ */}
        <section className="relative bg-white dark:bg-slate-900 py-24 md:py-32 overflow-hidden">
          <Orb className="bg-primary/5 w-[700px] h-[700px] top-1/2 -translate-y-1/2 -left-60" />
          <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Nuestro método</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Cómo hacemos la limpieza de conductos: nuestro método
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                No metemos una máquina 20 minutos y nos vamos. Trabajamos el interior del conducto tramo a tramo:
              </p>
            </Reveal>

            <div className="relative">
              {/* línea vertical decorativa (solo desktop) */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden="true"></div>

              <div className="space-y-6 md:space-y-8">
                {[
                  { n: '01', h: 'Inspección inicial del sistema', t: 'Recorremos toda la instalación —campana, cajón, conducto y extractor— y evaluamos el nivel de acumulación de grasa, los accesos existentes y los puntos ciegos. Documentamos el estado inicial con fotografías.' },
                  { n: '02', h: 'Apertura de registros y ventanas de inspección', t: 'Si el conducto no dispone de registros suficientes para acceder a todos los tramos, abrimos ventanas de inspección en los puntos necesarios. Sin acceso real al interior no hay limpieza real: es la diferencia entre desengrasar un conducto y limpiarlo solo por la boca.' },
                  { n: '03', h: 'Desengrase mecánico y químico del interior', t: 'Combinamos acción mecánica (rascado y cepillado del interior del conducto) con productos desengrasantes específicos para grasa carbonizada de cocina, actuando en tramos verticales, horizontales, codos y uniones hasta recuperar la superficie del conducto.' },
                  { n: '04', h: 'Sellado de registros', t: 'Cerramos y sellamos todos los registros y ventanas de inspección abiertos, dejando el conducto estanco y con accesos practicables para futuros mantenimientos.' },
                  { n: '05', h: 'Verificación e informe técnico', t: 'Comprobamos el resultado, fotografiamos el después en los mismos puntos que el antes, y te entregamos el informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE.' },
                ].map((s, idx) => (
                  <Reveal key={s.n} delay={idx * 100}>
                    <div className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      {/* nodo central (desktop) */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-4 h-4 rounded-full bg-primary shadow-[0_0_0_6px_rgba(26,26,255,0.15)]" aria-hidden="true"></div>

                      {/* card */}
                      <div className="w-full md:w-[calc(50%-2.5rem)]">
                        <div className="group relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-primary/30 via-transparent to-primary/10 hover:from-primary/60 hover:to-primary/20 transition-all duration-500">
                          <div className="rounded-[calc(1.75rem-1px)] bg-white dark:bg-slate-900 backdrop-blur-xl p-6 md:p-8 group-hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-baseline gap-4 mb-3">
                              <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-cyan-500 tracking-tighter">{s.n}</span>
                              <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-black leading-tight">{s.h}</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">{s.t}</p>
                          </div>
                        </div>
                      </div>
                      {/* espaciador simétrico en desktop */}
                      <div className="hidden md:block w-[calc(50%-2.5rem)]" aria-hidden="true"></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Elementos que tratamos ═══ */}
        <section className="relative bg-slate-50 dark:bg-slate-950 py-24 md:py-32 overflow-hidden">
          <Orb className="bg-cyan-500/5 w-[500px] h-[500px] top-0 right-0" />
          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Alcance del servicio</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Qué elementos del sistema de extracción tratamos
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-12">
              {[
                { s: <><strong className="text-slate-900 dark:text-white">Tramos verticales de conducto</strong>, incluidos patinillos y montantes hasta cubierta.</>, i: 'height' },
                { s: <><strong className="text-slate-900 dark:text-white">Tramos horizontales, codos y derivaciones</strong>, donde más grasa se deposita.</>, i: 'route' },
                { s: <><strong className="text-slate-900 dark:text-white">Campana extractora</strong> por su cara interior (plénum) como arranque del sistema. (Ver <Link to="/" className="text-primary hover:underline font-semibold">limpieza de campanas industriales en Alicante</Link>.)</>, i: 'restaurant' },
                { s: <><strong className="text-slate-900 dark:text-white">Cajón de ventilación y extractor</strong> (turbina, rodete y carcasa).</>, i: 'cyclone' },
                { s: <><strong className="text-slate-900 dark:text-white">Salida de humos en cubierta</strong> y su entorno inmediato.</>, i: 'roofing' },
              ].map((li, idx) => (
                <Reveal key={idx} delay={idx * 60}>
                  <div className="group h-full flex gap-4 items-start bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                    <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl">{li.i}</span>
                    </div>
                    <span className="leading-relaxed text-slate-600 dark:text-slate-300 text-base">{li.s}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                Cada instalación es distinta: hay conductos de 3 metros y conductos que atraviesan 6 plantas. Por eso el presupuesto se hace siempre tras ver la instalación o con fotos y datos concretos.
                {/* TODO Jaime: si nos pasa criterios orientativos de presupuesto, añadir aquí (1-2 frases). */}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 italic">
                {/* TODO tanda 3-5: activar enlace hacia /instalacion-campanas-extractoras-alicante */}
                Si tu sistema es deficiente y necesita renovación, valoramos también instalación de campanas extractoras (próximamente en web).
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ Cobertura ═══ */}
        <section className="relative bg-white dark:bg-slate-900 py-24 md:py-32 overflow-hidden" id="cobertura">
          <Orb className="bg-primary/10 w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2" />
          <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Cobertura</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Dónde trabajamos: limpieza de conductos en toda la provincia de Alicante
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                Damos servicio en <strong className="text-slate-700 dark:text-slate-300">{CIUDADES.map((c) => c.name).join(', ')}</strong>, y en general en toda la <strong className="text-slate-700 dark:text-slate-300">provincia de Alicante</strong>. Nuestra base está en San Vicente del Raspeig, lo que nos permite responder con agilidad en el área de Alicante ciudad y desplazarnos a cualquier punto de la provincia.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 mb-12">
              {CIUDADES.map((c, idx) => (
                <Reveal key={c.name} delay={idx * 40}>
                  <div className="group h-full bg-slate-50 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-100 dark:border-slate-700 p-4 rounded-2xl flex items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-primary text-sm group-hover:scale-125 group-hover:rotate-12 transition-transform">location_on</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.name}</span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={CIUDADES.length * 40}>
                <div className="h-full bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">public</span>
                  <span className="text-xs font-black text-primary uppercase">Toda la Provincia</span>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <p className="text-slate-500 dark:text-slate-400 text-center text-base">
                ¿Tu población no está en la lista? Llámanos igualmente al <strong className="text-slate-900 dark:text-white">622 064 101</strong> y lo vemos.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ Plan anual ═══ */}
        <section className="relative py-24 md:py-32 overflow-hidden border-y border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 dark:from-primary/10 dark:to-cyan-500/5">
          <Orb className="bg-primary/10 w-[500px] h-[500px] top-0 -right-40" />
          <Orb className="bg-cyan-500/10 w-[400px] h-[400px] bottom-0 -left-20" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Mantenimiento</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Plan anual de mantenimiento de conductos
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6 text-base md:text-lg">
                La grasa no espera: en una cocina con actividad diaria, el conducto vuelve a cargarse en cuestión de meses. Por eso ofrecemos un plan anual de mantenimiento con revisiones e intervenciones programadas según el uso real de tu cocina, para que tu sistema esté siempre en condiciones defendibles ante sanidad, aseguradora e inspecciones.
                {/* TODO Jaime: periodicidades ofrecidas y condiciones. */}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm italic mb-10">
                {/* TODO tanda 3-5: activar enlace hacia /servicio-tecnico-campanas-extraccion-alicante */}
                El plan puede incluir intervenciones puntuales de servicio técnico (próximamente en web).
              </p>
              <p className="text-slate-700 dark:text-slate-200 font-bold mb-8">Pide tu plan de mantenimiento — 622 064 101 (llamada o WhatsApp).</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col items-center gap-6">
                <CTAPrimary text="Llamar: 622 064 101" sub="Plan de mantenimiento" />
                <CTASecondary />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Informe técnico ═══ */}
        <section className="relative bg-white dark:bg-slate-900 py-24 md:py-32 overflow-hidden">
          <Orb className="bg-primary/5 w-[500px] h-[500px] -bottom-40 -right-40" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Entregable</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Informe técnico de limpieza: tu prueba documental
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-br from-primary/30 via-transparent to-cyan-400/20">
                <div className="rounded-[calc(2rem-1px)] bg-slate-50 dark:bg-slate-800/60 p-8 md:p-12">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="hidden md:flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                      <span className="material-symbols-outlined text-3xl">description</span>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                        Al terminar cada intervención entregamos un <strong className="text-slate-900 dark:text-white">informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE</strong>, con fotografías del antes y el después de cada tramo tratado, fecha, alcance de la intervención y datos del técnico. Es el documento que te pedirán tu aseguradora, sanidad o el propietario del local. Guárdalo con tu documentación del negocio: es tu prueba de diligencia.
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 italic">
                        {/* TODO tanda 3: activar enlace hacia /certificado-limpieza-campanas-alicante */}
                        Más información sobre el certificado técnico de limpieza (próximamente en web).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="relative bg-slate-50 dark:bg-slate-950 py-24 md:py-32 overflow-hidden" id="faq">
          <Orb className="bg-primary/5 w-[600px] h-[600px] top-1/2 -translate-y-1/2 -right-40" />
          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <Reveal className="flex flex-col items-center text-center mb-14 md:mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Preguntas frecuentes</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Preguntas frecuentes sobre limpieza de conductos de extracción
              </h2>
            </Reveal>
            <Faq />
          </div>
        </section>

        {/* ═══ CTA cierre ═══ */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-24 md:py-32 px-6 lg:px-12">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 to-slate-950" aria-hidden="true"></div>
          <Orb className="bg-primary/25 w-[600px] h-[600px] -top-40 -left-40" />
          <Orb className="bg-cyan-500/15 w-[520px] h-[520px] bottom-0 -right-40" />
          <GridPattern />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Pide presupuesto</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Pide presupuesto <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-400">sin compromiso</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-10 text-base md:text-lg">
                Cuéntanos qué instalación tienes (tipo de cocina, metros aproximados de conducto, plantas que atraviesa) y te damos presupuesto ajustado.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col items-center gap-6 mb-10">
                <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto ajustado" />
                <CTASecondary />
              </div>
              <p className="text-slate-400 text-sm mt-8">
                📞 622 064 101 · 💬 WhatsApp: 622 064 101 · ✉️ <a href="mailto:hola@afondolimpiezadecampanas.com" className="text-white hover:underline">hola@afondolimpiezadecampanas.com</a>
                <br />
                <span className="text-xs text-slate-500">Afondo · Partida Canastell E-17, 03690 San Vicente del Raspeig (Alicante)</span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />

      <a
        href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_25px_rgba(34,197,94,0.4)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:rotate-12 transition-transform">chat</span>
      </a>
    </div>
  );
};

export default LimpiezaConductos;
