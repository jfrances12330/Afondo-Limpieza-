
import React from 'react';

interface LegalProps {
  onBack: () => void;
}

const Cookies: React.FC<LegalProps> = ({ onBack }) => {
  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-12 hover:gap-3 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Inicio
        </button>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12">Política de Cookies</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>Este sitio web utiliza cookies propias y de terceros para mejorar la navegación y obtener datos estadísticos.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">1. ¿Qué son las cookies?</h3>
          <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Tipos de cookies que utilizamos</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento de la web (gestión de sesión, navegación).</li>
            <li><strong>Cookies de análisis:</strong> Permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico del uso que hacen los usuarios del servicio ofertado.</li>
            <li><strong>Cookies de personalización:</strong> Permiten al usuario acceder al servicio con algunas características generales predefinidas (ej: modo oscuro/claro).</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. Cómo desactivar las cookies</h3>
          <p>Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
            <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong>Safari:</strong> Preferencias &gt; Privacidad.</li>
          </ul>
          
          <p className="mt-8 italic">Si bloquea el uso de cookies en su navegador es posible que algunos servicios o funcionalidades de la página web no estén disponibles.</p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;