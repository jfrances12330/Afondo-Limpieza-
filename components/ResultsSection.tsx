
import React, { useCallback, useRef, useState } from 'react';
import { Container } from './ui';

const ResultsSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const turbinaAntes = "/img/limpieza-turbina-extraccion-taller-benidorm-antes-4x3";
  const turbinaDespues = "/img/limpieza-turbina-extraccion-taller-benidorm-despues-4x3";
  const sizes = "(min-width: 1024px) 896px, calc(100vw - 2.5rem)";

  // Comparador antes/después: la foto «antes» va encima y se recorta.
  // touch-action: pan-y deja hacer scroll vertical en el móvil sin pelearse
  // con el arrastre horizontal.
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const moveTo = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="bg-white py-20 md:py-28 font-plex" aria-labelledby="resultados-titulo">
      <Container>
        <div className="mb-12 flex flex-col items-center text-center md:mb-14">
          <div className="eyebrow mb-4 inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
            <span>Evidencia Visual</span>
          </div>
          <h2 id="resultados-titulo" className="max-w-3xl text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Resultados Reales: <br className="hidden sm:block"/>De Riesgo a Seguridad.
          </h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">
            La grasa acumulada es un peligro silencioso. Vea la diferencia radical que hace nuestra limpieza técnica en cocinas industriales.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-3 grid grid-cols-2 gap-4 px-0.5">
            <article className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#dc2626]"></span>
                <h3 className="font-mono text-[12.5px] font-medium text-[#b91c1c]">ANTES</h3>
              </div>
              <span className="text-[13.5px] text-muted">Grasa Cristalizada y Riesgo</span>
            </article>
            <article className="flex flex-col items-end gap-0.5 text-right sm:flex-row-reverse sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand"></span>
                <h3 className="font-mono text-[12.5px] font-medium text-brand">DESPUÉS</h3>
              </div>
              <span className="text-[13.5px] text-ink-2">Desengrase Técnico y Brillo</span>
            </article>
          </div>

          <div
            ref={box}
            className="relative aspect-4/3 w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-line bg-mist shadow-lift"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={(e) => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); moveTo(e.clientX); }}
            onPointerMove={(e) => { if (dragging.current) moveTo(e.clientX); }}
            onPointerUp={() => { dragging.current = false; }}
            onPointerCancel={() => { dragging.current = false; }}
          >
            {/* Después: fondo completo */}
            <picture className="absolute inset-0 block">
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
                className="pointer-events-none h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width="1536"
                height="1152"
                draggable={false}
              />
            </picture>
            <div className="absolute bottom-3 right-3 z-10 flex sm:bottom-4 sm:right-4 items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1.5 text-ink shadow-card">
              <span className="material-symbols-outlined text-[16px] text-[#15803d]">verified</span>
              <span className="text-[12.5px] font-medium">Superficie Higienizada</span>
            </div>

            {/* Antes: encima, recortado por la posición del tirador */}
            <div className="absolute inset-0 z-20" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <picture className="block h-full w-full">
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
                  className="pointer-events-none h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1152"
                  height="864"
                  draggable={false}
                />
              </picture>
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1.5 text-ink shadow-card sm:left-4 sm:top-4">
                <span className="material-symbols-outlined text-[16px] text-[#dc2626]">warning</span>
                <span className="text-[12.5px] font-medium">Alto riesgo de incendio</span>
              </div>
            </div>

            {/* Tirador */}
            <div className="pointer-events-none absolute inset-y-0 z-30 w-px bg-white shadow-[0_0_0_1px_rgba(11,19,36,.15)]" style={{ left: `${pos}%` }} aria-hidden="true">
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lift">
                <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Comparar antes y después"
              className="sr-only"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11.5px] text-muted" aria-hidden="true">← arrastra →</p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center md:mt-16">
          <h3 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink">¿Su cocina necesita este cambio?</h3>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark">
              Solicitar Presupuesto por WhatsApp
            </a>
            <a href="tel:+34622064101" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/25">
              <span className="material-symbols-outlined text-[19px]">call</span>
              Llamar 622 06 41 01
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResultsSection;
