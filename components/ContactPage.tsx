
import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const phone = "622 06 41 01";
  const email = "hola@limpiezadecampanas.com";
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
      "email": "hola@limpiezadecampanas.com",
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
          className="flex items-center gap-2 text-primary font-bold mb-12 hover:gap-3 transition-all group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Map & Location */}
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl bg-slate-100 min-h-[400px] lg:min-h-0">
              <iframe 
                src="https://maps.google.com/maps?q=Partida%20Canastell%20E17%20San%20Vicente%20del%20Raspeig%20Alicante&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Afondo Limpieza en Alicante"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">pin_drop</span>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                Sede central: <br />
                <span className="font-normal text-slate-500 dark:text-slate-400">{address}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Contact Options & Authorized Seal */}
          <div className="flex flex-col gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex-1 flex flex-col">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">contact_support</span>
                Vías Rápidas
              </h2>
              
              <div className="space-y-10 flex-1">
                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">call</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Llamada Directa</p>
                    <a href={`tel:+34622064101`} className="text-2xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors tracking-tight">
                      {phone}
                    </a>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Atención técnica inmediata 24h</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-green-100 p-4 rounded-2xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">chat</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">WhatsApp Business</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-slate-900 dark:text-white hover:text-green-600 transition-colors tracking-tight">
                      Enviar Mensaje
                    </a>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Presupuestos online sin compromiso</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">mail</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Email Oficial</p>
                    <a href={`mailto:${email}`} className="text-lg md:text-xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis leading-none block">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-6 rounded-2xl transition-all shadow-[0_15px_30px_rgba(26,26,255,0.25)] hover:shadow-[0_20px_40px_rgba(26,26,255,0.35)] text-lg uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined">description</span>
                  Presupuesto por WhatsApp
                </a>
              </div>
            </div>
            
            {/* Servicio Autorizado Card */}
            <div className="bg-slate-900 dark:bg-primary p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <span className="material-symbols-outlined text-5xl text-yellow-400">verified</span>
              </div>
              <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-xl font-black uppercase tracking-wider">
                  Servicio Autorizado
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-medium">
                  Empresa líder en desengrase técnico en la CV. Emitimos <strong className="text-white">certificados oficiales</strong> de limpieza técnica válidos para Sanidad y auditorías.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
