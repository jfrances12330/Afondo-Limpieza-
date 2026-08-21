
import React from 'react';

const ResultsSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const turbinaAntes = "/img/limpieza-turbina-extraccion-taller-benidorm-antes";
  const turbinaDespues = "/img/limpieza-turbina-extraccion-taller-benidorm-despues";
  const sizes = "(min-width: 1024px) 568px, calc(100vw - 3rem)";

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="resultados-titulo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
            <span>Evidencia Visual</span>
          </div>
          <h2 id="resultados-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black tracking-tight mb-6">
            Resultados Reales: <br className="hidden sm:block"/>De Riesgo a Seguridad.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            La grasa acumulada es un peligro silencioso. Vea la diferencia radical que hace nuestra limpieza técnica en cocinas industriales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-12 bg-white dark:bg-slate-800 rounded-full shadow-lg items-center justify-center text-primary border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">compare_arrows</span>
          </div>

          {/* Before */}
          <article className="flex flex-col gap-4 group">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-red-600">ANTES</h3>
              </div>
              <span className="text-sm font-medium text-slate-500">Grasa Cristalizada y Riesgo</span>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 group-hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-red-400">warning</span>
                <span className="text-sm font-bold uppercase">Alto riesgo de incendio</span>
              </div>
              <picture className="block w-full h-full">
                <source
                  type="image/webp"
                  srcSet={`${turbinaAntes}-400.webp 400w, ${turbinaAntes}-800.webp 800w, ${turbinaAntes}-1152.webp 1152w`}
                  sizes={sizes}
                />
                <img
                  src={`${turbinaAntes}-800.jpg`}
                  srcSet={`${turbinaAntes}-400.jpg 400w, ${turbinaAntes}-800.jpg 800w, ${turbinaAntes}-1152.jpg 1152w`}
                  sizes={sizes}
                  alt="Turbina de extracción desmontada cubierta de grasa antes de la limpieza"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="1152"
                  height="864"
                />
              </picture>
            </div>
          </article>

          {/* After */}
          <article className="flex flex-col gap-4 group">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary shadow-lg shadow-primary"></span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-primary">DESPUÉS</h3>
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">Desengrase Técnico y Brillo</span>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-4 ring-primary/20 group-hover:shadow-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-green-400">verified</span>
                <span className="text-sm font-bold uppercase">Superficie Higienizada</span>
              </div>
              <picture className="block w-full h-full">
                <source
                  type="image/webp"
                  srcSet={`${turbinaDespues}-400.webp 400w, ${turbinaDespues}-800.webp 800w, ${turbinaDespues}-1536.webp 1536w`}
                  sizes={sizes}
                />
                <img
                  src={`${turbinaDespues}-800.jpg`}
                  srcSet={`${turbinaDespues}-400.jpg 400w, ${turbinaDespues}-800.jpg 800w, ${turbinaDespues}-1536.jpg 1536w`}
                  sizes={sizes}
                  alt="La misma turbina de extracción tras la limpieza, con el metal a la vista"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="1536"
                  height="1152"
                />
              </picture>
            </div>
          </article>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-8">¿Su cocina necesita este cambio?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95">
              Solicitar Presupuesto por WhatsApp
            </a>
            <a href="tel:+34622064101" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold py-4 px-10 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">call</span>
              Llamar 622 06 41 01
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
