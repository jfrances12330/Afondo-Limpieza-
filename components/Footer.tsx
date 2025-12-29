
import React from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'aviso-legal' | 'privacidad' | 'cookies') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const email = "hola@limpiezadecampanas.com";
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Afondo - Limpieza de campanas",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqkJXK7dDEL0GKvACYNXCL8-7_klRe300_2g0SPv0F-bIV3MY5ueoBz7yGF1ZXHwuGgA13KFHbBqpSw6jGtNGA6p7qwY_5oakgwZzidkDVFvXMXvkqzeJ6MiNQ0GUzTJuyb5d9otC5eYHvwJpSzcUk9Qt-yGIG1HhLWD9EGHtQmlcM7RXTF2juJ45ZXVIiEAExs9ugW0PQ6fl69jW1Elr4FMI4loaIL58c9-M-X3XgTn1OxpfvKmegoPECcf9-eTpH2Dh_B-NXNo",
    "@id": "https://afondolimpiezadecampanas.com",
    "url": "https://afondolimpiezadecampanas.com",
    "telephone": "+34622064101",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Partida Canastell, E17",
      "addressLocality": "San Vicente del Raspeig",
      "postalCode": "03690",
      "addressRegion": "Alicante",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.3976,
      "longitude": -0.5215
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 text-left focus:outline-none mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-2xl font-bold">cleaning_services</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight uppercase">Afondo</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">Higiene Industrial</span>
              </div>
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Especialistas en higiene industrial y seguridad contra incendios en cocinas profesionales en la provincia de Alicante.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Legal</span>
              <button onClick={() => onNavigate('aviso-legal')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Aviso Legal</button>
              <button onClick={() => onNavigate('privacidad')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Privacidad</button>
              <button onClick={() => onNavigate('cookies')} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Cookies</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Contacto</span>
              <a href="tel:+34622064101" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">+34 622 06 41 01</a>
              <a href={`mailto:${email}`} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">{email}</a>
              <span className="text-slate-500 dark:text-slate-400 text-sm">Lun - Vie: 8:00 - 20:00</span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-sm">
          <p className="font-medium">
            © 2025 Afondo. Todos los derechos reservados. | Diseño web por <a href="https://odoonto.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-bold transition-colors">odoonto.com</a>
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.boe.es/buscar/doc.php?id=BOE-A-2007-15813" 
              target="_blank" 
              rel="nofollow" 
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-bold"
              title="Normativa UNE sobre limpieza de sistemas de extracción"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span> 
              UNE 100165
            </a>
            <a 
              href="https://www.codigotecnico.org/Documentos/SeguridadIncendio.html" 
              target="_blank" 
              rel="nofollow" 
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-bold"
              title="Código Técnico de la Edificación - Seguridad en caso de Incendio"
            >
              <span className="material-symbols-outlined text-[18px]">security</span> 
              CTE DB-SI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
