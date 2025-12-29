
import React from 'react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Evita posibles multas de Sanidad",
      description: "Las infracciones graves por falta de higiene pueden suponer multas de hasta 60.000€ y el cierre de tu local según la normativa vigente.",
      icon: "request_quote",
      status: "RIESGO ECONÓMICO",
      statusIcon: "warning",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400"
    },
    {
      title: "Prevención de Incendios",
      description: "La grasa acumulada en los conductos es altamente inflamable. Cumplimos estrictamente el CTE DB-SI para garantizar la seguridad de tu negocio.",
      icon: "local_fire_department",
      status: "SEGURIDAD CRÍTICA",
      statusIcon: "security",
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400"
    },
    {
      title: "Garantía ante Inspecciones",
      description: "Entregamos un Certificado de Limpieza Oficial válido para presentar ante Sanidad, auditorías de calidad y compañías de seguros.",
      icon: "verified_user",
      status: "CUMPLIMIENTO LEGAL",
      statusIcon: "check_circle",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Seguridad y Legalidad</span>
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Conciencia sobre el riesgo real y la legalidad
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No es solo limpieza, es la protección jurídica y física de tu establecimiento hostelero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className="group relative flex flex-col gap-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-8 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl">
              <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${problem.bg} ${problem.text} mb-2`}>
                <span className="material-symbols-outlined text-[32px]">{problem.icon}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
                  {problem.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed">
                  {problem.description}
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                <span className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 ${problem.text}`}>
                  <span className="material-symbols-outlined text-[18px]">{problem.statusIcon}</span> {problem.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
