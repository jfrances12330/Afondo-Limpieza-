
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
          <span className="eyebrow mb-4 inline-flex items-center gap-2 !text-[#9fb0ff]"><span className="h-px w-5 bg-[#9fb0ff]" aria-hidden="true"></span>Vías de Contacto Directas</span>
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
            <div className="mb-8 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f7ee] text-[#178a45]">
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e8f7ee] px-2 py-1 font-mono text-[11px] text-[#178a45]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1fa855]"></span>
                Online
              </span>
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
            <div className="mb-8 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </span>
              <span className="inline-flex items-center rounded-md bg-brand-soft px-2 py-1 font-mono text-[11px] text-brand">
                Directo
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
            <p className="mt-3 font-mono text-[11.5px] text-muted">Atención inmediata 24/7</p>
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
