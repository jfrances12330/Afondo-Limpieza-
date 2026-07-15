// Fuente única de verdad para el <head> por ruta (prerender de Tanda 1).
// Extiende aquí cuando se añadan rutas de servicio en tandas posteriores.

export interface RouteMeta {
  path: string;             // Ruta pública sin trailing slash (excepto raíz "/")
  title: string;
  description?: string;     // Si undefined y noindex=true, se omite meta description
  canonical: string;        // URL absoluta canónica
  noindex?: boolean;        // Si true, añade <meta name="robots" content="noindex,nofollow">
  keepHomeOgSchema?: boolean; // Si true, mantiene OG/schema/etc. del index.html base (solo la home debería tenerlo)
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
    path: "/certificado",
    title: "Zona privada | Afondo",
    canonical: "https://afondolimpiezadecampanas.com/certificado",
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
];
