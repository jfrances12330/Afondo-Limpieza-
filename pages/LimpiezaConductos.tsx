
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CIUDADES } from '../data/cobertura';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

/**
 * Página Tanda 2: /limpieza-conductos-extraccion-alicante
 * Tanda 2.1: fix visual — reutiliza patrones de la home (Hero, secciones, cards, tags).
 * Copy LITERAL del entregable v2.1 del ejecutor (correcciones de auditoría ya aplicadas).
 * Reglas: cero cambios de copy/H1-H3/head/enlaces. Solo presentación.
 * Cero huecos en producción: los TODO Jaime van en comentarios de código, no en el texto visible.
 */

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
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{it.q}</span>
              <span className={`material-symbols-outlined text-primary text-2xl transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// CTA botón grande, mismo tratamiento que el Hero de la home (rounded-[2rem], sombra fuerte al hover)
const CTAPrimary: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => (
  <a
    href="tel:+34622064101"
    className="group relative flex h-20 md:h-24 w-full max-w-xl items-center justify-center gap-4 overflow-hidden rounded-[2rem] bg-primary px-10 transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_25px_50px_rgba(26,26,255,0.45)] hover:-translate-y-1 mx-auto"
  >
    <span className="material-symbols-outlined text-white font-bold text-3xl md:text-4xl">call</span>
    <div className="flex flex-col items-start">
      <span className="text-xl md:text-2xl font-black tracking-wide text-white uppercase leading-none">{text}</span>
      {sub && <span className="text-[10px] md:text-[11px] font-bold text-white/70 uppercase mt-1.5 italic">{sub}</span>}
    </div>
  </a>
);

const CTASecondary: React.FC = () => (
  <a
    href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
  >
    <span className="material-symbols-outlined">chat</span>
    WhatsApp
  </a>
);

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
        // "home" hace que el nav sea absolute y transparente encima del hero oscuro (mismo patrón que la home).
        currentView="home"
      />

      <main className="flex-1">
        {/* HERO — mismo patrón visual que Hero de la home (fondo oscuro con overlay, badge, H1 grande, subtítulo, CTA gigante). */}
        <section className="relative flex min-h-[85svh] w-full flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-slate-950">
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuBMJSp4bqbkiqdVdN-PE_YlaJHONjVHgCTgeIXkj1gDryN2gS3yVKhMWd8rQ-wKLVQ4xYbfqvVfZa34T4DjHfyMCn2vV8GvNtQSKLXYyPx7EmA8Oy2Hg9n6d1DBEyS2TwgIdhDjtimS7341ch-8c49zOmtcjuaf5Qz5j9iOUJgyuzUNg1njEOzUR_eAtzJgF9T0pMlKdwXtuFatTM2zml4jJIIMhl3OnRe4mA0RjVHuZY7a4Dz9dI8qggimQ8jintFWvzpKCEgcAzM\")",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900/95" aria-hidden="true"></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl px-6 lg:px-12 pt-32 pb-32 md:pt-40 md:pb-40 flex flex-col items-center text-center">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-5 py-2 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Servicio · Alicante y provincia</span>
            </div>

            <h1 className="mb-6 md:mb-8 max-w-5xl text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Limpieza de conductos de extracción en Alicante: desengrase interior de tramos verticales y horizontales
            </h1>

            <p className="mb-8 md:mb-10 max-w-3xl text-base font-medium leading-relaxed text-slate-200/90 sm:text-lg lg:text-xl">
              La grasa que no ves es la que quema. En Afondo realizamos la limpieza de conductos de extracción de humos en cocinas industriales de Alicante y provincia: abrimos registros de inspección, desengrasamos el interior del conducto en toda su longitud —tramos verticales y horizontales— y lo documentamos con un informe técnico con fotografías del antes y el después, siguiendo criterios de la norma UNE 100165 y del CTE.
            </p>

            <p className="mb-10 max-w-3xl text-sm md:text-base text-slate-300/90 leading-relaxed">
              Soy Jaime Gascón López, técnico especialista en limpieza y desengrase de sistemas de extracción, autónomo con seguro de responsabilidad civil en vigor. Si tienes un restaurante, bar, hotel o cocina colectiva en la provincia de Alicante, llámame al <strong className="text-white">622 064 101</strong> y te digo qué necesita tu instalación.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-6">
              <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto sin compromiso" />
              <CTASecondary />
            </div>
          </div>
        </section>

        {/* Qué son los conductos */}
        <section className="bg-white dark:bg-slate-900 py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Contexto técnico</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Qué son los conductos de extracción y por qué acumulan grasa
              </h2>
            </div>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              <p>
                El conducto de extracción es la tubería que conecta la campana de tu cocina con la salida de humos al exterior. Cada servicio de cocina arrastra vapores cargados de grasa que los filtros no retienen al 100%: una parte atraviesa la campana y se va condensando en las paredes interiores del conducto, capa sobre capa, día tras día.
              </p>
              <p>
                El problema es que esa grasa no se ve. La campana puede estar reluciente por fuera mientras el conducto acumula milímetros de grasa carbonizable en su interior, especialmente en los tramos verticales (donde la grasa escurre y se concentra) y en los codos y tramos horizontales (donde se deposita por gravedad). Limpiar solo la campana y los filtros es limpiar la puerta de casa y dejar el incendio dentro.
              </p>
            </div>

            <div className="mt-16 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 p-8 md:p-10 border border-slate-100 dark:border-slate-800">
              <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-black leading-tight mb-4">
                Señales de que tu conducto necesita una limpieza interior
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Goteo de grasa por juntas del conducto o por la campana, olor a grasa quemada al encender el extractor, pérdida de tiro (el humo vuelve a la cocina), ruido o vibración anormal del extractor, y manchas de grasa en la salida de humos de cubierta. Si tu último desengrase interior de conducto no está documentado con fecha y fotos, asume que está pendiente.
              </p>
            </div>
          </div>
        </section>

        {/* El riesgo real: efecto chimenea */}
        <section className="bg-slate-50 dark:bg-slate-950 py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mb-4">Por qué importa</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                El riesgo real: efecto chimenea e incendio en el conducto
              </h2>
            </div>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              <p>
                Cuando una llama o una temperatura alta alcanza la grasa acumulada en el arranque del conducto, esa grasa prende. Y un conducto vertical cargado de grasa se comporta exactamente como una chimenea: el propio tiro del sistema alimenta el fuego con oxígeno y lo propaga hacia arriba a gran velocidad, atravesando plantas, falsos techos y cubiertas. Es el llamado efecto chimenea, y es la razón por la que un incendio de conducto es tan destructivo y tan difícil de extinguir: el fuego avanza por el interior de una tubería inaccesible.
              </p>
              <p>
                A esto se suma la parte legal y aseguradora: el Código Técnico de la Edificación (CTE DB-SI y DB-HS3) y el Reglamento (CE) 852/2004 de higiene alimentaria exigen que las instalaciones de extracción se mantengan en condiciones adecuadas. Tras un siniestro, la aseguradora suele revisar si puedes acreditar el mantenimiento del sistema de extracción. Sin informe técnico documentado, la cobertura puede quedar comprometida.
              </p>
            </div>
          </div>
        </section>

        {/* Método (5 pasos) — patrón "cards con hover -translate-y" de la home */}
        <section className="bg-white dark:bg-slate-900 py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Nuestro método</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Cómo hacemos la limpieza de conductos: nuestro método
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                No metemos una máquina 20 minutos y nos vamos. Trabajamos el interior del conducto tramo a tramo:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { n: '1', h: 'Inspección inicial del sistema', t: 'Recorremos toda la instalación —campana, cajón, conducto y extractor— y evaluamos el nivel de acumulación de grasa, los accesos existentes y los puntos ciegos. Documentamos el estado inicial con fotografías.' },
                { n: '2', h: 'Apertura de registros y ventanas de inspección', t: 'Si el conducto no dispone de registros suficientes para acceder a todos los tramos, abrimos ventanas de inspección en los puntos necesarios. Sin acceso real al interior no hay limpieza real: es la diferencia entre desengrasar un conducto y limpiarlo solo por la boca.' },
                { n: '3', h: 'Desengrase mecánico y químico del interior', t: 'Combinamos acción mecánica (rascado y cepillado del interior del conducto) con productos desengrasantes específicos para grasa carbonizada de cocina, actuando en tramos verticales, horizontales, codos y uniones hasta recuperar la superficie del conducto.' },
                { n: '4', h: 'Sellado de registros', t: 'Cerramos y sellamos todos los registros y ventanas de inspección abiertos, dejando el conducto estanco y con accesos practicables para futuros mantenimientos.' },
                { n: '5', h: 'Verificación e informe técnico', t: 'Comprobamos el resultado, fotografiamos el después en los mismos puntos que el antes, y te entregamos el informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE.' },
              ].map((s) => (
                <div key={s.n} className="group relative flex flex-col gap-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 p-8 md:p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-black">{s.n}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-white text-xl font-black leading-tight">{s.h}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">{s.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elementos que tratamos */}
        <section className="bg-slate-50 dark:bg-slate-950 py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Alcance del servicio</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Qué elementos del sistema de extracción tratamos
              </h2>
            </div>

            <ul className="space-y-4 text-slate-600 dark:text-slate-300 text-base md:text-lg mb-10">
              {[
                <><strong className="text-slate-900 dark:text-white">Tramos verticales de conducto</strong>, incluidos patinillos y montantes hasta cubierta.</>,
                <><strong className="text-slate-900 dark:text-white">Tramos horizontales, codos y derivaciones</strong>, donde más grasa se deposita.</>,
                <><strong className="text-slate-900 dark:text-white">Campana extractora</strong> por su cara interior (plénum) como arranque del sistema. (Ver <Link to="/" className="text-primary hover:underline font-semibold">limpieza de campanas industriales en Alicante</Link>.)</>,
                <><strong className="text-slate-900 dark:text-white">Cajón de ventilación y extractor</strong> (turbina, rodete y carcasa).</>,
                <><strong className="text-slate-900 dark:text-white">Salida de humos en cubierta</strong> y su entorno inmediato.</>,
              ].map((li, i) => (
                <li key={i} className="flex gap-4 items-start bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0">check_circle</span>
                  <span className="leading-relaxed">{li}</span>
                </li>
              ))}
            </ul>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Cada instalación es distinta: hay conductos de 3 metros y conductos que atraviesan 6 plantas. Por eso el presupuesto se hace siempre tras ver la instalación o con fotos y datos concretos.
              {/* TODO Jaime: si nos pasa criterios orientativos de presupuesto, añadir aquí (1-2 frases). */}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 italic">
              {/* TODO tanda 3-5: activar enlace hacia /instalacion-campanas-extractoras-alicante con anchor "instalación de campanas extractoras". */}
              Si tu sistema es deficiente y necesita renovación, valoramos también instalación de campanas extractoras (próximamente en web).
            </p>
          </div>
        </section>

        {/* Dónde trabajamos — mismo patrón de tags que LocationSection de la home */}
        <section className="bg-white dark:bg-slate-900 py-24 md:py-32" id="cobertura">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Cobertura</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Dónde trabajamos: limpieza de conductos en toda la provincia de Alicante
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                Damos servicio en <strong>{CIUDADES.map((c) => c.name).join(', ')}</strong>, y en general en toda la <strong>provincia de Alicante</strong>. Nuestra base está en San Vicente del Raspeig, lo que nos permite responder con agilidad en el área de Alicante ciudad y desplazarnos a cualquier punto de la provincia.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
              {CIUDADES.map((c) => (
                <div key={c.name} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl flex items-center justify-center gap-2 hover:border-primary/50 transition-colors group">
                  <span className="material-symbols-outlined text-primary text-sm group-hover:scale-125 transition-transform">location_on</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.name}</span>
                </div>
              ))}
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-center gap-2 col-span-2 md:col-span-1">
                <span className="text-xs font-black text-primary uppercase">Toda la Provincia</span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-center text-base">
              ¿Tu población no está en la lista? Llámanos igualmente al <strong className="text-slate-900 dark:text-white">622 064 101</strong> y lo vemos.
            </p>
          </div>
        </section>

        {/* Plan anual */}
        <section className="bg-primary/5 dark:bg-primary/10 py-24 md:py-32 border-y border-primary/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Mantenimiento</span>
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              Plan anual de mantenimiento de conductos
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6 text-base md:text-lg">
              La grasa no espera: en una cocina con actividad diaria, el conducto vuelve a cargarse en cuestión de meses. Por eso ofrecemos un plan anual de mantenimiento con revisiones e intervenciones programadas según el uso real de tu cocina, para que tu sistema esté siempre en condiciones defendibles ante sanidad, aseguradora e inspecciones.
              {/* TODO Jaime: periodicidades ofrecidas (p. ej. trimestral/semestral/anual) y condiciones. */}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic mb-10">
              {/* TODO tanda 3-5: activar enlace hacia /servicio-tecnico-campanas-extraccion-alicante con anchor "servicio técnico de campanas de extracción". */}
              El plan puede incluir intervenciones puntuales de servicio técnico (próximamente en web).
            </p>
            <p className="text-slate-700 dark:text-slate-200 font-bold mb-8">Pide tu plan de mantenimiento — 622 064 101 (llamada o WhatsApp).</p>
            <div className="flex flex-col items-center gap-6">
              <CTAPrimary text="Llamar: 622 064 101" sub="Plan de mantenimiento" />
              <CTASecondary />
            </div>
          </div>
        </section>

        {/* Informe técnico */}
        <section className="bg-white dark:bg-slate-900 py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Entregable</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Informe técnico de limpieza: tu prueba documental
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              Al terminar cada intervención entregamos un <strong>informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE</strong>, con fotografías del antes y el después de cada tramo tratado, fecha, alcance de la intervención y datos del técnico. Es el documento que te pedirán tu aseguradora, sanidad o el propietario del local. Guárdalo con tu documentación del negocio: es tu prueba de diligencia.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 italic">
              {/* TODO tanda 3: activar enlace hacia /certificado-limpieza-campanas-alicante con anchor "certificado técnico de limpieza". */}
              Más información sobre el certificado técnico de limpieza (próximamente en web).
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 dark:bg-slate-950 py-24 md:py-32" id="faq">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">Preguntas frecuentes</span>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Preguntas frecuentes sobre limpieza de conductos de extracción
              </h2>
            </div>
            <Faq />
          </div>
        </section>

        {/* CTA cierre — bloque oscuro coherente con hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-24 md:py-32 px-6 lg:px-12">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 to-slate-950" aria-hidden="true"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Pide presupuesto</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Pide presupuesto sin compromiso</h2>
            <p className="text-slate-300 leading-relaxed mb-10 text-base md:text-lg">
              Cuéntanos qué instalación tienes (tipo de cocina, metros aproximados de conducto, plantas que atraviesa) y te damos presupuesto ajustado.
            </p>
            <div className="flex flex-col items-center gap-6 mb-10">
              <CTAPrimary text="Llamar: 622 064 101" sub="Presupuesto ajustado" />
              <CTASecondary />
            </div>
            <p className="text-slate-400 text-sm mt-8">
              📞 622 064 101 · 💬 WhatsApp: 622 064 101 · ✉️ <a href="mailto:hola@afondolimpiezadecampanas.com" className="text-white hover:underline">hola@afondolimpiezadecampanas.com</a>
              <br />
              <span className="text-xs text-slate-500">Afondo · Partida Canastell E-17, 03690 San Vicente del Raspeig (Alicante)</span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />

      {/* WhatsApp flotante — mismo estilo que la home. Bottom con margen extra para no tapar CTA del pie en móvil. */}
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
