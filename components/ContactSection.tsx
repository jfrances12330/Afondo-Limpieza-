
import React from 'react';

interface ContactSectionProps {
  onNavigate: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const phone = "+34622064101";
  const phoneDisplay = "622 064 101";

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28 font-plex">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl md:mb-14">
          <span className="eyebrow mb-4 inline-flex items-center gap-2 text-[#9fb0ff]!"><span className="h-px w-5 bg-[#9fb0ff]" aria-hidden="true"></span>Vías de Contacto Directas</span>
          <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.75rem]">
            ¿Hablamos ahora? <br /> Elige tu medio favorito.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-300">
            Sin formularios complejos. Recibe una valoración en pocos minutos enviando una foto de tu instalación por WhatsApp o llamándonos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-white/10 bg-white p-7 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] md:p-8"
          >
            {/* Chat de muestra: el mensaje es el mismo que lleva el enlace */}
            <div className="-mx-7 -mt-7 mb-7 overflow-hidden rounded-t-xl border-b border-line md:-mx-8 md:-mt-8">
              <div className="flex items-center gap-3 bg-[#075e54] px-4 py-2.5 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink" aria-hidden="true">
                  <span className="material-symbols-outlined text-[18px]">cleaning_services</span>
                </span>
                <span className="flex-1 leading-tight" aria-hidden="true">
                  <span className="block text-[13.5px] font-semibold">Afondo</span>
                  <span className="block text-[11px] text-white/70">en línea</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 font-mono text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]"></span>
                  Online
                </span>
              </div>
              <div className="space-y-2 bg-[#efeae2] px-4 py-4 bg-[radial-gradient(#e2dbd0_1px,transparent_1px)] bg-size-[12px_12px]" aria-hidden="true">
                <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 text-[13px] text-ink shadow-xs">
                  Hola, quisiera pedir presupuesto para la limpieza de mi campana.
                  <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] text-[#53bdeb]">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                  </span>
                </div>
                <div className="ml-auto w-[150px] overflow-hidden rounded-lg rounded-tr-none bg-[#d9fdd3] p-1 shadow-xs">
                  <img src="/img/stock-campana-industrial-cocina-1-400.webp" alt="" className="aspect-4/3 w-full rounded-md object-cover" width="400" height="300" loading="lazy" />
                </div>
                <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-xs">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"></span>
                </div>
              </div>
            </div>
            <h3 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink">WhatsApp Business</h3>
            <p className="mb-8 mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
              Ideal para enviarnos fotos de tu campana y recibir un presupuesto rápido.
            </p>
            <div className="mt-auto flex h-12 w-full items-center justify-between rounded-lg bg-[#1fa855] px-5 text-[15px] font-semibold text-white transition-colors group-hover:bg-[#178a45]">
              <span>Chatear con un experto</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </div>
            <p className="mt-3 font-mono text-[11.5px] text-muted">Respuesta en pocos minutos</p>
          </a>

          {/* Llamada */}
          <a
            href={`tel:${phone}`}
            className="group flex flex-col rounded-xl border border-white/10 bg-white p-7 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] md:p-8"
          >
            {/* Pantalla de llamada de muestra */}
            <div className="relative -mx-7 -mt-7 mb-7 flex flex-col items-center overflow-hidden rounded-t-xl border-b border-line bg-ink-2 px-4 pb-5 pt-6 text-white md:-mx-8 md:-mt-8">
              <span className="absolute right-4 top-4 inline-flex items-center rounded-md bg-white/10 px-2 py-1 font-mono text-[11px] text-[#c9d2ff]">
                Directo
              </span>
              <span className="relative mb-3 flex h-14 w-14 items-center justify-center" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 [animation-duration:2s]"></span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                  <span className="material-symbols-outlined text-[26px]">call</span>
                </span>
              </span>
              <span className="text-[13px] font-semibold" aria-hidden="true">Afondo · Higiene Industrial</span>
              <span className="tnum mt-0.5 font-mono text-[12px] text-white/60" aria-hidden="true">+34 622 06 41 01</span>
              <span className="mt-4 flex gap-4" aria-hidden="true">
                {['mic_off', 'dialpad', 'volume_up'].map((i) => (
                  <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <span className="material-symbols-outlined text-[18px]">{i}</span>
                  </span>
                ))}
              </span>
            </div>
            <h3 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink">Llamada Directa</h3>
            <p className="mb-8 mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
              Habla con nuestros técnicos para emergencias o dudas sobre la normativa.
            </p>
            <div className="mt-auto flex h-12 w-full items-center justify-between rounded-lg bg-ink px-5 text-white transition-colors group-hover:bg-ink-2">
              <span className="tnum text-[16px] font-semibold tracking-wide">{phoneDisplay}</span>
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <p className="mt-3 font-mono text-[11.5px] text-muted">Atención Lun - Vie: 8:00 - 20:00</p>
          </a>
        </div>

        <div className="mt-10">
          <button
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            Ver todas las opciones de contacto y ubicación
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
