// DESACTIVADO tanda 0: testimonios inventados. Reintroducir solo con reseñas REALES de Google Business.
// El JSON-LD de Review/AggregateRating también queda fuera hasta que haya reseñas reales
// (aggregateRating con datos inventados = riesgo de Manual Action en Google).
// Ver: tanda 0 saneamiento, sección testimonios falsos.
// El CTA "Ver más opiniones en Google" que apuntaba a g.page/r/[TU_ID_GMB]/review también queda
// fuera. Reintroducir cuando Jorge pase el ID real de la ficha de Google Business.

import React from 'react';

const TestimonialsSection: React.FC = () => null;

export default TestimonialsSection;

/*
=== CONTENIDO ORIGINAL DESACTIVADO (para reactivación futura con datos REALES) ===

const originalTestimonials = [
    { name: "Carlos Hernández", business: "Restaurante El Faro - Alicante", rating: 5, text: "…", date: "2025-12-15" },
    { name: "María González",   business: "Hotel Costa Blanca - Benidorm",  rating: 5, text: "…", date: "2025-11-28" },
    { name: "José Antonio Ruiz", business: "Bar La Plaza - San Vicente",     rating: 5, text: "…", date: "2025-10-10" },
];
// ↑ Nombres/fechas inventados. NO restaurar. Sustituir por reseñas reales del Google Business Profile
// cuando esté resuelta la ficha (ver checklist Fase 0 · punto 5).
*/
