
import React from 'react';
import { Link } from 'react-router-dom';
import { areaServedSchema } from '../data/cobertura';
import { Brand } from './ui';

const linkCls = 'text-[14.5px] text-muted hover:text-ink transition-colors text-left';

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
    <footer className="border-t border-line bg-white py-14 font-plex">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" className="mb-5 inline-block focus:outline-none">
              <Brand name="Afondo" sub="Higiene Industrial" />
            </Link>
            <p className="text-[14.5px] leading-relaxed text-muted">
              Especialistas en higiene industrial y seguridad contra incendios en cocinas profesionales en la provincia de Alicante.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="mb-1 font-mono text-[11.5px] text-ink">Servicios</span>
              <Link to="/" className={linkCls}>Limpieza de campanas</Link>
              <Link to="/limpieza-conductos-extraccion-alicante" className={linkCls}>Limpieza de conductos</Link>
              <Link to="/trabajos-realizados-alicante" className={linkCls}>Trabajos realizados</Link>
              {/* TODO tanda 3-5: añadir aquí Certificado, Instalación, Servicio técnico */}
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-1 font-mono text-[11.5px] text-ink">Legal</span>
              <Link to="/aviso-legal" className={linkCls}>Aviso Legal</Link>
              <Link to="/privacidad" className={linkCls}>Privacidad</Link>
              <Link to="/cookies" className={linkCls}>Cookies</Link>
              <Link to="/zona-privada" title="Zona privada — acceso técnicos" className={`${linkCls} flex items-center gap-1`}>
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Zona privada
              </Link>
            </div>
            <div className="col-span-2 flex min-w-0 flex-col gap-3 sm:col-span-1">
              <span className="mb-1 font-mono text-[11.5px] text-ink">Contacto</span>
              <a href="tel:+34622064101" className={`${linkCls} tnum whitespace-nowrap`}>+34 622 06 41 01</a>
              <a href={`mailto:${email}`} className={`${linkCls} break-words`}>{email}</a>
              <span className="whitespace-nowrap text-[14.5px] text-muted">Lun - Vie: 8:00 - 20:00</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-8 text-[13.5px] text-muted md:flex-row md:items-center">
          <p>
            © 2025 Afondo. Todos los derechos reservados. | Diseño web por <a href="https://odoonto.com" target="_blank" rel="noopener noreferrer" className="font-medium text-ink-3 hover:text-ink transition-colors">odoonto.com</a>
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.boe.es/buscar/doc.php?id=BOE-A-2007-15813"
              target="_blank"
              rel="nofollow"
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[11.5px] text-ink-3 transition-colors hover:border-ink/25 hover:text-ink"
              title="Normativa UNE sobre limpieza de sistemas de extracción"
            >
              <span className="material-symbols-outlined text-[15px]">verified</span>
              UNE 100165
            </a>
            <a
              href="https://www.codigotecnico.org/Documentos/SeguridadIncendio.html"
              target="_blank"
              rel="nofollow"
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[11.5px] text-ink-3 transition-colors hover:border-ink/25 hover:text-ink"
              title="Código Técnico de la Edificación - Seguridad en caso de Incendio"
            >
              <span className="material-symbols-outlined text-[15px]">security</span>
              CTE DB-SI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
