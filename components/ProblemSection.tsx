
import React from 'react';

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
      description: "Entregamos un Certificado de Limpieza Oficial válido para presentar ante Sanidad, auditorías de calidad y compañías de seguros.",
      icon: "description",
      status: "Certificación",
      statusIcon: "verified",
      bg: "bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20"
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">¿Por qué es vital?</span>
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-8">
            Más que limpieza, es la <span className="text-primary">salud legal</span> de su negocio
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            No deje el futuro de su establecimiento en manos de la suerte. La normativa actual exige una limpieza técnica profesional certificada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className={`group relative flex flex-col gap-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 p-10 transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2`}>
              <div className={`flex items-center justify-center w-20 h-20 rounded-2xl ${problem.bg} border mb-2 group-hover:scale-110 transition-transform duration-500`}>
                <span className="material-symbols-outlined text-[40px]">{problem.icon}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-slate-900 dark:text-white text-2xl font-black leading-tight">
                  {problem.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed">
                  {problem.description}
                </p>
              </div>
              <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-700">
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 ${problem.bg.split(' ')[1]}`}>
                  <span className="material-symbols-outlined text-lg">{problem.statusIcon}</span> {problem.status}
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
