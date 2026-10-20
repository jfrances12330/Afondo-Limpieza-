import React from 'react';
import { Check } from './ui';

const CertificateSection: React.FC = () => {
  const points = [
    "Informe técnico de limpieza firmado por técnico competente.",
    "Informe fotográfico del 'Antes y Después' detallado.",
    "Detalle de productos desengrasantes alcalinos profesionales.",
    "Documento válido para presentar a tu seguro y a Sanidad.",
    "Pegatina de 'Campana Limpia' con fecha de próxima revisión."
  ];

  // Restyling oct-2026: las dos miniaturas del informe de muestra pasan de
  // imágenes genéricas alojadas fuera a una pareja real de Jaime (reparación de
  // fugas en conducto, Alicante feb-2026). Mismo alt que antes.
  const fuga = "/img/reparacion-fuga-conducto-extraccion-alicante";

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28 font-plex" aria-labelledby="certificado-titulo">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <div className="eyebrow mb-5 inline-flex items-center gap-2 text-[#9fb0ff]!">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
            <span>Valor Diferencial</span>
          </div>
          <h2 id="certificado-titulo" className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.5rem]">
            Tu Informe Técnico <br /> de Limpieza
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-300">
            No solo limpiamos, lo documentamos. Al finalizar el trabajo, recibirás un informe técnico completo con reportaje fotográfico, válido para presentar a tu seguro y a Sanidad.
          </p>

          <ul className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 py-3.5 text-[15px] text-slate-200">
                <Check tone="dark" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documento de muestra con marco de aplicación */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]" role="img" aria-label="Ejemplo visual de informe técnico de limpieza industrial">
            <div className="flex items-center gap-1.5 border-b border-line bg-mist px-4 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9dce2]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9dce2]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9dce2]"></span>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1">
                <span className="material-symbols-outlined text-[14px] text-white" aria-hidden="true">info</span>
                <span className="font-mono text-[10.5px] text-white">Ejemplo de informe</span>
              </div>

              <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">description</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[16px] font-semibold text-ink">AFONDO</span>
                    <span className="mt-1 font-mono text-[9.5px] text-muted">Higiene Industrial</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-[10px] text-muted">Nº INFORME</span>
                  <span className="font-mono text-[11px] font-medium text-ink">MUESTRA</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted">Establecimiento</span>
                    <span className="text-[13px] font-medium text-ink">Cocina industrial</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="font-mono text-[10px] text-muted">Fecha</span>
                    <span className="font-mono text-[12px] text-ink">DD/MM/AAAA</span>
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-mist p-4">
                  <span className="mb-1.5 block font-mono text-[10px] text-muted">Metodología Técnica</span>
                  <p className="text-[12px] leading-relaxed text-ink-3">
                    Limpieza técnica de sistema de extracción mediante aplicación de espuma activa alcalina con cepillado mecánico y aclarado a alta presión (80ºC). Desengrase de plenum y conductos horizontales (14m).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-mist">
                    <img src={`${fuga}-antes-400.webp`} alt="Antes" className="h-full w-full object-cover" loading="lazy" decoding="async" width="400" height="225" />
                    <span className="absolute bottom-1.5 left-1.5 rounded-sm bg-white/95 px-1.5 py-0.5 font-mono text-[9.5px] text-[#c2410c]">Estado Inicial</span>
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-mist">
                    <img src={`${fuga}-despues-400.webp`} alt="Después" className="h-full w-full object-cover" loading="lazy" decoding="async" width="400" height="225" />
                    <span className="absolute bottom-1.5 left-1.5 rounded-sm bg-white/95 px-1.5 py-0.5 font-mono text-[9.5px] text-[#15803d]">Estado Final</span>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-line pt-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted">Validez</span>
                    <span className="text-[12px] font-semibold text-[#15803d]">6 MESES (Garantizado)</span>
                  </div>
                  <div className="text-center">
                    <svg viewBox="0 0 120 28" className="mx-auto mb-1 h-7 w-28 text-ink/70" fill="none" aria-hidden="true">
                      <path d="M4 20c10-14 18-14 20-4s8 6 14-4 10-8 12 2 6 10 16 0 14-8 18-2 10 6 28-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <div className="mb-1.5 h-px w-32 bg-line"></div>
                    <span className="font-mono text-[10px] text-ink">Firma Técnico Autorizado</span>
                    <span className="block text-[10px] text-muted">Jaime G. L. - Especialista</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pegatina: etiqueta física, no círculo girado */}
          <div className="absolute -bottom-5 right-4 flex items-center gap-2.5 rounded-lg border border-black/10 bg-signal px-3.5 py-2.5 text-ink shadow-lift sm:-right-5" aria-hidden="true">
            <span className="material-symbols-outlined text-[20px]">event_available</span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold">Pegatina de Próxima Revisión</span>
              <span className="font-mono text-[10px]">Mes / Año</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
