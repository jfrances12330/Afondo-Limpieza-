
import React from 'react';

const CertificateSection: React.FC = () => {
  const points = [
    "Certificado de Limpieza firmado por técnico competente.",
    "Informe fotográfico del 'Antes y Después' detallado.",
    "Detalle de productos desengrasantes alcalinos certificados.",
    "Metodología aplicada según norma UNE.",
    "Pegatina de 'Campana Limpia' con fecha de próxima revisión."
  ];

  return (
    <section className="bg-primary py-24 relative overflow-hidden" aria-labelledby="certificado-titulo">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
              <span>Valor Diferencial</span>
            </div>
            <h2 id="certificado-titulo" className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Tu Certificado Oficial <br /> de Limpieza
            </h2>
            <p className="text-white/80 text-lg mb-10">
              No solo limpiamos, certificamos. Al finalizar el trabajo, recibirás un informe técnico completo que tu seguro y Sanidad te exigirán para cumplir la normativa.
            </p>
            
            <ul className="space-y-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white">
                  <div className="mt-1 bg-white/20 p-1 rounded-full">
                    <span className="material-symbols-outlined text-sm font-bold" aria-hidden="true">check</span>
                  </div>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group" role="img" aria-label="Ejemplo visual de informe técnico de limpieza industrial">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined font-bold" aria-hidden="true">description</span>
                </div>
                <span className="font-black text-slate-900 text-xl">Informe Técnico</span>
              </div>
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Modelo Oficial</span>
            </div>
            
            <div className="space-y-6">
              <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-full w-full"></div>
              <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
              
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-3xl" aria-hidden="true">photo_camera</span>
                  <span className="text-[10px] font-bold mt-2 uppercase">Antes</span>
                </div>
                <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:border-green-300 transition-colors">
                  <span className="material-symbols-outlined text-3xl" aria-hidden="true">photo_camera</span>
                  <span className="text-[10px] font-bold mt-2 uppercase text-green-500">Después</span>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <div className="text-center">
                  <div className="w-32 h-1 bg-slate-200 mb-2" aria-hidden="true"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Firma Técnico Certificado</span>
                </div>
              </div>
            </div>
            
            {/* Visual Sticker Badge */}
            <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-slate-900 w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-xl border-4 border-white rotate-12" aria-hidden="true">
              <span className="font-black text-[10px] leading-tight uppercase">Pegatina de Próxima Revisión</span>
              <span className="material-symbols-outlined text-2xl my-1">event_available</span>
              <span className="font-bold text-[8px] uppercase">Garantía Afondo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
