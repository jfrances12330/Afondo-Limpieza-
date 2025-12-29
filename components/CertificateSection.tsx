
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
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined font-bold" aria-hidden="true">description</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 text-lg uppercase leading-none">AFONDO</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Higiene Industrial</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-black text-slate-900 uppercase">Nº INFORME</span>
                <span className="text-[10px] font-medium text-slate-500">2025-ALC-0842</span>
              </div>
            </div>
            
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Establecimiento</span>
                  <span className="text-[11px] font-bold text-slate-700">Restaurante El Puerto</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Fecha</span>
                  <span className="text-[11px] font-bold text-slate-700">12/03/2025</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-wider">Metodología Técnica</span>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  Limpieza técnica de sistema de extracción según norma <span className="text-primary font-bold">UNE 100165</span>. Aplicación de espuma activa alcalina con cepillado mecánico y aclarado a alta presión (80ºC). Desengrase de plenum y conductos horizontales (14m).
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPqEYgnqF76FfHY6CfvepiqGK49Q7Vj_Zffqk1IAe-vu42K_Yts6udGfdQS223IgYMJd6DPmpClcnyV8nB5ba8OAC46M9TnZuzkVfbLybYJiDW646yg1aFFJtH9xFd0aTVBHPQvfrS2xSy6FHCMfc18wRePbgBxthQ2kDMF7wTzNQ2mvrqhgAoLkcWA6J_y0AYd2EYsUtSaQPNeBKss6rJk2cggvqgVKPC5d4x0cNUTviy2Snu61aPAX2etmyKImXPgqc4WnoK44Q" 
                    alt="Antes" 
                    className="w-full h-full object-cover opacity-50 grayscale"
                    loading="lazy" 
                  />
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase">Estado Inicial</span>
                </div>
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY-uSTLgaPQjgKom4e4tMgDIjPSScys5eAFjAjnTmaB9RvC_xJ1xcxG45S-dvwRGE9wHXeyjjMnRREHlL0PqIOKsUWltQ2Nzrx5IMxLz5AvY1zAzZE-tQnzYAfE0qDSkO7UWwVOnsXSjtqKiPDIP7zsKqa3MUBe0o37bdi9mAooh4kfxpqkB6enAhfKvMUW3Mup6z-kc5KKI2Z6qF2hcRBSuPxIf-5lYZQ7bKRlBEvJH4bdhePxltjckNOHjVb2jzzI_fxbKVilW4" 
                    alt="Después" 
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase">Estado Certificado</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Validez</span>
                  <span className="text-[10px] font-black text-green-600">6 MESES (Garantizado)</span>
                </div>
                <div className="text-center">
                  <div className="w-32 h-px bg-slate-200 mb-2"></div>
                  <span className="text-[10px] font-black text-slate-900 uppercase">Firma Técnico Autorizado</span>
                  <span className="block text-[8px] text-slate-400">Jaime G. L. - Especialista</span>
                </div>
              </div>
            </div>
            
            {/* Visual Sticker Badge */}
            <div className="absolute -bottom-10 -right-6 bg-yellow-400 text-slate-900 w-36 h-36 rounded-full flex flex-col items-center justify-center text-center p-6 shadow-xl border-4 border-white rotate-12 transition-transform group-hover:rotate-0 z-20" aria-hidden="true">
              <span className="font-black text-[10px] leading-[1.1] uppercase mb-1">Pegatina de Próxima Revisión</span>
              <span className="material-symbols-outlined text-2xl my-1">event_available</span>
              <span className="font-bold text-[9px] uppercase tracking-tighter mt-1 bg-black/5 px-2 py-0.5 rounded-full">Septiembre 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
