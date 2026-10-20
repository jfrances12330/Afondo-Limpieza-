
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, SectionHead, Check } from './ui';

interface ServicesSectionProps {
  onNavigateCalculadora: () => void;
}

// Cada tarjeta sirve su foto local con srcset y sus propios anchos.
// Un base terminado en `-4x3` es un reencuadre propio de este hueco: la version
// sin sufijo es la foto entera y ahi el recorte centrado cortaria mal.
// Un base que empieza por `stock-` NO es un trabajo de Afondo.
const SIZES = "(min-width: 1024px) 380px, calc(100vw - 3rem)";
const srcSet = (base: string, ext: string, anchos: number[]) =>
  anchos.map((a) => `${base}-${a}.${ext} ${a}w`).join(", ");

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateCalculadora }) => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20el%20servicio%20de%20limpieza.";

  const services = [
    {
      title: "Limpieza de Campanas",
      description: "Eliminación total de grasa en superficies, filtros y plenum mediante espuma activa y agua a presión. Garantizamos una zona de cocción higiénica.",
      items: ["Desengrase profundo de filtros", "Limpieza de recoge-grasas", "Abrillantado de acero inoxidable"],
      icon: "restaurant",
      // Hueco 9 · foto de archivo (Pexels), NO es un trabajo de Afondo.
      // Procedencia en docs/FOTOS-STOCK-PROCEDENCIA.md; se sustituye en cuanto
      // haya foto propia de campana -> docs/FOTOS-PENDIENTES-SUSTITUIR.md.
      base: "/img/stock-campana-industrial-cocina-1",
      anchos: [400, 800, 1200],
      alt: "Campana extractora industrial de acero inoxidable con sus filtros sobre una línea de cocción"
    },
    {
      title: "Desengrase de Conductos",
      description: "Limpieza interior de tramos horizontales y verticales cumpliendo la norma UNE 100165. Accedemos donde tú no llegas.",
      items: ["Cepillado neumático robotizado", "Apertura de registros estancos", "Eliminación de riesgos ocultos"],
      icon: "hvac",
      // Hueco 10 · foto real de Jaime (instalacion en falso techo, Alicante mayo 2025).
      base: "/img/instalacion-conductos-falso-techo-alicante-2-4x3",
      anchos: [400, 800, 1200],
      alt: "Conducto de extracción instalado por el falso techo del local",
      // Tanda 2 · Unidad 3.1: anchor SEO hacia la landing nueva de conductos.
      // Segundo anchor del brief ("desengrase interior de conductos") DIFERIDO —
      // no encaja natural en el copy actual sin reescribir frases; se activará al
      // rediseñar la descripción en tanda de contenido.
      landing: { href: "/limpieza-conductos-extraccion-alicante", anchor: "limpieza de conductos de extracción en Alicante" },
    },
    {
      title: "Mantenimiento de Turbinas",
      description: "Recupera la potencia de extracción y reduce ruidos molestos. Un motor limpio consume menos electricidad y dura más años.",
      items: ["Limpieza de palas y carcasas", "Revisión de correas y rodamientos", "Optimización del caudal de aire"],
      icon: "cyclone",
      // Hueco 11 · foto real de Jaime (traslado de la extraccion a cubierta, Alicante 2025).
      base: "/img/instalacion-extraccion-azotea-alicante-2",
      anchos: [400, 800, 1600],
      alt: "Instalación de extracción completa en azotea con la caja de la turbina"
    }
  ];

  return (
    <section className="bg-mist py-20 md:py-28 font-plex border-y border-line" aria-labelledby="servicios-titulo">
      <Container>
        <SectionHead
          id="servicios-titulo"
          eyebrow="Nuestras Soluciones Técnicas"
          title="Servicios de Limpieza Industrial en Alicante"
          lead="Especialistas en mantenimiento de sistemas de extracción para restaurantes, hoteles y cocinas industriales"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {services.map((service, idx) => (
            <article key={idx} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-shadow duration-200 hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <picture className="block h-full w-full">
                  <source type="image/webp" srcSet={srcSet(service.base, 'webp', service.anchos)} sizes={SIZES} />
                  <img
                    src={`${service.base}-800.jpg`}
                    srcSet={srcSet(service.base, 'jpg', service.anchos)}
                    sizes={SIZES}
                    alt={service.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </picture>
                <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 font-mono text-[11px] text-ink-3 shadow-card" aria-hidden="true">0{idx + 1}</span>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[22px] text-brand" aria-hidden="true">{service.icon}</span>
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-ink">{service.title}</h3>
                </div>
                <p className="mb-2 text-[15px] leading-relaxed text-muted">
                  {service.description}
                </p>
                {(service as any).landing && (
                  <p className="mb-5 text-[15px]">
                    <Link to={(service as any).landing.href} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                      {(service as any).landing.anchor} →
                    </Link>
                  </p>
                )}
                <ul className="mb-7 mt-3 flex-1 space-y-2.5 border-t border-line pt-5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-line bg-white text-[15px] font-semibold text-ink transition-colors hover:border-ink/25 hover:bg-mist" aria-label={`Pedir presupuesto para ${service.title}`}>
                  Pide presupuesto por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
