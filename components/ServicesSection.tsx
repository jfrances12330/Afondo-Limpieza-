
import React from 'react';
import { Link } from 'react-router-dom';

interface ServicesSectionProps {
  onNavigateCalculadora: () => void;
}

// Las tarjetas con `base` sirven una foto local con srcset; las que aun
// conservan `img` apuntan a la imagen antigua y estan pendientes de sustituir.
const SIZES = "(min-width: 1024px) 380px, calc(100vw - 3rem)";
const srcSet = (base: string, ext: string) =>
  `${base}-400.${ext} 400w, ${base}-800.${ext} 800w, ${base}-1200.${ext} 1200w`;

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateCalculadora }) => {
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20el%20servicio%20de%20limpieza.";

  const services = [
    {
      title: "Limpieza de Campanas",
      description: "Eliminación total de grasa en superficies, filtros y plenum mediante espuma activa y agua a presión. Garantizamos una zona de cocción higiénica.",
      items: ["Desengrase profundo de filtros", "Limpieza de recoge-grasas", "Abrillantado de acero inoxidable"],
      icon: "restaurant",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA54dSXiDg08XUtcvxgs2YQuY_cUDjr61OuQxp24j1RKXzH2vvD3Fwe46bAuKkR7qeRlc0jPuP-cfw47aAGeoWiuXjU8Z80Hu5zoOJ3P_ltpboqA5SNpZqG77Kmv2Q4iDdSqvKiaGiUMSKELgJPqqE9wnK59TBYdPNwwb_C7f3Fwo_B3rsTKa6nq-cVUHh2qtIhvU785xfFoR2Ohwol22UHW_5RxzICYf7CGLR5XLKbupwn_6Xhu8pZD1ZlW2z1nNCWiDCbduWUy7E",
      alt: "Servicio de limpieza y desengrase de campanas extractoras industriales en Alicante"
    },
    {
      title: "Desengrase de Conductos",
      description: "Limpieza interior de tramos horizontales y verticales cumpliendo la norma UNE 100165. Accedemos donde tú no llegas.",
      items: ["Cepillado neumático robotizado", "Apertura de registros estancos", "Eliminación de riesgos ocultos"],
      icon: "hvac",
      // Hueco 10 · foto real de Jaime (instalacion en falso techo, Alicante mayo 2025).
      base: "/img/instalacion-conductos-falso-techo-alicante-2",
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
      alt: "Instalación de extracción completa en azotea con la caja de la turbina"
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="servicios-titulo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Nuestras Soluciones Técnicas</span>
          <h2 id="servicios-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Servicios de Limpieza Industrial en Alicante
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mt-4 max-w-3xl mx-auto">
            Especialistas en mantenimiento de sistemas de extracción para restaurantes, hoteles y cocinas industriales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <article key={idx} className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="relative h-56 overflow-hidden">
                {(service as any).base ? (
                  <picture className="block h-full w-full">
                    <source type="image/webp" srcSet={srcSet((service as any).base, 'webp')} sizes={SIZES} />
                    <img
                      src={`${(service as any).base}-800.jpg`}
                      srcSet={srcSet((service as any).base, 'jpg')}
                      sizes={SIZES}
                      alt={service.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />
                  </picture>
                ) : (
                  <img
                    src={(service as any).img}
                    alt={service.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm leading-relaxed">
                  {service.description}
                </p>
                {(service as any).landing && (
                  <p className="mb-6 text-sm">
                    <Link to={(service as any).landing.href} className="text-primary hover:underline font-semibold">
                      {(service as any).landing.anchor} →
                    </Link>
                  </p>
                )}
                <ul className="space-y-3 mb-8 flex-1">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">check</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-primary font-bold py-3 rounded-xl transition-all text-center text-sm border border-slate-100 dark:border-slate-700" aria-label={`Pedir presupuesto para ${service.title}`}>
                  Pide presupuesto por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
