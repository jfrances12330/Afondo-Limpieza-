
import React from 'react';

interface ServicesSectionProps {
  onNavigateCalculadora: () => void;
}

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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJSp4bqbkiqdVdN-PE_YlaJHONjVHgCTgeIXkj1gDryN2gS3yVKhMWd8rQ-wKLVQ4xYbfqvVfZa34T4DjHfyMCn2vV8GvNtQSKLXYyPx7EmA8Oy2Hg9n6d1DBEyS2TwgIdhDjtimS7341ch-8c49zOmtcjuaf5Qz5j9iOUJgyuzUNg1njEOzUR_eAtzJgF9T0pMlKdwXtuFatTM2zml4jJIIMhl3OnRe4mA0RjVHuZY7a4Dz9dI8qggimQ8jintFWvzpKCEgcAzM",
      alt: "Limpieza técnica de conductos de extracción de humos bajo normativa UNE 100165"
    },
    {
      title: "Mantenimiento de Turbinas",
      description: "Recupera la potencia de extracción y reduce ruidos molestos. Un motor limpio consume menos electricidad y dura más años.",
      items: ["Limpieza de palas y carcasas", "Revisión de correas y rodamientos", "Optimización del caudal de aire"],
      icon: "cyclone",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVsyJfPvO8xEotmCEXXgAabtTwrNjzS4CTXRRDRW9nQZ1J1-ixiRtvF1RC0Z1gaG8MkOr8904JswYG2LjLT4Ao47tKaurooRSQX1Lyzz8Ew5-2airma_lQqzr-HvJ_5695EodGAl0xEcL6IaClthx0LMNHHmtMAjbogAZjh0bv0SOH0IHahR63dEnxRU6yQgbCjFwiskKoeAv5E7RfB-_gYSIPY0prborNa2vYiyDLCciJFno3wa1X_WOWi4D07a6u7uQ8kGEogWY",
      alt: "Mantenimiento preventivo y limpieza de turbinas de extracción en cocinas de Alicante"
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="servicios-titulo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Nuestras Soluciones Técnicas</span>
          <h2 id="servicios-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Especialistas en Higiene Industrial
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <article key={idx} className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.alt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
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
