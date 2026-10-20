
import React, { useState, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { CIUDADES } from '../data/cobertura';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { Container, SectionHead, WhatsAppFab } from '../components/ui';
import PanelIntervencion from '../components/PanelIntervencion';
import MapaCobertura from '../components/MapaCobertura';

/**
 * Restyling oct-2026 (tipo Stripe): mismo copy, mismos H1-H3, head, JSON-LD y
 * enlaces que la Tanda 2.3. Fuera orbs, degradados de texto y números gigantes;
 * secciones claras alternadas con bandas oscuras de marca.
 * Única diferencia de DOM buscada: el título de cada paso del método salía
 * DOS veces (uno para móvil y otro para escritorio); ahora sale una.
 */

// Foto real de un trabajo de Jaime (instalación, Alicante mayo 2025).
// El alt describe lo que se ve, no el servicio que vende la página.
const CONDUCTO_BASE = "/img/instalacion-conductos-falso-techo-alicante-1-4x3";
const CONDUCTO_SRCSET = (ext: string) =>
  `${CONDUCTO_BASE}-400.${ext} 400w, ${CONDUCTO_BASE}-800.${ext} 800w, ${CONDUCTO_BASE}-1200.${ext} 1200w`;
const CONDUCTO_ALT = "Conducto de extracción nuevo conectado a la unidad";
// Restyling oct-2026: la portada usa otra foto real de la misma obra (vertical),
// para no repetir la de «Qué son».
const HERO_BASE = "/img/instalacion-conductos-falso-techo-alicante-3";
const HERO_SRCSET = (ext: string) =>
  `${HERO_BASE}-400.${ext} 400w, ${HERO_BASE}-800.${ext} 800w, ${HERO_BASE}-1125.${ext} 1125w`;
const CTA_IMG = "/img/instalacion-conductos-falso-techo-alicante-1-fondo-1280.webp";

// ─── Reveal ─────────────────────────────────────────────────────────────────
// Pass-through: contenido siempre visible. Se conservó el componente para
// mantener la estructura del JSX. Sin animación de entrada (evita bugs de
// render en headless / velocidad muy alta / above-the-fold).
type RevealProps = PropsWithChildren<{ delay?: number; className?: string }>;
const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  { q: '¿Cada cuánto hay que limpiar los conductos de extracción de un restaurante?',
    a: 'Depende del volumen y el tipo de cocina: no es lo mismo una freidora a pleno rendimiento que una cocina de vapor. Como referencia general del sector, en cocinas de uso intensivo se recomienda al menos una limpieza interior anual. En la inspección inicial te decimos la periodicidad recomendada para tu caso.' },
  { q: '¿Qué norma regula la limpieza de conductos de extracción de humos?',
    a: 'Las referencias principales son la norma UNE 100165 (extracción de humos y ventilación de cocinas), el Código Técnico de la Edificación (CTE DB-SI de seguridad en caso de incendio y DB-HS3 de calidad del aire interior) y el Reglamento (CE) 852/2004 de higiene de los productos alimenticios. Nuestro informe técnico se elabora siguiendo criterios de la UNE 100165 y el CTE.' },
  { q: '¿Por qué se incendian los conductos de extracción?',
    a: 'Porque la grasa acumulada en el interior es combustible. Basta una llamarada en cocina o una temperatura elevada mantenida para que la grasa del arranque del conducto prenda, y el propio tiro del sistema propaga el fuego por el interior del conducto hacia arriba. Es una de las causas típicas de incendio grave en hostelería.' },
  { q: '¿Qué es el efecto chimenea?',
    a: 'Es el tiro natural que se genera en un conducto vertical: el aire caliente asciende y arrastra aire fresco desde abajo. En un incendio de conducto ese tiro actúa como un fuelle que alimenta las llamas con oxígeno y las acelera hacia las plantas superiores y la cubierta, por el interior de una tubería a la que los bomberos no pueden acceder directamente.' },
  { q: '¿Sirve limpiar solo la campana y los filtros sin limpiar el conducto?',
    a: 'No es suficiente. La campana y los filtros son la parte visible, pero la grasa que atraviesa los filtros se deposita en el interior del conducto, que es donde se origina y propaga el incendio. Una limpieza completa incluye el desengrase interior del conducto en todos sus tramos.' },
  { q: '¿Qué es un registro o ventana de inspección y por qué es importante?',
    a: 'Es una apertura practicable en el conducto que permite acceder a su interior para inspeccionarlo y limpiarlo. Muchos conductos se instalaron sin registros suficientes: en esos casos, abrimos ventanas de inspección en los puntos necesarios y las sellamos al terminar, dejando accesos practicables para futuros mantenimientos.' },
  { q: '¿Qué me entregáis al terminar el trabajo?',
    a: 'Un informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE, con fotografías del antes y el después de cada tramo tratado, alcance de la intervención, fecha y datos del técnico. Es la documentación que puede requerirte tu aseguradora, sanidad o la propiedad del local.' },
  { q: '¿Trabajáis fuera de Alicante ciudad?',
    a: 'Sí. Damos servicio en toda la provincia de Alicante: Alicante, Alcoy, Altea, Benidorm, Dénia, El Campello, Elche, Elda, Guardamar, Jávea, Orihuela, San Vicente del Raspeig, Santa Pola, Torrevieja y Villajoyosa, entre otras poblaciones. Nuestra base está en San Vicente del Raspeig.' },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-line bg-white">
      {FAQ_ITEMS.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={i * 60} className={i > 0 ? 'border-t border-line' : ''}>
            <button type="button" className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mist/60" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="text-[16px] font-medium leading-snug text-ink">{it.q}</span>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-3 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                <span className="material-symbols-outlined text-[18px]">add</span>
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="max-w-2xl px-6 pb-6 text-[15px] leading-relaxed text-muted">{it.a}</div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

// ─── CTAs ───────────────────────────────────────────────────────────────────
const CTAPrimary: React.FC<{ text: string; sub?: string; tone?: 'dark' | 'light' }> = ({ text, sub, tone = 'dark' }) => (
  <a
    href="tel:+34622064101"
    className={`group inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-lg px-5 transition-colors ${tone === 'dark' ? 'bg-white text-ink hover:bg-slate-100' : 'bg-brand text-white hover:bg-brand-dark'}`}
  >
    <span className={`material-symbols-outlined text-[21px] ${tone === 'dark' ? 'text-brand' : 'text-white'}`}>call</span>
    <span className="flex flex-col items-start leading-none">
      <span className="tnum text-[16px] font-semibold">{text}</span>
      {sub && <span className={`mt-1 font-mono text-[10.5px] ${tone === 'dark' ? 'text-muted' : 'text-white/75'}`}>{sub}</span>}
    </span>
  </a>
);

const CTASecondary: React.FC = () => (
  <a
    href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-[52px] items-center gap-2 rounded-lg bg-[#1fa855] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#178a45]"
  >
    <span className="material-symbols-outlined text-[20px]">chat</span>
    WhatsApp
  </a>
);

// Retícula técnica tenue de las bandas oscuras
const GridPattern: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.07]"
    style={{
      backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
    aria-hidden="true"
  />
);

const DarkEyebrow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="eyebrow mb-4 inline-flex items-center gap-2 !text-[#9fb0ff]"><span className="h-px w-5 bg-[#9fb0ff]" aria-hidden="true"></span>{children}</span>
);

// ─── Página ─────────────────────────────────────────────────────────────────
const LimpiezaConductos: React.FC = () => {
  const sellos = [
    { icon: 'verified', title: 'UNE 100165', sub: 'Informe técnico · CTE' },
    { icon: 'local_fire_department', title: 'Prevención', sub: 'Incendio en conducto' },
    { icon: 'construction', title: 'Registros', sub: 'Ventanas de inspección' },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-white font-plex text-ink">
      <Navbar
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateCalculadora={() => { window.location.href = '/calculadora'; }}
        onNavigateContacto={() => { window.location.href = '/contacto'; }}
        onNavigateServices={() => { window.location.href = '/#servicios'; }}
        currentView="home"
      />

      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden bg-ink text-white">
          <GridPattern />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
            <div>
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
                  <span className="font-mono text-[12px] text-white/80">Alicante y provincia · Urgencias 24h</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[2.6rem]">
                  Limpieza de conductos de extracción en{' '}
                  <span className="text-[#b9c4ff]">Alicante</span>
                  : desengrase interior de tramos verticales y horizontales
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate-300">
                  <span className="font-semibold text-signal">La grasa que no ves es la que quema.</span> En Afondo realizamos la limpieza de conductos de extracción de humos en cocinas industriales de Alicante y provincia: abrimos registros de inspección, desengrasamos el interior del conducto en toda su longitud —tramos verticales y horizontales— y lo documentamos con un informe técnico con fotografías del antes y el después, siguiendo criterios de la norma UNE 100165 y del CTE.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-6 flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <span className="material-symbols-outlined mt-0.5 text-[20px] text-[#9fb0ff]" aria-hidden="true">engineering</span>
                  <p className="text-[14.5px] leading-relaxed text-slate-300">
                    Soy <strong className="font-semibold text-white">Jaime Gascón López</strong>, técnico especialista en limpieza y desengrase de sistemas de extracción, autónomo con seguro de responsabilidad civil en vigor. Si tienes un restaurante, bar, hotel o cocina colectiva en la provincia de Alicante, llámame al <strong className="font-semibold text-white">622 064 101</strong> y te digo qué necesita tu instalación.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto sin compromiso" />
                  <CTASecondary />
                </div>
              </Reveal>
            </div>

            {/* Panel de intervención + foto + sellos */}
            <div className="relative lg:h-[540px]">
              <div className="absolute bottom-0 right-0 hidden w-[52%] overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-lift lg:block">
                <picture className="block aspect-[3/4]">
                  <source type="image/webp" srcSet={HERO_SRCSET('webp')} sizes="(min-width: 1024px) 240px, 1px" />
                  <img
                    src={`${HERO_BASE}-800.jpg`}
                    srcSet={HERO_SRCSET('jpg')}
                    sizes="(min-width: 1024px) 240px, 1px"
                    alt="Recorrido del conducto de extracción hasta la conexión vertical"
                    className="h-full w-full object-cover"
                    width="1125"
                    height="2000"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="relative z-10 lg:absolute lg:left-0 lg:top-4 lg:w-[400px]">
                <PanelIntervencion />
              </div>
              <div className="relative z-20 mt-4 rounded-xl border border-line bg-white p-2 text-ink shadow-lift lg:absolute lg:bottom-6 lg:left-10 lg:mt-0 lg:w-[300px]">
                {sellos.map((b, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 ${i > 0 ? 'border-t border-line' : ''}`}>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                      <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[14px] font-semibold">{b.title}</span>
                      <span className="font-mono text-[10.5px] text-muted">{b.sub}</span>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-[18px] text-[#1fa855]">check_circle</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Qué son ═══ */}
        <section className="bg-white py-20 md:py-28">
          <Container>
            <Reveal>
              <SectionHead
                eyebrow="Contexto técnico"
                title={<>Qué son los conductos de extracción<br className="hidden md:block" /> y <span className="text-brand">por qué acumulan grasa</span></>}
              />
            </Reveal>

            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <Reveal>
                <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-3">
                  <p>El conducto de extracción es la tubería que conecta la campana de tu cocina con la salida de humos al exterior. Cada servicio de cocina arrastra vapores cargados de grasa que los filtros no retienen al 100%: una parte atraviesa la campana y se va condensando en las paredes interiores del conducto, capa sobre capa, día tras día.</p>
                  <p>El problema es que esa grasa no se ve. La campana puede estar reluciente por fuera mientras el conducto acumula milímetros de grasa carbonizable en su interior, especialmente en los tramos verticales (donde la grasa escurre y se concentra) y en los codos y tramos horizontales (donde se deposita por gravedad). <strong className="font-semibold text-ink">Limpiar solo la campana y los filtros es limpiar la puerta de casa y dejar el incendio dentro.</strong></p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <figure className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
                  <picture className="block aspect-[4/3]">
                    <source type="image/webp" srcSet={CONDUCTO_SRCSET('webp')} sizes="(min-width: 1024px) 540px, calc(100vw - 2.5rem)" />
                    <img
                      src={`${CONDUCTO_BASE}-800.jpg`}
                      srcSet={CONDUCTO_SRCSET('jpg')}
                      sizes="(min-width: 1024px) 540px, calc(100vw - 2.5rem)"
                      alt={CONDUCTO_ALT}
                      className="h-full w-full object-cover"
                      width="1500"
                      height="1125"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <figcaption className="border-t border-line p-5">
                    <p className="mb-1 font-mono text-[11.5px] text-[#b45309]">La zona invisible</p>
                    <p className="text-[14px] leading-relaxed text-ink-3">Conducto de extracción nuevo conectado a la unidad. La grasa se acumula por dentro, donde no se ve ni se llega sin registros de inspección.</p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="mt-12 flex items-start gap-4 rounded-xl border border-[#f3d48a] bg-[#fffaeb] p-6 md:p-8">
                <span className="material-symbols-outlined mt-0.5 text-[24px] text-[#b45309]">warning</span>
                <div>
                  <h3 className="mb-2 text-[1.2rem] font-semibold leading-snug text-ink">Señales de que tu conducto necesita una limpieza interior</h3>
                  <p className="text-[15px] leading-relaxed text-ink-3">Goteo de grasa por juntas del conducto o por la campana, olor a grasa quemada al encender el extractor, pérdida de tiro (el humo vuelve a la cocina), ruido o vibración anormal del extractor, y manchas de grasa en la salida de humos de cubierta. <strong className="font-semibold text-[#92400e]">Si tu último desengrase interior de conducto no está documentado con fecha y fotos, asume que está pendiente.</strong></p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ═══ Riesgo real ═══ */}
        <section className="border-y border-line bg-mist py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <div className="eyebrow mb-4 inline-flex items-center gap-2 !text-[#b91c1c]">
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  <span>Por qué importa</span>
                </div>
                <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                  El riesgo real: <span className="text-[#b91c1c]">efecto chimenea</span> e incendio en el conducto
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-3">
                <p>Cuando una llama o una temperatura alta alcanza la grasa acumulada en el arranque del conducto, esa grasa prende. Y un conducto vertical cargado de grasa se comporta exactamente como una chimenea: el propio tiro del sistema alimenta el fuego con oxígeno y lo propaga hacia arriba a gran velocidad, atravesando plantas, falsos techos y cubiertas. Es el llamado <strong className="font-semibold text-ink">efecto chimenea</strong>, y es la razón por la que un incendio de conducto es tan destructivo y tan difícil de extinguir: el fuego avanza por el interior de una tubería inaccesible.</p>
                <p>A esto se suma la parte legal y aseguradora: el <strong className="font-semibold text-ink">Código Técnico de la Edificación (CTE DB-SI y DB-HS3)</strong> y el <strong className="font-semibold text-ink">Reglamento (CE) 852/2004</strong> de higiene alimentaria exigen que las instalaciones de extracción se mantengan en condiciones adecuadas. Tras un siniestro, la aseguradora suele revisar si puedes acreditar el mantenimiento del sistema de extracción. <strong className="font-semibold text-[#b91c1c]">Sin informe técnico documentado, la cobertura puede quedar comprometida.</strong></p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Método — línea de pasos ═══ */}
        <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
          <GridPattern />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <Reveal className="mb-12 max-w-3xl md:mb-14">
              <DarkEyebrow>Nuestro método</DarkEyebrow>
              <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.5rem]">
                Cómo hacemos la limpieza de conductos: <span className="text-[#b9c4ff]">nuestro método</span>
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-300">
                No metemos una máquina 20 minutos y nos vamos. Trabajamos el interior del conducto tramo a tramo:
              </p>
            </Reveal>

            <ol className="relative grid gap-0 md:grid-cols-1">
              {[
                { n: '01', icon: 'search', h: 'Inspección inicial del sistema', t: 'Recorremos toda la instalación —campana, cajón, conducto y extractor— y evaluamos el nivel de acumulación de grasa, los accesos existentes y los puntos ciegos. Documentamos el estado inicial con fotografías.' },
                { n: '02', icon: 'construction', h: 'Apertura de registros y ventanas de inspección', t: 'Si el conducto no dispone de registros suficientes para acceder a todos los tramos, abrimos ventanas de inspección en los puntos necesarios. Sin acceso real al interior no hay limpieza real: es la diferencia entre desengrasar un conducto y limpiarlo solo por la boca.' },
                { n: '03', icon: 'cleaning_services', h: 'Desengrase mecánico y químico del interior', t: 'Combinamos acción mecánica (rascado y cepillado del interior del conducto) con productos desengrasantes específicos para grasa carbonizada de cocina, actuando en tramos verticales, horizontales, codos y uniones hasta recuperar la superficie del conducto.' },
                { n: '04', icon: 'lock', h: 'Sellado de registros', t: 'Cerramos y sellamos todos los registros y ventanas de inspección abiertos, dejando el conducto estanco y con accesos practicables para futuros mantenimientos.' },
                { n: '05', icon: 'description', h: 'Verificación e informe técnico', t: 'Comprobamos el resultado, fotografiamos el después en los mismos puntos que el antes, y te entregamos el informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE.' },
              ].map((s, idx, arr) => (
                <li key={s.n} className="relative grid grid-cols-[44px_1fr] gap-5 pb-10 last:pb-0 md:grid-cols-[44px_220px_1fr] md:gap-8">
                    {idx < arr.length - 1 && <span className="absolute left-[21px] top-11 bottom-0 w-px bg-white/15" aria-hidden="true"></span>}
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink font-mono text-[13px] text-white">{s.n}</span>
                    <div className="flex items-center gap-2.5 md:items-start md:pt-2.5">
                      <span className="material-symbols-outlined text-[20px] text-[#9fb0ff]">{s.icon}</span>
                      <h3 className="text-[1.125rem] font-semibold leading-snug text-white">{s.h}</h3>
                    </div>
                    <p className="col-start-2 text-[15.5px] leading-relaxed text-slate-300 md:col-start-3 md:pt-2">{s.t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ Elementos ═══ */}
        <section className="bg-white py-20 md:py-28">
          <Container>
            <Reveal>
              <SectionHead eyebrow="Alcance del servicio" title="Qué elementos del sistema de extracción tratamos" />
            </Reveal>

            <div className="mb-10 grid grid-cols-1 overflow-hidden rounded-xl border border-line md:grid-cols-2">
              {[
                { s: <><strong className="font-semibold text-ink">Tramos verticales de conducto</strong>, incluidos patinillos y montantes hasta cubierta.</>, i: 'arrow_upward' },
                { s: <><strong className="font-semibold text-ink">Tramos horizontales, codos y derivaciones</strong>, donde más grasa se deposita.</>, i: 'route' },
                { s: <><strong className="font-semibold text-ink">Campana extractora</strong> por su cara interior (plénum) como arranque del sistema. (Ver <Link to="/" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">limpieza de campanas industriales en Alicante</Link>.)</>, i: 'restaurant' },
                { s: <><strong className="font-semibold text-ink">Cajón de ventilación y extractor</strong> (turbina, rodete y carcasa).</>, i: 'cyclone' },
                { s: <><strong className="font-semibold text-ink">Salida de humos en cubierta</strong> y su entorno inmediato.</>, i: 'roofing' },
              ].map((li, idx) => (
                <Reveal key={idx} delay={idx * 70} className="border-b border-line md:[&:nth-child(odd)]:border-r [&:last-child]:border-b-0">
                  <div className="flex h-full items-start gap-4 bg-white p-5 md:p-6">
                    <span className="material-symbols-outlined mt-0.5 text-[22px] text-brand">{li.i}</span>
                    <span className="text-[15.5px] leading-relaxed text-ink-3">{li.s}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink-3">
                Cada instalación es distinta: hay conductos de 3 metros y conductos que atraviesan 6 plantas. Por eso el presupuesto se hace siempre tras ver la instalación o con fotos y datos concretos.
                {/* TODO Jaime: criterios orientativos de presupuesto */}
              </p>
              <p className="mt-3 text-[14px] text-muted">
                {/* TODO tanda 3-5: activar enlace hacia /instalacion-campanas-extractoras-alicante */}
                Si tu sistema es deficiente y necesita renovación, valoramos también instalación de campanas extractoras (próximamente en web).
              </p>
            </Reveal>
          </Container>
        </section>

        {/* ═══ Cobertura ═══ */}
        <section className="border-y border-line bg-mist py-20 md:py-28" id="cobertura">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
            <Reveal>
              <span className="eyebrow mb-4 inline-flex items-center gap-2"><span className="h-px w-5 bg-brand" aria-hidden="true"></span>Cobertura</span>
              <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                Dónde trabajamos: limpieza de conductos en toda la <span className="text-brand">provincia de Alicante</span>
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-3">
                Damos servicio en <strong className="font-semibold text-ink">{CIUDADES.map((c) => c.name).join(', ')}</strong>, y en general en toda la <strong className="font-semibold text-ink">provincia de Alicante</strong>. Nuestra base está en San Vicente del Raspeig, lo que nos permite responder con agilidad en el área de Alicante ciudad y desplazarnos a cualquier punto de la provincia.
              </p>
            </Reveal>

            <div>
              <MapaCobertura
                todaLaProvincia={
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1 text-[13px] font-semibold text-white">
                    <span className="material-symbols-outlined text-[15px]">public</span>
                    Toda la Provincia
                  </span>
                }
              />
              <Reveal>
                <p className="mt-5 text-[15px] text-ink-3">
                  ¿Tu población no está en la lista? Llámanos igualmente al <strong className="tnum font-semibold text-ink">622 064 101</strong> y lo vemos.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ Plan anual ═══ */}
        <section className="relative overflow-hidden bg-brand py-20 text-white md:py-24">
          <GridPattern />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:px-8">
            <Reveal>
              <div className="eyebrow mb-4 inline-flex items-center gap-2 !text-white/80">
                <span className="material-symbols-outlined text-[16px]">event_repeat</span>
                <span>Mantenimiento</span>
              </div>
              <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.4rem]">
                Plan anual de mantenimiento de conductos
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/85">
                La grasa no espera: en una cocina con actividad diaria, el conducto vuelve a cargarse en cuestión de meses. Por eso ofrecemos un plan anual de mantenimiento con revisiones e intervenciones programadas según el uso real de tu cocina, para que tu sistema esté siempre en condiciones defendibles ante sanidad, aseguradora e inspecciones.
                {/* TODO Jaime: periodicidades */}
              </p>
              <p className="mt-3 text-[14px] text-white/65">
                {/* TODO tanda 3-5: activar enlace hacia /servicio-tecnico-campanas-extraccion-alicante */}
                El plan puede incluir intervenciones puntuales de servicio técnico (próximamente en web).
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-xl bg-white p-6 text-ink shadow-lift">
                <p className="mb-5 text-[15.5px] font-semibold leading-snug">Pide tu plan de mantenimiento — 622 064 101 (llamada o WhatsApp).</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+34622064101"
                    className="inline-flex h-[52px] items-center gap-3 rounded-lg bg-ink px-5 text-white transition-colors hover:bg-ink-2"
                  >
                    <span className="material-symbols-outlined text-[21px]">call</span>
                    <span className="flex flex-col items-start leading-none">
                      <span className="tnum text-[16px] font-semibold">Llamar: 622 064 101</span>
                      <span className="mt-1 font-mono text-[10.5px] text-white/65">Plan de mantenimiento</span>
                    </span>
                  </a>
                  <CTASecondary />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Informe técnico ═══ */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="mb-3 text-center font-mono text-[12px] text-muted">07 · Entregable</div>
            <h2 className="mb-10 text-center text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">Informe técnico de limpieza: tu prueba documental</h2>

            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
              <div className="flex items-center gap-2 border-b border-line bg-mist px-5 py-3">
                <span className="material-symbols-outlined text-[18px] text-brand">description</span>
                <span className="font-mono text-[12px] text-ink-3">Informe técnico de limpieza</span>
              </div>
              <div className="p-6 md:p-10">
                <p className="text-[1.0625rem] leading-relaxed text-ink-3">
                  Al terminar cada intervención entregamos un <strong className="font-semibold text-ink">informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE</strong>, con fotografías del antes y el después de cada tramo tratado, fecha, alcance de la intervención y datos del técnico. Es el documento que te pedirán tu aseguradora, sanidad o el propietario del local. <strong className="font-semibold text-brand">Guárdalo con tu documentación del negocio: es tu prueba de diligencia.</strong>
                </p>

                <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-lg border border-line md:grid-cols-4">
                  {[
                    { i: 'calendar_today', l: 'Fecha' },
                    { i: 'construction', l: 'Alcance' },
                    { i: 'compare', l: 'Antes / después' },
                    { i: 'verified', l: 'Firma técnico' },
                  ].map((b, k) => (
                    <div key={b.l} className={`flex items-center gap-2 px-4 py-3.5 text-ink-2 ${k % 2 === 1 ? 'border-l border-line' : ''} ${k >= 2 ? 'border-t border-line md:border-t-0' : ''} ${k === 2 ? 'md:border-l' : ''}`}>
                      <span className="material-symbols-outlined text-[18px] text-brand">{b.i}</span>
                      <span className="text-[14px] font-medium">{b.l}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-[13.5px] text-muted">
                  {/* TODO tanda 3: activar enlace hacia /certificado-limpieza-campanas-alicante */}
                  Más información sobre el certificado técnico de limpieza (próximamente en web).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="border-y border-line bg-mist py-20 md:py-28" id="faq">
          <Container>
            <Reveal>
              <SectionHead align="center" eyebrow="Preguntas frecuentes" title="Preguntas frecuentes sobre limpieza de conductos de extracción" />
            </Reveal>
            <Faq />
          </Container>
        </section>

        {/* ═══ CTA cierre ═══ */}
        <section className="relative overflow-hidden bg-ink px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8">
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.12]" style={{ backgroundImage: `url("${CTA_IMG}")` }} aria-hidden="true"></div>
          <GridPattern />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="eyebrow mb-4 inline-flex items-center gap-2 !text-[#9fb0ff]">
                <span className="material-symbols-outlined text-[16px]">request_quote</span>
                <span>Pide presupuesto</span>
              </div>
              <h2 className="text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[3rem]">
                Pide presupuesto <span className="text-[#b9c4ff]">sin compromiso</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-slate-300">
                Cuéntanos qué instalación tienes (tipo de cocina, metros aproximados de conducto, plantas que atraviesa) y te damos presupuesto ajustado.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto ajustado" />
                <CTASecondary />
              </div>
              <p className="mt-10 text-[14px] text-slate-400">
                📞 622 064 101 · 💬 WhatsApp: 622 064 101 · ✉️ <a href="mailto:hola@afondolimpiezadecampanas.com" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">hola@afondolimpiezadecampanas.com</a>
                <br />
                <span className="mt-2 block font-mono text-[11.5px] text-slate-500">Afondo · Partida Canastell E-17, 03690 San Vicente del Raspeig (Alicante)</span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />
      <WhatsAppFab href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n." />
    </div>
  );
};

export default LimpiezaConductos;
