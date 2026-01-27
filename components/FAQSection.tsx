
import React from 'react';

const FAQSection: React.FC = () => {
    const faqs = [
        {
            question: "¿Cuánto cuesta limpiar una campana industrial en Alicante?",
            answer: "El precio depende del tamaño de la instalación. Una campana estándar de 3 filtros cuesta desde 300€ con certificado UNE incluido. Puedes calcular tu presupuesto exacto online en 2 minutos sin compromiso."
        },
        {
            question: "¿Qué normativa regula la limpieza de campanas extractoras?",
            answer: "La normativa UNE 100165 establece los requisitos de limpieza para sistemas de extracción de cocinas. Además, el CTE DB-SI (Código Técnico de la Edificación) exige mantenimiento periódico para prevenir incendios. Entregamos certificado oficial válido para Sanidad y Seguros."
        },
        {
            question: "¿Cada cuánto tiempo debo limpiar mi campana extractora?",
            answer: "Según la normativa UNE 100165, la frecuencia depende del uso: cocinas de alta producción (restaurantes, hoteles) cada 3-6 meses; cocinas de uso medio cada 6-12 meses. Sanidad puede exigir el certificado en inspecciones."
        },
        {
            question: "¿Qué incluye el servicio de limpieza de campanas?",
            answer: "Limpieza completa de campana, filtros, plenum y conductos accesibles. Desengrasado con productos profesionales, limpieza de turbina si se contrata, y entrega de Certificado UNE 100165 oficial. Todo listo para inspecciones."
        },
        {
            question: "¿Trabajan en toda la provincia de Alicante?",
            answer: "Sí, atendemos Alicante capital, San Vicente del Raspeig, Elche, Benidorm, Altea, Calpe, Santa Pola, El Campello, Torrevieja y toda la provincia. Servicio a domicilio sin coste adicional en zona metropolitana."
        },
        {
            question: "¿Cuánto tiempo tarda el servicio de limpieza?",
            answer: "Una campana estándar tarda entre 2-4 horas dependiendo del nivel de suciedad. Si incluye conductos y turbina, puede extenderse a 6-8 horas. El certificado se entrega en el mismo día o en 24h máximo."
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="bg-white dark:bg-slate-900 py-24" aria-labelledby="faq-titulo">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">Preguntas Frecuentes</span>
                        <h2 id="faq-titulo" className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                            Todo lo que necesitas saber sobre limpieza de campanas en Alicante
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            Resolvemos tus dudas sobre normativa, precios y mantenimiento
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white pr-4">
                                        {faq.question}
                                    </h3>
                                    <span className="material-symbols-outlined text-primary text-2xl group-open:rotate-180 transition-transform shrink-0">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-2">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                        <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                            ¿Tienes otra pregunta? Estamos aquí para ayudarte
                        </p>
                        <a
                            href="https://wa.me/34622064101?text=Hola,%20tengo%20una%20pregunta%20sobre%20limpieza%20de%20campanas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-all"
                        >
                            <span className="material-symbols-outlined">chat</span>
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQSection;
