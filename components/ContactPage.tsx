
import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const phone = "622 06 41 01";
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const address = "Partida Canastell, E17, 03690 San Vicente del Raspeig, Alicante";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Afondo - Limpieza de campanas",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqkJXK7dDEL0GKvACYNXCL8-7_klRe300_2g0SPv0F-bIV3MY5ueoBz7yGF1ZXHwuGgA13KFHbBqpSw6jGtNGA6p7qwY_5oakgwZzidkDVFvXMXvkqzeJ6MiNQ0GUzTJuyb5d9otC5eYHvwJpSzcUk9Qt-yGIG1HhLWD9EGHtQmlcM7RXTF2juJ45ZXVIiEAExs9ugW0PQ6fl69jW1Elr4FMI4loaIL58c9-M-X3XgTn1OxpfvKmegoPECcf9-eTpH2Dh_B-NXNo",
      "telephone": "+34622064101",
      "email": "contacto@afondolimpiezadecampanas.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Partida Canastell, E17",
        "addressLocality": "San Vicente del Raspeig",
        "postalCode": "03690",
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
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
            Contacto Directo
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Estamos en Alicante y damos servicio a toda la provincia. Envíenos su solicitud y recibirá respuesta en menos de 1h vía WhatsApp o teléfono.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Maps Section */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl bg-slate-100 h-[450px]">
              <iframe 
                src="https://maps.google.com/maps?q=Partida%20Canastell%20E17%20San%20Vicente%20del%20Raspeig%20Alicante&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Afondo Limpieza en Alicante"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <div className="flex items-center gap-3 px-6">
              <span className="material-symbols-outlined text-primary">pin_drop</span>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Sede central: {address}
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-4xl">contact_support</span>
                Vías Rápidas
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <span className="material-symbols-outlined text-3xl">call</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Llamada Directa</p>
                    <a href={`tel:+34622064101`} className="text-2xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors">
                      {phone}
                    </a>
                    <p className="text-slate-500 text-sm mt-1 italic">Atención técnica inmediata 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                    <span className="material-symbols-outlined text-3xl">chat</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Business</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-slate-900 dark:text-white hover:text-green-500 transition-colors">
                      Enviar Mensaje
                    </a>
                    <p className="text-slate-500 text-sm mt-1 italic">Presupuestos online sin compromiso</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                    <span className="material-symbols-outlined text-3xl">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email Oficial</p>
                    <a href="mailto:contacto@afondolimpiezadecampanas.com" className="text-xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors break-all">
                      contacto@afondolimpiezadecampanas.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-6 rounded-2xl transition-all shadow-xl shadow-primary/20 text-lg uppercase tracking-wider flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">description</span>
                  Presupuesto por WhatsApp
                </a>
              </div>
            </div>
            
            <div className="bg-slate-900 dark:bg-primary p-8 rounded-[2rem] text-white shadow-xl flex flex-col gap-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">verified</span>
                Servicio Autorizado
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Empresa especializada en desengrase técnico. Emitimos certificados oficiales de limpieza técnica para el cumplimiento estricto de la normativa de Sanidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
