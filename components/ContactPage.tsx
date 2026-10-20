
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const phone = "622 06 41 01";
  const email = "hola@afondolimpiezadecampanas.com";
  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";
  const address = "Partida Canastell, E17, 03690 San Vicente del Raspeig, Alicante";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Afondo - Limpieza de campanas",
      "image": "https://afondolimpiezadecampanas.com/img/afondo-limpieza-campanas-alicante-og.jpg",
      "telephone": "+34622064101",
      "email": "hola@afondolimpiezadecampanas.com",
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

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white font-plex text-ink">
      <Navbar
        onNavigateHome={() => navigate('/')}
        onNavigateCalculadora={() => navigate('/calculadora')}
        onNavigateContacto={() => window.scrollTo(0, 0)}
        onNavigateServices={() => navigate('/')}
        currentView="contacto"
      />
    <section className="flex-1 bg-mist py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted transition-colors hover:text-ink"
        >
          <span className="material-symbols-outlined text-[17px] transition-transform group-hover:-translate-x-0.5">arrow_back</span>
          Volver al Inicio
        </button>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-[2.35rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[3rem]">
            Contacto Directo
          </h1>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
            Estamos en Alicante y damos servicio a toda la provincia. Envíenos su solicitud y recibirá respuesta en menos de 1h vía WhatsApp o teléfono.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Vías rápidas */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
              <h2 className="flex items-center gap-2.5 border-b border-line px-6 py-5 text-[1.25rem] font-semibold tracking-[-0.01em] text-ink md:px-8">
                <span className="material-symbols-outlined text-[22px] text-brand">contact_support</span>
                Vías Rápidas
              </h2>

              <div className="flex-1 divide-y divide-line">
                {/* Phone */}
                <div className="flex items-start gap-4 px-6 py-5 md:px-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <span className="material-symbols-outlined text-[21px]">call</span>
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[11.5px] text-muted">Llamada Directa</p>
                    <a href={`tel:+34622064101`} className="tnum text-[1.375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-brand">
                      {phone}
                    </a>
                    <p className="mt-1 text-[14px] text-muted">Atención técnica inmediata 24h</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 px-6 py-5 md:px-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f7ee] text-[#178a45]">
                    <span className="material-symbols-outlined text-[21px]">chat</span>
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[11.5px] text-muted">WhatsApp Business</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-[#178a45]">
                      Enviar Mensaje
                    </a>
                    <p className="mt-1 text-[14px] text-muted">Presupuestos online sin compromiso</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 px-6 py-5 md:px-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-ink-3">
                    <span className="material-symbols-outlined text-[21px]">mail</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 font-mono text-[11.5px] text-muted">Email Oficial</p>
                    <a href={`mailto:${email}`} className="block break-all text-[15px] font-semibold leading-tight text-ink transition-colors hover:text-brand sm:text-[17px]">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-line bg-mist/60 p-5 md:px-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <span className="material-symbols-outlined text-[20px]">description</span>
                  Presupuesto por WhatsApp
                </a>
              </div>
            </div>

            {/* Servicio Autorizado */}
            <div className="flex flex-col items-start gap-4 rounded-xl bg-ink p-6 text-white sm:flex-row md:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <span className="material-symbols-outlined text-[24px] text-signal">verified</span>
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.0625rem] font-semibold">
                  Servicio Autorizado
                </h3>
                <p className="text-[14.5px] leading-relaxed text-slate-300">
                  Empresa líder en desengrase técnico en la CV. Emitimos <strong className="font-semibold text-white">informes técnicos</strong> de limpieza como soporte documental ante Sanidad y auditorías.
                </p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <div className="min-h-[360px] flex-1 bg-mist">
              <iframe
                src="https://maps.google.com/maps?q=Partida%20Canastell%20E17%20San%20Vicente%20del%20Raspeig%20Alicante&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '100%' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Afondo Limpieza en Alicante"
                className="h-full min-h-[360px] w-full grayscale-60"
              ></iframe>
            </div>
            <div className="flex items-center gap-3 border-t border-line px-6 py-5">
              <span className="material-symbols-outlined text-[22px] text-brand">pin_drop</span>
              <p className="text-[14.5px] font-semibold leading-snug text-ink">
                Sede central: <br />
                <span className="font-normal text-muted">{address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
