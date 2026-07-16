
import React, { useState, useRef, useCallback, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { CIUDADES } from '../data/cobertura';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

/**
 * Tanda 2.4 · rediseño con personalidad (menos IA-look, menos dark).
 * Copy, H1-H3, head, JSON-LD, enlaces: INTACTOS.
 * Mix real de secciones light/dark. Gradients solo puntuales. Layouts asimétricos.
 * Personalidad de autónomo local técnico (Jaime), no de startup.
 */

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJSp4bqbkiqdVdN-PE_YlaJHONjVHgCTgeIXkj1gDryN2gS3yVKhMWd8rQ-wKLVQ4xYbfqvVfZa34T4DjHfyMCn2vV8GvNtQSKLXYyPx7EmA8Oy2Hg9n6d1DBEyS2TwgIdhDjtimS7341ch-8c49zOmtcjuaf5Qz5j9iOUJgyuzUNg1njEOzUR_eAtzJgF9T0pMlKdwXtuFatTM2zml4jJIIMhl3OnRe4mA0RjVHuZY7a4Dz9dI8qggimQ8jintFWvzpKCEgcAzM";

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
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-3">
      {FAQ_ITEMS.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`border-b last:border-b-0 transition-colors ${isOpen ? 'border-slate-300' : 'border-slate-200'}`}>
            <button type="button" className="w-full flex items-baseline justify-between gap-6 py-6 text-left group" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="text-base md:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{it.q}</span>
              <span className={`shrink-0 font-black text-primary text-2xl leading-none transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pb-6 text-slate-600 leading-relaxed max-w-2xl">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── CTA principal (magnético) ─────────────────────────────────────────────
const CTAPhone: React.FC<{ theme?: 'dark' | 'light' | 'white'; sub?: string }> = ({ theme = 'dark', sub = 'Presupuesto sin compromiso' }) => {
  const btn = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.current.style.transform = `translate(${x * 0.05}px, ${y * 0.1}px)`;
  }, []);
  const reset = useCallback(() => { if (btn.current) btn.current.style.transform = 'translate(0,0)'; }, []);
  const cls = theme === 'white'
    ? 'bg-white text-primary hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)]'
    : 'bg-primary text-white hover:shadow-[0_20px_50px_rgba(26,26,255,0.4)]';
  const subCls = theme === 'white' ? 'text-primary/70' : 'text-white/70';
  return (
    <a
      ref={btn}
      onMouseMove={onMove}
      onMouseLeave={reset}
      href="tel:+34622064101"
      className={`group inline-flex items-center gap-4 rounded-full px-8 md:px-10 py-5 md:py-6 font-black text-lg md:text-xl transition-all duration-300 ${cls}`}
    >
      <span className="material-symbols-outlined text-2xl md:text-3xl">call</span>
      <div className="flex flex-col items-start">
        <span className="tracking-wide uppercase leading-none">622 064 101</span>
        <span className={`text-[10px] md:text-[11px] font-bold ${subCls} uppercase mt-1 tracking-widest`}>{sub}</span>
      </div>
    </a>
  );
};

const CTAWhatsapp: React.FC = () => (
  <a
    href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
  >
    <span className="material-symbols-outlined text-xl">chat</span>
    <span className="underline decoration-2 underline-offset-4">o escríbeme por WhatsApp</span>
  </a>
);

// ─── Página ─────────────────────────────────────────────────────────────────
const LimpiezaConductos: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
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
        {/* ═══ HERO — dark (temáticamente coherente: la grasa, el peligro invisible) ═══ */}
        <section className="relative w-full overflow-hidden bg-slate-950 text-white">
          {/* Foto de fondo con overlay lateral que deja ver la textura de tubos */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/30" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" aria-hidden="true"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-32 md:pt-44 md:pb-40 grid md:grid-cols-12 gap-8 items-center">
            {/* Bloque de texto — alineado a la izquierda (asimétrico, no centrado) */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/15 rounded-full px-4 py-1.5 backdrop-blur-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/90">Alicante · Provincia · Urgencias 24 h</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-8 max-w-3xl">
                Limpieza de conductos de extracción en{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Alicante</span>
                  <span className="absolute inset-x-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-primary/70 -z-0 skew-x-[-8deg]" aria-hidden="true"></span>
                </span>
                : desengrase interior de tramos verticales y horizontales
              </h1>

              <p className="text-base md:text-lg leading-relaxed text-slate-200 max-w-2xl mb-8">
                <span className="font-black text-orange-400">La grasa que no ves es la que quema.</span> En Afondo realizamos la limpieza de conductos de extracción de humos en cocinas industriales de Alicante y provincia: abrimos registros de inspección, desengrasamos el interior del conducto en toda su longitud —tramos verticales y horizontales— y lo documentamos con un informe técnico con fotografías del antes y el después, siguiendo criterios de la norma UNE 100165 y del CTE.
              </p>

              <p className="text-sm md:text-base text-slate-300 max-w-2xl mb-10 leading-relaxed">
                Soy <span className="text-white font-bold">Jaime Gascón López</span>, técnico especialista en limpieza y desengrase de sistemas de extracción, autónomo con seguro de responsabilidad civil en vigor. Si tienes un restaurante, bar, hotel o cocina colectiva en la provincia de Alicante, llámame al <span className="text-white font-bold">622 064 101</span> y te digo qué necesita tu instalación.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <CTAPhone />
                <CTAWhatsapp />
              </div>
            </div>

            {/* Tarjeta lateral: "ficha" del técnico (asimétrico, humano) */}
            <div className="md:col-span-5 md:pl-8">
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="absolute -top-3 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">Ficha del servicio</div>
                <dl className="space-y-4 mt-3">
                  {[
                    { k: 'Servicio', v: 'Limpieza interior de conductos de extracción de humos' },
                    { k: 'Ámbito', v: 'Cocinas industriales · hostelería · colectividades' },
                    { k: 'Alcance', v: 'Verticales + horizontales + codos + campana + extractor + cubierta' },
                    { k: 'Entregable', v: 'Informe técnico con fotos antes/después según UNE 100165 y CTE' },
                    { k: 'Zona', v: 'Provincia de Alicante · base en San Vicente del Raspeig' },
                  ].map((r) => (
                    <div key={r.k} className="flex gap-4">
                      <dt className="shrink-0 w-24 text-[10px] font-black uppercase tracking-[0.15em] text-primary/80 pt-0.5">{r.k}</dt>
                      <dd className="text-sm text-white leading-relaxed">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Qué son los conductos — LIGHT, asimétrico ═══ */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="md:sticky md:top-24">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/10">
                <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 mb-1.5">La zona invisible</div>
                  <p className="text-white text-sm font-medium leading-snug">Interior de un conducto vertical con grasa acumulada — la parte que no ves y donde empieza el incendio.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">01 · Contexto técnico</div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-6">Qué son los conductos de extracción y por qué acumulan grasa</h2>

              <div className="space-y-5 text-slate-700 text-base md:text-lg leading-relaxed">
                <p>El conducto de extracción es la tubería que conecta la campana de tu cocina con la salida de humos al exterior. Cada servicio de cocina arrastra vapores cargados de grasa que los filtros no retienen al 100%: una parte atraviesa la campana y se va condensando en las paredes interiores del conducto, capa sobre capa, día tras día.</p>
                <p>El problema es que esa grasa no se ve. La campana puede estar reluciente por fuera mientras el conducto acumula milímetros de grasa carbonizable en su interior, especialmente en los tramos verticales (donde la grasa escurre y se concentra) y en los codos y tramos horizontales (donde se deposita por gravedad). <strong className="text-slate-900">Limpiar solo la campana y los filtros es limpiar la puerta de casa y dejar el incendio dentro.</strong></p>
              </div>

              <div className="mt-10 border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-orange-600 text-xl">warning</span>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700">Señales de aviso</div>
                </div>
                <h3 className="text-slate-900 text-lg font-black mb-3">Señales de que tu conducto necesita una limpieza interior</h3>
                <p className="text-slate-700 leading-relaxed">Goteo de grasa por juntas del conducto o por la campana, olor a grasa quemada al encender el extractor, pérdida de tiro (el humo vuelve a la cocina), ruido o vibración anormal del extractor, y manchas de grasa en la salida de humos de cubierta. Si tu último desengrase interior de conducto no está documentado con fecha y fotos, asume que está pendiente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Riesgo real — DARK acento naranja (peligro coherente) ═══ */}
        <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" aria-hidden="true"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-3">02 · Por qué importa</div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-8 max-w-3xl">El riesgo real: efecto chimenea e incendio en el conducto</h2>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-5 text-slate-300 leading-relaxed text-base md:text-lg">
                <p>Cuando una llama o una temperatura alta alcanza la grasa acumulada en el arranque del conducto, esa grasa prende. Y un conducto vertical cargado de grasa se comporta exactamente como una chimenea: el propio tiro del sistema alimenta el fuego con oxígeno y lo propaga hacia arriba a gran velocidad, atravesando plantas, falsos techos y cubiertas. Es el llamado <span className="text-orange-300 font-bold">efecto chimenea</span>, y es la razón por la que un incendio de conducto es tan destructivo y tan difícil de extinguir: el fuego avanza por el interior de una tubería inaccesible.</p>
                <p>A esto se suma la parte legal y aseguradora: el Código Técnico de la Edificación (CTE DB-SI y DB-HS3) y el Reglamento (CE) 852/2004 de higiene alimentaria exigen que las instalaciones de extracción se mantengan en condiciones adecuadas. Tras un siniestro, la aseguradora suele revisar si puedes acreditar el mantenimiento del sistema de extracción. <span className="text-orange-300 font-bold">Sin informe técnico documentado, la cobertura puede quedar comprometida.</span></p>
              </div>

              <aside className="md:col-span-2">
                <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-5 md:p-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-4">Normativa citada</div>
                  <ul className="space-y-3">
                    {[
                      ['UNE 100165', 'Extracción de humos en cocinas'],
                      ['CTE DB-SI', 'Seguridad en caso de incendio'],
                      ['CTE DB-HS3', 'Calidad del aire interior'],
                      ['Reg. (CE) 852/2004', 'Higiene productos alimenticios'],
                    ].map(([code, desc]) => (
                      <li key={code} className="flex flex-col">
                        <span className="text-white font-black text-sm">{code}</span>
                        <span className="text-slate-400 text-xs">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ═══ Método — LIGHT, con quote del técnico ═══ */}
        <section className="relative bg-slate-50 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16">
              <div className="md:col-span-5">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">03 · Nuestro método</div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-6">Cómo hacemos la limpieza de conductos: nuestro método</h2>
              </div>

              <blockquote className="md:col-span-7 relative">
                <span className="absolute -top-4 -left-2 text-6xl md:text-7xl leading-none text-primary/20 font-black" aria-hidden="true">"</span>
                <p className="relative text-xl md:text-2xl font-medium text-slate-800 leading-snug">No metemos una máquina 20 minutos y nos vamos. Trabajamos el interior del conducto tramo a tramo.</p>
                <footer className="mt-4 text-sm text-slate-500 font-bold flex items-center gap-2">
                  <span className="w-8 h-px bg-slate-400"></span>
                  Jaime Gascón, técnico
                </footer>
              </blockquote>
            </div>

            {/* 5 pasos — layout limpio en 2 columnas con líneas separadoras */}
            <ol className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-5xl mx-auto">
              {[
                { n: '01', h: 'Inspección inicial del sistema', t: 'Recorremos toda la instalación —campana, cajón, conducto y extractor— y evaluamos el nivel de acumulación de grasa, los accesos existentes y los puntos ciegos. Documentamos el estado inicial con fotografías.' },
                { n: '02', h: 'Apertura de registros y ventanas de inspección', t: 'Si el conducto no dispone de registros suficientes para acceder a todos los tramos, abrimos ventanas de inspección en los puntos necesarios. Sin acceso real al interior no hay limpieza real: es la diferencia entre desengrasar un conducto y limpiarlo solo por la boca.' },
                { n: '03', h: 'Desengrase mecánico y químico del interior', t: 'Combinamos acción mecánica (rascado y cepillado del interior del conducto) con productos desengrasantes específicos para grasa carbonizada de cocina, actuando en tramos verticales, horizontales, codos y uniones hasta recuperar la superficie del conducto.' },
                { n: '04', h: 'Sellado de registros', t: 'Cerramos y sellamos todos los registros y ventanas de inspección abiertos, dejando el conducto estanco y con accesos practicables para futuros mantenimientos.' },
                { n: '05', h: 'Verificación e informe técnico', t: 'Comprobamos el resultado, fotografiamos el después en los mismos puntos que el antes, y te entregamos el informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE.' },
              ].map((s) => (
                <li key={s.n} className="group flex gap-5 py-6 border-t border-slate-200 last:border-b-0 md:[&:nth-child(-n+2)]:border-t md:[&:nth-child(n+3)]:border-t">
                  <span className="shrink-0 text-3xl font-black text-primary tabular-nums leading-none pt-1">{s.n}</span>
                  <div>
                    <h3 className="text-slate-900 text-lg font-black mb-2 leading-tight">{s.h}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{s.t}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ Elementos ═══ LIGHT con lista tipo checklist técnico */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">04 · Alcance del servicio</div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-10 max-w-3xl">Qué elementos del sistema de extracción tratamos</h2>

            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {[
                { s: <><strong className="text-slate-900">Tramos verticales de conducto</strong>, incluidos patinillos y montantes hasta cubierta.</>, i: 'arrow_upward' },
                { s: <><strong className="text-slate-900">Tramos horizontales, codos y derivaciones</strong>, donde más grasa se deposita.</>, i: 'turn_right' },
                { s: <><strong className="text-slate-900">Campana extractora</strong> por su cara interior (plénum) como arranque del sistema. (Ver <Link to="/" className="text-primary hover:underline font-semibold">limpieza de campanas industriales en Alicante</Link>.)</>, i: 'restaurant' },
                { s: <><strong className="text-slate-900">Cajón de ventilación y extractor</strong> (turbina, rodete y carcasa).</>, i: 'cyclone' },
                { s: <><strong className="text-slate-900">Salida de humos en cubierta</strong> y su entorno inmediato.</>, i: 'roofing' },
              ].map((li, idx) => (
                <li key={idx} className="flex items-start gap-5 py-5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">{li.i}</span>
                  <span className="text-slate-700 leading-relaxed text-base md:text-lg">{li.s}</span>
                </li>
              ))}
            </ul>

            <p className="text-slate-600 leading-relaxed text-base mt-8 max-w-3xl">
              Cada instalación es distinta: hay conductos de 3 metros y conductos que atraviesan 6 plantas. Por eso el presupuesto se hace siempre tras ver la instalación o con fotos y datos concretos.
              {/* TODO Jaime: criterios orientativos de presupuesto */}
            </p>
            <p className="text-slate-500 text-sm mt-4 italic max-w-3xl">
              {/* TODO tanda 3-5: activar enlace hacia /instalacion-campanas-extractoras-alicante */}
              Si tu sistema es deficiente y necesita renovación, valoramos también instalación de campanas extractoras (próximamente en web).
            </p>
          </div>
        </section>

        {/* ═══ Cobertura ═══ LIGHT con mapa conceptual simple + tags */}
        <section className="relative bg-slate-50 py-20 md:py-28" id="cobertura">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">05 · Cobertura</div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-6">Dónde trabajamos: limpieza de conductos en toda la provincia de Alicante</h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Damos servicio en <strong className="text-slate-900">{CIUDADES.map((c) => c.name).join(', ')}</strong>, y en general en toda la <strong className="text-slate-900">provincia de Alicante</strong>. Nuestra base está en San Vicente del Raspeig, lo que nos permite responder con agilidad en el área de Alicante ciudad y desplazarnos a cualquier punto de la provincia.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              {CIUDADES.map((c) => (
                <span key={c.name} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition-colors px-3.5 py-2 rounded-full text-sm font-bold text-slate-700 cursor-default">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  {c.name}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-full text-sm font-black uppercase tracking-wide">
                <span className="material-symbols-outlined text-sm">public</span>
                Toda la provincia
              </span>
            </div>

            <p className="text-slate-500 text-sm">
              ¿Tu población no está en la lista? Llámanos igualmente al <strong className="text-slate-900">622 064 101</strong> y lo vemos.
            </p>
          </div>
        </section>

        {/* ═══ Plan anual — split: foto grande a la izquierda + info y CTA a la derecha ═══ */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-slate-900/60 mix-blend-multiply" aria-hidden="true"></div>
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 mb-2">Mantenimiento</div>
                  <div className="text-3xl md:text-5xl font-black leading-none">Un plan.<br/>Cero sustos.</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">06 · Mantenimiento</div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-6">Plan anual de mantenimiento de conductos</h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                La grasa no espera: en una cocina con actividad diaria, el conducto vuelve a cargarse en cuestión de meses. Por eso ofrecemos un plan anual de mantenimiento con revisiones e intervenciones programadas según el uso real de tu cocina, para que tu sistema esté siempre en condiciones defendibles ante sanidad, aseguradora e inspecciones.
                {/* TODO Jaime: periodicidades */}
              </p>
              <p className="text-slate-500 text-sm italic mb-8">
                {/* TODO tanda 3-5: activar enlace hacia /servicio-tecnico-campanas-extraccion-alicante */}
                El plan puede incluir intervenciones puntuales de servicio técnico (próximamente en web).
              </p>
              <p className="text-slate-900 font-bold mb-6">Pide tu plan de mantenimiento — 622 064 101 (llamada o WhatsApp).</p>
              <div className="flex flex-wrap items-center gap-6">
                <CTAPhone sub="Plan de mantenimiento" />
                <CTAWhatsapp />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Informe técnico ═══ LIGHT con "recibo" visual */}
        <section className="relative bg-slate-100 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 text-center">07 · Entregable</div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-10 text-center">Informe técnico de limpieza: tu prueba documental</h2>

            <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 p-8 md:p-12">
              {/* "Notch" superior tipo folio */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-xs align-middle mr-1">description</span>
                Informe técnico de limpieza
              </div>

              <p className="text-slate-700 leading-relaxed text-base md:text-lg mb-8">
                Al terminar cada intervención entregamos un <strong className="text-slate-900">informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE</strong>, con fotografías del antes y el después de cada tramo tratado, fecha, alcance de la intervención y datos del técnico. Es el documento que te pedirán tu aseguradora, sanidad o el propietario del local. <strong className="text-primary">Guárdalo con tu documentación del negocio: es tu prueba de diligencia.</strong>
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-200 pt-6">
                {[
                  { i: 'calendar_today', l: 'Fecha' },
                  { i: 'construction', l: 'Alcance' },
                  { i: 'compare', l: 'Antes / después' },
                  { i: 'verified', l: 'Firma técnico' },
                ].map((b) => (
                  <div key={b.l} className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-primary text-lg">{b.i}</span>
                    <span className="text-sm font-bold">{b.l}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-500 text-sm mt-8 italic text-center">
                {/* TODO tanda 3: activar enlace hacia /certificado-limpieza-campanas-alicante */}
                Más información sobre el certificado técnico de limpieza (próximamente en web).
              </p>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ LIGHT limpia estilo periódico */}
        <section className="relative bg-white py-20 md:py-28" id="faq">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">08 · Preguntas frecuentes</div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-10">Preguntas frecuentes sobre limpieza de conductos de extracción</h2>
            <Faq />
          </div>
        </section>

        {/* ═══ CTA cierre — DARK con firma personal ═══ */}
        <section className="relative bg-slate-950 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" aria-hidden="true"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">09 · Pide presupuesto</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Pide presupuesto sin compromiso</h2>
            <p className="text-slate-300 leading-relaxed mb-10 text-base md:text-lg max-w-2xl mx-auto">
              Cuéntanos qué instalación tienes (tipo de cocina, metros aproximados de conducto, plantas que atraviesa) y te damos presupuesto ajustado.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <CTAPhone sub="Presupuesto ajustado" />
              <CTAWhatsapp />
            </div>
            <div className="max-w-md mx-auto pt-8 border-t border-white/10 text-sm text-slate-400">
              <p className="mb-1">📞 622 064 101 · ✉️ <a href="mailto:hola@afondolimpiezadecampanas.com" className="text-white hover:underline">hola@afondolimpiezadecampanas.com</a></p>
              <p className="text-xs text-slate-500">Afondo · Jaime Gascón López · Partida Canastell E-17, 03690 San Vicente del Raspeig (Alicante)</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner onManage={() => { window.location.href = '/cookies'; }} />

      <a
        href="https://wa.me/34622064101?text=Hola,%20quisiera%20presupuesto%20para%20limpieza%20de%20conductos%20de%20extracci%C3%B3n."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition-all hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <span className="material-symbols-outlined text-3xl">chat</span>
      </a>
    </div>
  );
};

export default LimpiezaConductos;
