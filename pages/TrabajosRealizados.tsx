
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

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

const Orb: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} aria-hidden="true" />
);

const CTALlamar: React.FC<{ sub: string }> = ({ sub }) => (
  <a
    href="tel:+34622064101"
    className="group relative flex h-20 md:h-24 w-full max-w-xl items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-blue-600 px-8 md:px-12 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(26,26,255,0.5)] mx-auto"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" aria-hidden="true"></span>
    <span className="material-symbols-outlined text-white font-bold text-3xl md:text-4xl relative z-10">call</span>
    <div className="flex flex-col items-start relative z-10">
      <span className="text-lg md:text-2xl font-black tracking-wide text-white uppercase leading-none">Llamar: 622 064 101</span>
      <span className="text-[10px] md:text-[11px] font-bold text-white/80 uppercase mt-1.5 tracking-widest">{sub}</span>
    </div>
  </a>
);

const CTAWhatsapp: React.FC = () => (
  <a
    href={WHATSAPP}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105 hover:shadow-green-500/50 active:scale-95"
  >
    <span className="material-symbols-outlined">chat</span>
    WhatsApp
  </a>
);

const FotoTile: React.FC<{ f: Foto; sizes: string }> = ({ f, sizes }) => (
  <figure
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-lg shadow-black/30"
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
      <figcaption className="absolute top-3 left-3 rounded-full border border-white/25 bg-slate-950/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
        {f.etiqueta}
      </figcaption>
    )}
  </figure>
);

const TrabajosRealizados: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar
        onToggleDarkMode={() => document.documentElement.classList.toggle('dark')}
        isDarkMode={false}
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateCalculadora={() => { window.location.href = '/calculadora'; }}
        onNavigateContacto={() => { window.location.href = '/contacto'; }}
        onNavigateServices={() => { window.location.href = '/#servicios'; }}
        currentView="home"
      />

      <main className="flex-1">
        {/* ═══ PORTADA ═══ */}
        <section className="relative flex min-h-[80svh] w-full flex-col justify-center overflow-hidden bg-slate-950">
          <picture className="absolute inset-0 z-0 block h-full w-full">
            <source type="image/webp" srcSet={srcSet(PORTADA, 'webp')} sizes="100vw" />
            <img
              src={`${PORTADA.base}-800.jpg`}
              srcSet={srcSet(PORTADA, 'jpg')}
              sizes="100vw"
              alt={PORTADA.alt}
              className="h-full w-full object-cover object-center"
              width="1600"
              height="1200"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          {/* El degradado tiene que dejar ver la chimenea: una portada que no se
              ve no ilustra nada. El contraste del H1 se mide sobre esta capa. */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950" aria-hidden="true"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" aria-hidden="true"></div>
          <Orb className="bg-primary/30 w-[600px] h-[600px] -top-40 -left-40" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 md:pt-48 md:pb-28">
            <nav aria-label="Migas de pan" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li aria-hidden="true" className="text-slate-600">/</li>
                <li className="text-white">Trabajos realizados</li>
              </ol>
            </nav>

            <h1 className="mb-8 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Trabajos realizados en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-300">Alicante</span>
              {' '}y provincia
            </h1>

            <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
              Cinco intervenciones de Afondo con las fotografías de cada una: limpieza de turbinas,
              reparación de conductos, instalaciones en falso techo y en cubierta, y mantenimiento
              periódico de chimenea. Cada ficha cuenta qué se hizo y dónde.
            </p>

            <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a
                href="tel:+34622064101"
                className="inline-flex items-center gap-3 rounded-xl bg-primary hover:bg-primary-dark px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary/30 transition-all"
              >
                <span className="material-symbols-outlined">call</span>
                622 064 101
              </a>
              <CTAWhatsapp />
            </div>
          </div>
        </section>

        {/* ═══ LAS CINCO FICHAS ═══ */}
        <section className="relative overflow-hidden bg-slate-950 py-24" aria-labelledby="trabajos-titulo">
          <Orb className="bg-primary/15 w-[700px] h-[700px] top-1/3 -right-60" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-16 max-w-3xl">
              <span className="text-primary font-black text-[11px] tracking-[0.35em] uppercase mb-4 block">Obra hecha</span>
              <h2 id="trabajos-titulo" className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                Cinco trabajos, foto a foto
              </h2>
            </div>

            <div className="space-y-8 md:space-y-10">
              {TRABAJOS.map((t) => {
                const dos = t.fotos.length === 2;
                const sizes = dos
                  ? '(min-width: 1024px) 540px, (min-width: 640px) 46vw, calc(100vw - 4rem)'
                  : '(min-width: 1024px) 360px, (min-width: 640px) 46vw, calc(100vw - 4rem)';
                return (
                  <article
                    key={t.id}
                    id={t.id}
                    className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-primary/40 via-white/5 to-transparent"
                  >
                    <div className="rounded-[calc(2rem-1px)] bg-slate-900/80 backdrop-blur-xl p-6 md:p-10">
                      <header className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8 mb-6">
                        <span className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-cyan-400 to-blue-500">
                          {t.n}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-white text-2xl md:text-3xl font-black leading-tight mb-4">{t.titulo}</h3>
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                            <span className="material-symbols-outlined text-primary text-base">location_on</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{t.lugar}</span>
                          </div>
                        </div>
                      </header>

                      <p className="mb-8 max-w-4xl text-base md:text-lg leading-relaxed text-slate-300">{t.texto}</p>

                      {/* items-center: las fotos conservan su proporción real (van de 9:16
                          a 16:9), así que la que es más baja se centra contra sus vecinas
                          en vez de dejar el hueco entero debajo. */}
                      <div className={`grid items-center gap-4 md:gap-5 ${dos ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
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
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-slate-900 border-y border-primary/50 py-24">
          <Orb className="bg-cyan-400/20 w-[500px] h-[500px] top-0 -right-40" />
          <Orb className="bg-white/10 w-[400px] h-[400px] bottom-0 -left-20" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              ¿Tienes una instalación parecida?
            </h2>
            <p className="text-white/90 leading-relaxed max-w-2xl mx-auto mb-10 text-base md:text-lg">
              Cuéntanos qué cocina tienes y qué le pasa a tu sistema de extracción. Vemos la instalación
              y te decimos qué necesita.
            </p>
            <div className="flex flex-col items-center gap-5">
              <CTALlamar sub="Presupuesto sin compromiso" />
              <CTAWhatsapp />
            </div>
            <p className="mt-10 text-sm text-white/70">
              ¿Buscas el servicio en detalle?{' '}
              <Link to="/limpieza-conductos-extraccion-alicante" className="font-bold text-white underline hover:text-cyan-200 transition-colors">
                Limpieza de conductos de extracción en Alicante
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.5)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:rotate-12 transition-transform">chat</span>
      </a>
    </div>
  );
};

export default TrabajosRealizados;
