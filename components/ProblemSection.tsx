
import React from 'react';
import { Container, SectionHead } from './ui';
import { VisualMulta, VisualIncendio, VisualGarantia } from './home/ProblemVisuals';

const VISUALES = [VisualMulta, VisualIncendio, VisualGarantia];

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Evita Multas de hasta 60.000€",
      description: "Las infracciones graves por falta de higiene pueden suponer el cierre de tu local según la normativa vigente en la Comunidad Valenciana.",
      icon: "request_quote",
      status: "Protección Legal",
      statusIcon: "gavel",
      bg: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20"
    },
    {
      title: "Prevención de Incendios",
      description: "La grasa acumulada en los conductos es altamente inflamable. Cumplimos estrictamente el CTE DB-SI para garantizar la seguridad de tu negocio y clientes.",
      icon: "local_fire_department",
      status: "Seguridad Crítica",
      statusIcon: "shield",
      bg: "bg-red-600/10 text-red-600 dark:text-red-400 border-red-600/20"
    },
    {
      title: "Garantía ante Inspecciones",
      description: "Entregamos un informe técnico de limpieza (soporte documental ante Sanidad, auditorías de calidad y compañías de seguros).",
      icon: "description",
      status: "Certificación",
      statusIcon: "verified",
      bg: "bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20"
    }
  ];

  return (
    <section className="bg-white py-20 md:py-28 font-plex">
      <Container>
        <SectionHead
          eyebrow="¿Por qué es vital?"
          title="¿Por qué es Obligatorio Limpiar tu Campana en Alicante?"
          lead="La normativa vigente en la Comunidad Valenciana exige una limpieza técnica profesional certificada. No dejes el futuro de tu establecimiento en manos de la suerte."
        />

        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-line md:grid-cols-3">
          {problems.map((problem, idx) => (
            <div key={idx} className={`flex flex-col bg-white ${idx > 0 ? 'border-t border-line md:border-t-0 md:border-l' : ''}`}>
              <div className="flex h-[200px] items-center justify-center border-b border-line bg-mist [background-image:radial-gradient(#dfe3ea_1px,transparent_1px)] [background-size:14px_14px]">
                {React.createElement(VISUALES[idx])}
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
              <span className="material-symbols-outlined mb-4 text-[24px] text-brand" aria-hidden="true">{problem.icon}</span>
              <h3 className="text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {problem.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {problem.description}
              </p>
              <div className="mt-auto pt-8">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-mist px-2.5 py-1 font-mono text-[11.5px] text-ink-3">
                  <span className="material-symbols-outlined text-[15px] text-brand">{problem.statusIcon}</span> {problem.status}
                </span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProblemSection;
