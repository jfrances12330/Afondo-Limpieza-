
import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const phone = "622 064 101";
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-12 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Inicio
        </button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Contacto y Ubicación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Estamos en Alicante y damos servicio a toda la provincia. Contacta con nosotros para cualquier duda técnica o presupuesto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Datos de Interés
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Teléfono Directo</p>
                    <a href={`tel:+34622064101`} className="text-xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">WhatsApp Business</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-black text-slate-900 dark:text-white hover:text-green-500 transition-colors">
                      Enviar Mensaje
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Horario Comercial</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Lunes a Viernes</p>
                    <p className="text-slate-500 dark:text-slate-400">08:30 – 19:30 (Atención continua)</p>
                    <p className="text-xs text-primary font-bold mt-1 uppercase tracking-tighter">Atención de Urgencias 24h para Clientes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Zona de Servicio</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Alicante y Provincia</p>
                    <p className="text-slate-500 dark:text-slate-400 italic">Desplazamiento incluido en presupuestos aceptados.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 flex flex-col gap-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">verified</span>
                Higiene Certificada
              </h3>
              <p className="text-white/80">
                Somos una empresa autorizada para la emisión de certificados oficiales UNE 100165 en la Comunidad Valenciana.
              </p>
            </div>
          </div>

          {/* Map Card - Corrected URL */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden h-[500px] lg:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d50060.10443048563!2d-0.5283995893114972!3d38.348983944747715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6235864340d6e7%3A0xf657df65403756d8!2sAlicante!5e0!3m2!1ses!2ses!4v1714383745239!5m2!1ses!2ses" 
              className="w-full h-full rounded-2xl grayscale contrast-125 dark:invert dark:grayscale"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Alicante - Zona de Servicio Afondo Limpieza"
            ></iframe>
          </div>
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[2.5rem] text-center border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-4">¿Preparado para tu inspección de Sanidad?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">No te arriesgues. Pide tu presupuesto ahora y cumple con la normativa legal vigente.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-lg">
            Solicitar Auditoría por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
