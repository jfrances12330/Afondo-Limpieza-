
import React, { useState } from 'react';
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
// Legales, Calculadora y ContactPage vivieron aquí como estado; en Tanda 2 (unidad 5)
// pasan todas a rutas propias en index.tsx.
// TestimonialsSection desactivado en tanda 0 (testimonios inventados). Reintroducir con reseñas REALES.

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/34622064101?text=Hola,%20quisiera%20pedir%20presupuesto%20para%20la%20limpieza%20de%20mi%20campana.";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
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
        <section className="bg-primary/5 dark:bg-primary/10 py-16 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">¿Cuánto cuesta limpiar tu campana?</h3>
              <p className="text-slate-600 dark:text-slate-400">Descúbrelo ahora con nuestra calculadora inteligente en solo 1 minuto.</p>
            </div>
            <button
              onClick={() => navigate('/calculadora')}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Calcular precio online
            </button>
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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_25px_rgba(34,197,94,0.4)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform">chat</span>
      </a>
    </div>
  );
};

export default App;
