
import React from 'react';

const FAQSection: React.FC = () => {
    const faqs = [
        {
            question: "¿Cuánto cuesta limpiar una campana industrial en Alicante?",
            answer: "El precio depende del tamaño de la instalación. Una campana estándar de 3 filtros cuesta desde 300€ con certificado UNE incluido. Puedes calcular tu presupuesto exacto online en 2 minutos sin compromiso."
        },
        {
            question: "¿Qué normativa regula la limpieza de campanas extractoras?",
            answer: "La normativa UNE 100165 establece los requisitos de limpieza para sistemas de extracción de cocinas. Además, el CTE DB-SI (Código Técnico de la Edificación) exige mantenimiento periódico para prevenir incendios. Entregamos informe técnico de limpieza, soporte documental ante Sanidad y Seguros."
        },
        {
            question: "¿Cada cuánto tiempo debo limpiar mi campana extractora?",
            answer: "Según la normativa UNE 100165, la frecuencia depende del uso: cocinas de alta producción (restaurantes, hoteles) cada 3-6 meses; cocinas de uso medio cada 6-12 meses. Sanidad puede exigir el certificado en inspecciones."
        },
        {
            question: "¿Qué incluye el servicio de limpieza de campanas?",
            answer: "Limpieza completa de campana, filtros, plenum y conductos accesibles. Desengrasado con productos profesionales, limpieza de turbina si se contrata, y entrega de Certificado técnico según UNE 100165. Todo listo para inspecciones."
        },
        {
            question: "¿Trabajan en toda la provincia de Alicante?",
            answer: "Sí, atendemos en Alicante, Elche, Benidorm, Torrevieja y en general toda la provincia de Alicante. Servicio a domicilio sin coste adicional en zona metropolitana."
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
            <section className="bg-mist border-y border-line py-20 md:py-28 font-plex" aria-labelledby="faq-titulo">
                {/* Rejilla de 3 piezas: en escritorio la caja de «otra pregunta» sube a la
                    columna izquierda; en móvil queda debajo de la lista. Una sola copia. */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-8 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
                    <div className="lg:col-start-1 lg:row-start-1">
                        <span className="eyebrow mb-4 inline-flex items-center gap-2"><span className="h-px w-5 bg-brand" aria-hidden="true"></span>Preguntas Frecuentes</span>
                        <h2 id="faq-titulo" className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                            Todo lo que necesitas saber sobre limpieza de campanas en Alicante
                        </h2>
                        <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                            Resolvemos tus dudas sobre normativa, precios y mantenimiento
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-line bg-white lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className={`group ${idx > 0 ? 'border-t border-line' : ''}`}>
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-mist/60 [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-[16px] font-medium leading-snug text-ink">
                                        {faq.question}
                                    </h3>
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-3 transition-transform group-open:rotate-45">
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                    </span>
                                </summary>
                                <div className="-mt-1 px-6 pb-6">
                                    <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
                                        {faq.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="rounded-xl border border-line bg-white p-6 text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
                        <p className="mb-4 text-[15px] text-ink-2">
                            ¿Tienes otra pregunta? Estamos aquí para ayudarte
                        </p>
                        <a
                            href="https://wa.me/34622064101?text=Hola,%20tengo%20una%20pregunta%20sobre%20limpieza%20de%20campanas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#1fa855] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#178a45]"
                        >
                            <span className="material-symbols-outlined text-[19px]">chat</span>
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQSection;
