// Fuente única de verdad para el <head> por ruta (prerender de Tanda 1 + Tanda 2).
// Extiende aquí cuando se añadan rutas de servicio en tandas posteriores.

import { areaServedSchema } from './data/cobertura';

export interface RouteMeta {
  path: string;             // Ruta pública sin trailing slash (excepto raíz "/")
  title: string;
  description?: string;     // Si undefined y noindex=true, se omite meta description
  canonical: string;        // URL absoluta canónica
  noindex?: boolean;        // Si true, añade <meta name="robots" content="noindex,nofollow">
  keepHomeOgSchema?: boolean; // Si true, mantiene OG/schema/etc. del index.html base (solo la home debería tenerlo)
  jsonLd?: object;          // Si presente, se inyecta como <script type="application/ld+json"> en el head prerenderizado
}

export const routes: RouteMeta[] = [
  {
    path: "/",
    // Head literal de producción al 2026-07-15 — regla de oro Tanda 1: byte a byte igual.
    title: "Limpieza de Campanas Industriales en Alicante | Certificado UNE",
    description: "¿Necesitas el certificado para Sanidad? ✅ Limpieza técnica de campanas y conductos en Alicante. Evita incendios y multas graves. ¡Calcula tu presupuesto online! 🚀",
    canonical: "https://afondolimpiezadecampanas.com/",
    keepHomeOgSchema: true,
  },
  {
    // Se MANTIENE aunque la ruta ahora redirija: sin esta entrada, /certificado
    // serviría el HTML de la home (con sus OG y sin noindex).
    path: "/certificado",
    title: "Zona privada | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/certificado",
    noindex: true,
  },
  {
    path: "/zona-privada",
    title: "Zona privada | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/zona-privada",
    noindex: true,
  },
  {
    path: "/zona-privada/certificado",
    title: "Generador de informes | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/zona-privada/certificado",
    noindex: true,
  },
  {
    path: "/zona-privada/resenas",
    title: "Pedir reseña | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/zona-privada/resenas",
    noindex: true,
  },
  {
    path: "/aviso-legal",
    title: "Aviso legal | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/aviso-legal",
    noindex: true,
  },
  {
    path: "/privacidad",
    title: "Política de privacidad | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/privacidad",
    noindex: true,
  },
  {
    path: "/cookies",
    title: "Política de cookies | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/cookies",
    noindex: true,
  },
  // ── Tanda 2 ──────────────────────────────────────────────────────────
  {
    path: "/calculadora",
    title: "Calculadora de presupuesto | Afondo",
    description: "Calcula online el presupuesto para limpiar tu campana industrial en 1 minuto. Sin compromiso. Provincia de Alicante.",
    canonical: "https://afondolimpiezadecampanas.com/calculadora",
  },
  {
    path: "/contacto",
    title: "Contacto | Afondo",
    description: "Afondo — limpieza de campanas industriales en Alicante. Teléfono, WhatsApp y email para presupuesto sin compromiso.",
    canonical: "https://afondolimpiezadecampanas.com/contacto",
  },
  {
    path: "/limpieza-conductos-extraccion-alicante",
    title: "Limpieza de Conductos de Extracción en Alicante | Afondo",
    description: "Desengrase interior de conductos de extracción en Alicante y provincia. Tramos verticales y horizontales, informe técnico con fotos. Llama: 622 064 101.",
    canonical: "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HomeAndConstructionBusiness",
          "@id": "https://afondolimpiezadecampanas.com/#localbusiness",
          "name": "Afondo Limpieza de Campanas",
          "url": "https://afondolimpiezadecampanas.com",
          "telephone": "+34622064101",
          "email": "hola@afondolimpiezadecampanas.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Partida Canastell E-17",
            "postalCode": "03690",
            "addressLocality": "San Vicente del Raspeig",
            "addressRegion": "Alicante",
            "addressCountry": "ES",
          },
          "founder": {
            "@type": "Person",
            "@id": "https://afondolimpiezadecampanas.com/#jaime-gascon",
            "name": "Jaime Gascón López",
            "jobTitle": "Técnico especialista en limpieza y desengrase de sistemas de extracción",
          },
          "areaServed": areaServedSchema(),
        },
        {
          "@type": "Service",
          "@id": "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante#service",
          "name": "Limpieza de conductos de extracción de humos",
          "serviceType": "Limpieza y desengrase de conductos de extracción de cocinas industriales",
          "description": "Desengrase interior de conductos de extracción de humos en tramos verticales y horizontales, con apertura y sellado de registros de inspección e informe técnico con fotografías siguiendo criterios de la UNE 100165 y el CTE.",
          "provider": { "@id": "https://afondolimpiezadecampanas.com/#localbusiness" },
          "areaServed": areaServedSchema(),
          "url": "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante",
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://afondolimpiezadecampanas.com" },
            { "@type": "ListItem", "position": 2, "name": "Limpieza de conductos de extracción en Alicante", "item": "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante" },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": "https://afondolimpiezadecampanas.com/limpieza-conductos-extraccion-alicante#faq",
          "mainEntity": [
            { "@type": "Question", "name": "¿Cada cuánto hay que limpiar los conductos de extracción de un restaurante?", "acceptedAnswer": { "@type": "Answer", "text": "Depende del volumen y el tipo de cocina. Como referencia general del sector, en cocinas de uso intensivo se recomienda al menos una limpieza interior anual. En la inspección inicial indicamos la periodicidad recomendada para cada caso." } },
            { "@type": "Question", "name": "¿Qué norma regula la limpieza de conductos de extracción de humos?", "acceptedAnswer": { "@type": "Answer", "text": "Las referencias principales son la norma UNE 100165, el Código Técnico de la Edificación (CTE DB-SI y DB-HS3) y el Reglamento (CE) 852/2004 de higiene alimentaria. Nuestro informe técnico se elabora siguiendo criterios de la UNE 100165 y el CTE." } },
            { "@type": "Question", "name": "¿Por qué se incendian los conductos de extracción?", "acceptedAnswer": { "@type": "Answer", "text": "Porque la grasa acumulada en el interior del conducto es combustible. Una llamarada o una temperatura elevada mantenida puede prenderla, y el propio tiro del sistema propaga el fuego por el interior del conducto hacia arriba." } },
            { "@type": "Question", "name": "¿Qué es el efecto chimenea?", "acceptedAnswer": { "@type": "Answer", "text": "Es el tiro natural de un conducto vertical: el aire caliente asciende y arrastra aire desde abajo. En un incendio de conducto, ese tiro alimenta las llamas con oxígeno y las acelera hacia las plantas superiores y la cubierta." } },
            { "@type": "Question", "name": "¿Sirve limpiar solo la campana y los filtros sin limpiar el conducto?", "acceptedAnswer": { "@type": "Answer", "text": "No es suficiente. La grasa que atraviesa los filtros se deposita en el interior del conducto, que es donde se origina y propaga el incendio. Una limpieza completa incluye el desengrase interior del conducto en todos sus tramos." } },
            { "@type": "Question", "name": "¿Qué es un registro o ventana de inspección y por qué es importante?", "acceptedAnswer": { "@type": "Answer", "text": "Es una apertura practicable en el conducto que permite acceder a su interior para inspeccionarlo y limpiarlo. Si el conducto no dispone de registros suficientes, abrimos ventanas de inspección en los puntos necesarios y las sellamos al terminar." } },
            { "@type": "Question", "name": "¿Qué me entregáis al terminar el trabajo?", "acceptedAnswer": { "@type": "Answer", "text": "Un informe técnico de limpieza siguiendo criterios de la UNE 100165 y el CTE, con fotografías del antes y el después de cada tramo tratado, alcance de la intervención, fecha y datos del técnico." } },
            { "@type": "Question", "name": "¿Trabajáis fuera de Alicante ciudad?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Damos servicio en toda la provincia de Alicante: Alicante, Alcoy, Altea, Benidorm, Dénia, El Campello, Elche, Elda, Guardamar, Jávea, Orihuela, San Vicente del Raspeig, Santa Pola, Torrevieja y Villajoyosa, entre otras poblaciones. Nuestra base está en San Vicente del Raspeig." } },
          ],
        },
      ],
    },
  },
];
