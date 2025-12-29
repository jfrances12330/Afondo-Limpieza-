
import React from 'react';

const ResultsSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="resultados-titulo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
            <span>Evidencia Visual</span>
          </div>
          <h2 id="resultados-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
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
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPqEYgnqF76FfHY6CfvepiqGK49Q7Vj_Zffqk1IAe-vu42K_Yts6udGfdQS223IgYMJd6DPmpClcnyV8nB5ba8OAC46M9TnZuzkVfbLybYJiDW646yg1aFFJtH9xFd0aTVBHPQvfrS2xSy6FHCMfc18wRePbgBxthQ2kDMF7wTzNQ2mvrqhgAoLkcWA6J_y0AYd2EYsUtSaQPNeBKss6rJk2cggvqgVKPC5d4x0cNUTviy2Snu61aPAX2etmyKImXPgqc4WnoK44Q" 
                alt="Campana de cocina industrial con grasa inflamable en Alicante antes de limpieza profesional"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width="800"
                height="600"
              />
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
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY-uSTLgaPQjgKom4e4tMgDIjPSScys5eAFjAjnTmaB9RvC_xJ1xcxG45S-dvwRGE9wHXeyjjMnRREHlL0PqIOKsUWltQ2Nzrx5IMxLz5AvY1zAzZE-tQnzYAfE0qDSkO7UWwVOnsXSjtqKiPDIP7zsKqa3MUBe0o37bdi9mAooh4kfxpqkB6enAhfKvMUW3Mup6z-kc5KKI2Z6qF2hcRBSuPxIf-5lYZQ7bKRlBEvJH4bdhePxltjckNOHjVb2jzzI_fxbKVilW4" 
                alt="Campana extractora industrial limpia y abrillantada en Alicante tras servicio técnico certificado"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width="800"
                height="600"
              />
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
