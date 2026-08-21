
import React from 'react';
import { Link } from 'react-router-dom';
import { areaServedSchema } from '../data/cobertura';

interface FooterProps {
  // Legacy: se conserva por si algún futuro llamador de fuera lo usara para navegar a home.
  // En la árbol actual (App.tsx) Footer solo usa <Link> para las rutas legales.
  onNavigateLegal?: (path: string) => void;
}

const Footer: React.FC<FooterProps> = () => {
  const email = "hola@afondolimpiezadecampanas.com";
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Afondo - Limpieza de Campanas Industriales",
    "image": "https://afondolimpiezadecampanas.com/img/afondo-limpieza-campanas-alicante-og.jpg",
    "@id": "https://afondolimpiezadecampanas.com",
    "url": "https://afondolimpiezadecampanas.com",
    "telephone": "+34622064101",
    "email": "hola@afondolimpiezadecampanas.com",
    "priceRange": "€€",
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
    // Cobertura desde constante única data/cobertura.ts (Tanda 2, unidad 6).
    "areaServed": areaServedSchema(),
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
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 text-left focus:outline-none mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-2xl font-bold">cleaning_services</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight uppercase">Afondo</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">Higiene Industrial</span>
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Especialistas en higiene industrial y seguridad contra incendios en cocinas profesionales en la provincia de Alicante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 min-w-0">
            <div className="flex flex-col gap-4 min-w-[180px]">
              <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Servicios</span>
              <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Limpieza de campanas</Link>
              <Link to="/limpieza-conductos-extraccion-alicante" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Limpieza de conductos</Link>
              <Link to="/trabajos-realizados-alicante" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Trabajos realizados</Link>
              {/* TODO tanda 3-5: añadir aquí Certificado, Instalación, Servicio técnico */}
            </div>
            <div className="flex flex-col gap-4 min-w-[180px]">
              <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Legal</span>
              <Link to="/aviso-legal" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Aviso Legal</Link>
              <Link to="/privacidad" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Privacidad</Link>
              <Link to="/cookies" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left">Cookies</Link>
              <Link to="/zona-privada" title="Zona privada — acceso técnicos" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors text-left flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">lock</span>
                Zona privada
              </Link>
            </div>
            <div className="flex flex-col gap-4 min-w-0">
              <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Contacto</span>
              <a href="tel:+34622064101" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors whitespace-nowrap">+34 622 06 41 01</a>
              <a href={`mailto:${email}`} className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors break-words">{email}</a>
              <span className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">Lun - Vie: 8:00 - 20:00</span>
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
