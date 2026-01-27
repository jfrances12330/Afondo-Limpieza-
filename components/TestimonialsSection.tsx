
import React from 'react';

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            name: "Carlos Hernández",
            business: "Restaurante El Faro - Alicante",
            rating: 5,
            text: "Servicio impecable. Vinieron en menos de 48h, limpiaron toda la campana y conductos, y nos entregaron el certificado UNE el mismo día. Ahora pasamos las inspecciones sin problemas.",
            date: "2025-12-15"
        },
        {
            name: "María González",
            business: "Hotel Costa Blanca - Benidorm",
            rating: 5,
            text: "Llevábamos años con la misma empresa y siempre quedaban restos de grasa. Afondo hizo un trabajo espectacular, la campana parece nueva. Muy profesionales y puntuales.",
            date: "2025-11-28"
        },
        {
            name: "José Antonio Ruiz",
            business: "Bar La Plaza - San Vicente",
            rating: 5,
            text: "Precio justo y trabajo de calidad. Lo que más valoro es que me explicaron todo lo que hacían y me dieron consejos para mantener la campana limpia entre servicios. Totalmente recomendables.",
            date: "2025-10-10"
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Afondo - Limpieza de Campanas Industriales",
        "review": testimonials.map(t => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": t.name
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": t.rating,
                "bestRating": 5
            },
            "reviewBody": t.text,
            "datePublished": t.date
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="testimonios-titulo">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">Opiniones Reales</span>
                        <h2 id="testimonios-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                            Lo que Dicen Nuestros Clientes en Alicante
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-3xl mx-auto">
                            Restaurantes, hoteles y bares confían en nosotros para mantener sus cocinas seguras y cumplir la normativa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <article key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-yellow-400 text-xl">star</span>
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Author */}
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <p className="font-bold text-slate-900 dark:text-white">{testimonial.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{testimonial.business}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://g.page/r/[TU_ID_GMB]/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold text-sm transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">rate_review</span>
                            Ver más opiniones en Google
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsSection;
