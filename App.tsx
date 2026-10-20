
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ResultsSection from './components/ResultsSection';
import ServicesSection from './components/ServicesSection';
import CertificateSection from './components/CertificateSection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import FAQSection from './components/FAQSection';
import { WhatsAppFab } from './components/ui';
// Legales, Calculadora y ContactPage vivieron aquí como estado; en Tanda 2 (unidad 5)
// pasan todas a rutas propias en index.tsx.
// TestimonialsSection desactivado en tanda 0 (testimonios inventados). Reintroducir con reseñas REALES.

const App: React.FC = () => {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";

  return (
    <div className="flex flex-col min-h-screen bg-white font-plex text-ink">
      <Navbar
        onNavigateHome={() => { window.scrollTo(0, 0); }}
        onNavigateCalculadora={() => navigate('/calculadora')}
        onNavigateContacto={() => navigate('/contacto')}
        onNavigateServices={() => scrollToSection('servicios')}
        currentView="home"
      />

      <main className="flex-1">
        <div id="inicio">
          <Hero
            onNavigateServices={() => scrollToSection('servicios')}
            onNavigateCalculadora={() => navigate('/calculadora')}
          />
        </div>
        <div id="problema">
          <ProblemSection />
        </div>
        <div id="servicios">
          <ServicesSection onNavigateCalculadora={() => navigate('/calculadora')} />
        </div>
        <div id="certificado">
          <CertificateSection />
        </div>
        <div id="resultados">
          <ResultsSection />
        </div>
        <section className="bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 rounded-xl border border-line bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">calculate</span>
                </span>
                <div>
                  <h3 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink">¿Cuánto cuesta limpiar tu campana?</h3>
                  <p className="mt-1 text-[15px] text-muted">Descúbrelo ahora con nuestra calculadora inteligente en solo 1 minuto.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/calculadora')}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Calcular precio online
                <span className="material-symbols-outlined text-[19px]" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
        {/* Sección testimonios desactivada en tanda 0 — reintroducir con reseñas reales de Google Business */}
        <div id="faq">
          <FAQSection />
        </div>
        <div id="ubicaciones">
          <LocationSection />
        </div>
        <div id="contacto-seccion">
          <ContactSection onNavigate={() => navigate('/contacto')} />
        </div>
      </main>

      <Footer />

      <CookieBanner onManage={() => navigate('/cookies')} />

      <WhatsAppFab href={whatsappUrl} />
    </div>
  );
};

export default App;
