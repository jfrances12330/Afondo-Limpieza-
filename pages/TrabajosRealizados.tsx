
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { WhatsAppFab } from '../components/ui';

/**
 * FASE 3 del brief de fotos. Todas las fotos de esta página son trabajos reales
 * de Jaime: aquí NO cabe stock (docs/FOTOS-STOCK-PROCEDENCIA.md).
 * El copy de las cinco tarjetas está cerrado en el brief y se pega literal.
 */

type Foto = {
  base: string;
  anchos: number[];
  w: number;          // proporción real del fichero: la caja la respeta y no recorta
  h: number;
  alt: string;
  etiqueta?: string;  // solo en la pareja antes/después
};

type Trabajo = {
  id: string;
  cat: 'Limpieza' | 'Reparación' | 'Instalación' | 'Mantenimiento';  // solo para el filtro
  n: string;
  titulo: string;
  lugar: string;
  texto: string;
  fotos: Foto[];
};

const IMG = '/img/';

const TRABAJOS: Trabajo[] = [
  {
    id: 'limpieza-turbina-taller-benidorm',
    cat: 'Limpieza',
    n: '01',
    titulo: 'Limpieza de turbina de extracción en taller',
    lugar: 'Benidorm · Enero 2026',
    texto: 'Desmontamos la turbina del restaurante y la trasladamos a nuestro taller para limpiarla a fondo. Desengrasamos por completo el rodete y la caja con productos desengrasantes de uso higiénico-sanitario. En las fotos se ve la grasa acumulada antes de la intervención y el metal a la vista después.',
    // Reencuadre -4x3 en los dos: la pareja antes/después solo se compara si
    // ambas cajas tienen la misma proporción (los originales son 9:16 y 16:9).
    fotos: [
      { base: `${IMG}limpieza-turbina-extraccion-taller-benidorm-antes-4x3`, anchos: [400, 800, 1152], w: 4, h: 3, etiqueta: 'Antes',
        alt: 'Turbina de extracción desmontada cubierta de grasa antes de la limpieza' },
      { base: `${IMG}limpieza-turbina-extraccion-taller-benidorm-despues-4x3`, anchos: [400, 800, 1536], w: 4, h: 3, etiqueta: 'Después',
        alt: 'La misma turbina de extracción tras la limpieza, con el metal a la vista' },
    ],
  },
  {
    id: 'reparacion-fuga-conducto-alicante',
    cat: 'Reparación',
    n: '02',
    titulo: 'Reparación de fugas en conducto de extracción',
    lugar: 'Alicante · Febrero 2026',
    texto: 'El conducto perdía humo por los empalmes entre tramos: se acumulaba humo dentro de la cocina y el olor llegaba a los vecinos. Retiramos el tramo defectuoso, montamos piezas nuevas y sellamos todas las juntas.',
    // FASE 4 sustituirá esta pareja por la barra deslizante: es el único par con
    // el mismo encuadre. Hasta entonces se sirve como pareja antes/después.
    fotos: [
      { base: `${IMG}reparacion-fuga-conducto-extraccion-alicante-antes`, anchos: [400, 800, 1600], w: 16, h: 9, etiqueta: 'Antes',
        alt: 'Empalmes del conducto de extracción con fugas antes de la reparación' },
      { base: `${IMG}reparacion-fuga-conducto-extraccion-alicante-despues`, anchos: [400, 800, 1600], w: 16, h: 9, etiqueta: 'Después',
        alt: 'Conducto de extracción con piezas nuevas y juntas selladas tras la reparación' },
    ],
  },
  {
    id: 'instalacion-conductos-falso-techo-alicante',
    cat: 'Instalación',
    n: '03',
    titulo: 'Instalación de conductos en falso techo',
    lugar: 'Alicante · Mayo 2025',
    texto: 'Instalación de conductos por el falso techo del local para conectar una campana de show cooking y la campana de la cocina con la salida vertical del edificio.',
    fotos: [
      { base: `${IMG}instalacion-conductos-falso-techo-alicante-1`, anchos: [400, 800, 1600], w: 16, h: 9,
        alt: 'Conducto de extracción nuevo conectado a la unidad' },
      { base: `${IMG}instalacion-conductos-falso-techo-alicante-2`, anchos: [400, 800, 1125], w: 9, h: 16,
        alt: 'Conducto de extracción instalado por el falso techo del local' },
      { base: `${IMG}instalacion-conductos-falso-techo-alicante-3`, anchos: [400, 800, 1125], w: 9, h: 16,
        alt: 'Recorrido del conducto de extracción hasta la conexión vertical' },
    ],
  },
  {
    id: 'traslado-extraccion-cubierta-alicante',
    cat: 'Instalación',
    n: '04',
    titulo: 'Traslado de la extracción a cubierta con turbina de mayor capacidad',
    lugar: 'Alicante · 2025',
    texto: 'El bar tenía una turbina pequeña que no daba abasto. Retiramos la turbina antigua, instalamos en la azotea una de mayor capacidad y ejecutamos la instalación de conducto nueva hasta la salida.',
    fotos: [
      { base: `${IMG}instalacion-extraccion-azotea-alicante-1`, anchos: [400, 800, 1536], w: 3, h: 4,
        alt: 'Salida del conducto de extracción a través del muro de la azotea' },
      { base: `${IMG}instalacion-extraccion-azotea-alicante-2`, anchos: [400, 800, 1600], w: 4, h: 3,
        alt: 'Instalación de extracción completa en azotea con la caja de la turbina' },
      { base: `${IMG}instalacion-extraccion-azotea-alicante-3`, anchos: [400, 800, 1600], w: 4, h: 3,
        alt: 'Chimenea de extracción terminada con su sombrerete en una azotea de Alicante' },
    ],
  },
  {
    id: 'mantenimiento-chimenea-barbacoa-javea',
    cat: 'Mantenimiento',
    n: '05',
    titulo: 'Mantenimiento trimestral de chimenea de barbacoa de leña',
    lugar: 'Jávea · Mantenimiento trimestral desde 2025',
    texto: 'Brasería con barbacoa de leña de tiro libre. Realizamos el mantenimiento trimestral del tubo de chimenea: protegemos la zona con plásticos y retiramos el hollín acumulado con cepillos metálicos. Es un cliente al que atendemos de forma periódica desde 2025.',
    fotos: [
      { base: `${IMG}mantenimiento-chimenea-barbacoa-lena-javea-1`, anchos: [400, 800, 1600], w: 3, h: 4,
        alt: 'Zona de la barbacoa de leña protegida con plásticos antes de retirar el hollín' },
      { base: `${IMG}mantenimiento-chimenea-barbacoa-lena-javea-2`, anchos: [400, 800, 1600], w: 3, h: 4,
        alt: 'Trabajo de retirada del hollín del tubo de chimenea con cepillos metálicos' },
      { base: `${IMG}mantenimiento-chimenea-barbacoa-lena-javea-3`, anchos: [400, 800, 1600], w: 3, h: 4,
        alt: 'Interior de la campana de la barbacoa durante el mantenimiento' },
    ],
  },
];

// Portada de la página: la chimenea acabada de la azotea (trabajo 04).
const PORTADA = TRABAJOS[3].fotos[2];

const srcSet = (f: Foto, ext: string) => f.anchos.map((a) => `${f.base}-${a}.${ext} ${a}w`).join(', ');

const WHATSAPP = 'https://wa.me/34622064101?text=Hola,%20he%20visto%20vuestros%20trabajos%20realizados%20y%20quisiera%20presupuesto.';

const CTALlamar: React.FC<{ sub: string }> = ({ sub }) => (
  <a
    href="tel:+34622064101"
    className="inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-lg bg-white px-5 text-ink transition-colors hover:bg-slate-100"
  >
    <span className="material-symbols-outlined text-[21px] text-brand">call</span>
    <span className="flex flex-col items-start leading-none">
      <span className="tnum text-[16px] font-semibold">Llamar: 622 064 101</span>
      <span className="mt-1 font-mono text-[10.5px] text-muted">{sub}</span>
    </span>
  </a>
);

const CTAWhatsapp: React.FC = () => (
  <a
    href={WHATSAPP}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-[52px] items-center gap-2 rounded-lg bg-[#1fa855] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#178a45]"
  >
    <span className="material-symbols-outlined text-[20px]">chat</span>
    WhatsApp
  </a>
);

const FotoTile: React.FC<{ f: Foto; sizes: string }> = ({ f, sizes }) => (
  <figure
    className="relative overflow-hidden rounded-lg border border-line bg-mist"
    style={{ aspectRatio: `${f.w} / ${f.h}` }}
  >
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={srcSet(f, 'webp')} sizes={sizes} />
      <img
        src={`${f.base}-800.jpg`}
        srcSet={srcSet(f, 'jpg')}
        sizes={sizes}
        alt={f.alt}
        className="h-full w-full object-cover"
        width={f.w * 100}
        height={f.h * 100}
        loading="lazy"
        decoding="async"
      />
    </picture>
    {f.etiqueta && (
      <figcaption className={`absolute left-2.5 top-2.5 rounded-md bg-white/95 px-2 py-1 font-mono text-[11px] shadow-card ${f.etiqueta === 'Antes' ? 'text-[#b91c1c]' : 'text-[#15803d]'}`}>
        {f.etiqueta}
      </figcaption>
    )}
  </figure>
);

const CATS = ['Todos', 'Limpieza', 'Reparación', 'Instalación', 'Mantenimiento'] as const;
const N_FOTOS = TRABAJOS.reduce((n, t) => n + t.fotos.length, 0);
const LUGARES = Array.from(new Set(TRABAJOS.map((t) => t.lugar.split(' · ')[0])));

const TrabajosRealizados: React.FC = () => {
  const [cat, setCat] = useState<(typeof CATS)[number]>('Todos');
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
        {/* ═══ PORTADA ═══ */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-10 sm:px-6 md:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-16">
            <div>
              <nav aria-label="Migas de pan" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-white/50">
                  <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/85">Trabajos realizados</li>
                </ol>
              </nav>

              <h1 className="text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-[3.1rem] lg:text-[3.4rem]">
                Trabajos realizados en{' '}
                <span className="text-[#b9c4ff]">Alicante</span>
                {' '}y provincia
              </h1>

              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300">
                Cinco intervenciones de Afondo con las fotografías de cada una: limpieza de turbinas,
                reparación de conductos, instalaciones en falso techo y en cubierta, y mantenimiento
                periódico de chimenea. Cada ficha cuenta qué se hizo y dónde.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+34622064101"
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-lg bg-white px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-slate-100"
                >
                  <span className="material-symbols-outlined text-[20px] text-brand">call</span>
                  <span className="tnum">622 064 101</span>
                </a>
                <CTAWhatsapp />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-lift">
              <picture className="block aspect-[4/3]">
                <source type="image/webp" srcSet={srcSet(PORTADA, 'webp')} sizes="(min-width: 1024px) 480px, calc(100vw - 2.5rem)" />
                <img
                  src={`${PORTADA.base}-800.jpg`}
                  srcSet={srcSet(PORTADA, 'jpg')}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 2.5rem)"
                  alt={PORTADA.alt}
                  className="h-full w-full object-cover object-center"
                  width="1600"
                  height="1200"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* ═══ LAS CINCO FICHAS ═══ */}
        <section className="bg-mist py-20 md:py-24" aria-labelledby="trabajos-titulo">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow mb-4 inline-flex items-center gap-2"><span className="h-px w-5 bg-brand" aria-hidden="true"></span>Obra hecha</span>
                <h2 id="trabajos-titulo" className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
                  Cinco trabajos, foto a foto
                </h2>
              </div>
              <dl className="grid grid-cols-3 overflow-hidden rounded-xl border border-line bg-white text-center shadow-card" aria-hidden="true">
                <div className="px-5 py-3"><dt className="font-mono text-[10.5px] text-muted">Trabajos</dt><dd className="tnum text-[1.4rem] font-semibold">{TRABAJOS.length}</dd></div>
                <div className="border-l border-line px-5 py-3"><dt className="font-mono text-[10.5px] text-muted">Fotos</dt><dd className="tnum text-[1.4rem] font-semibold">{N_FOTOS}</dd></div>
                <div className="border-l border-line px-5 py-3"><dt className="font-mono text-[10.5px] text-muted">Localidades</dt><dd className="tnum text-[1.4rem] font-semibold">{LUGARES.length}</dd></div>
              </dl>
            </div>

            {/* Filtro: oculta con CSS, las cinco fichas siguen en el HTML */}
            <div className="sticky top-16 z-20 -mx-5 mb-6 border-b border-line bg-mist/90 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-white/90 sm:px-3">
              <div className="flex gap-1.5 overflow-x-auto">
                {CATS.map((c) => {
                  const n = c === 'Todos' ? TRABAJOS.length : TRABAJOS.filter((t) => t.cat === c).length;
                  const on = cat === c;
                  return (
                    <button key={c} type="button" aria-pressed={on} onClick={() => setCat(c)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors ${on ? 'bg-ink text-white' : 'text-ink-3 hover:bg-mist'}`}>
                      {c}
                      <span className={`tnum rounded px-1.5 font-mono text-[10.5px] ${on ? 'bg-white/15 text-white' : 'bg-mist text-muted'}`}>{n}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {TRABAJOS.map((t) => {
                const dos = t.fotos.length === 2;
                const sizes = dos
                  ? '(min-width: 1024px) 520px, (min-width: 640px) 46vw, calc(100vw - 4rem)'
                  : '(min-width: 1024px) 340px, (min-width: 640px) 46vw, calc(100vw - 4rem)';
                return (
                  <article
                    key={t.id}
                    id={t.id}
                    className={`scroll-mt-32 overflow-hidden rounded-xl border border-line bg-white shadow-card ${cat !== 'Todos' && t.cat !== cat ? 'hidden' : ''}`}
                  >
                    <header className="flex flex-col gap-3 border-b border-line px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[12.5px] text-ink-3">
                          {t.n}
                        </span>
                        <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-[1.35rem]">{t.titulo}</h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 self-start rounded-md bg-mist px-2.5 py-1 md:self-auto">
                        <span className="material-symbols-outlined text-[16px] text-brand">location_on</span>
                        <span className="whitespace-nowrap font-mono text-[11.5px] text-ink-3">{t.lugar}</span>
                      </div>
                    </header>

                    <div className="p-6 md:p-8">
                      <p className="mb-6 max-w-3xl text-[15.5px] leading-relaxed text-ink-3">{t.texto}</p>

                      {/* items-center: las fotos conservan su proporción real (van de 9:16
                          a 16:9), así que la que es más baja se centra contra sus vecinas
                          en vez de dejar el hueco entero debajo. */}
                      <div className={`grid grid-cols-2 items-center gap-2.5 md:gap-4 ${dos ? '' : 'lg:grid-cols-3'}`}>
                        {t.fotos.map((f) => <FotoTile key={f.base} f={f} sizes={sizes} />)}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ CTA CIERRE ═══ */}
        <section className="relative overflow-hidden bg-ink py-20 text-white md:py-24">
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem]">
              ¿Tienes una instalación parecida?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-slate-300">
              Cuéntanos qué cocina tienes y qué le pasa a tu sistema de extracción. Vemos la instalación
              y te decimos qué necesita.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTALlamar sub="Presupuesto sin compromiso" />
              <CTAWhatsapp />
            </div>
            <p className="mt-10 text-[14px] text-slate-400">
              ¿Buscas el servicio en detalle?{' '}
              <Link to="/limpieza-conductos-extraccion-alicante" className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                Limpieza de conductos de extracción en Alicante
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />
      <WhatsAppFab href={WHATSAPP} />
    </div>
  );
};

export default TrabajosRealizados;
