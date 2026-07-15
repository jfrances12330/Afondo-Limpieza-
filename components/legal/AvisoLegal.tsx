
import React from 'react';

interface LegalProps {
  onBack: () => void;
}

const AvisoLegal: React.FC<LegalProps> = ({ onBack }) => {
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
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12">Aviso Legal</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se exponen los siguientes datos identificativos del titular de este sitio web:</p>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <ul className="space-y-2">
              <li><strong>Titular:</strong> Jaime Gascón López</li>
              <li><strong>NIF:</strong> 53978208-Z</li>
              <li><strong>Domicilio:</strong> Partida Canastell, E17, 03690, San Vicente del Raspeig, Alicante</li>
              <li><strong>Email:</strong> hola@afondolimpiezadecampanas.com</li>
              <li><strong>Teléfono:</strong> +34 622 06 41 01</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">1. Objeto</h3>
          <p>El presente sitio web tiene como finalidad informar sobre los servicios de limpieza de campanas industriales y mantenimiento de sistemas de extracción ofrecidos por el titular bajo el dominio <strong>afondolimpiezadecampanas.com</strong>.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Propiedad Intelectual</h3>
          <p>El código fuente, los diseños gráficos, las imágenes, las fotografías, los sonidos, las animaciones, el software, los textos, así como la información y los contenidos que se recogen en el presente sitio web están protegidos por la legislación española sobre los derechos de propiedad intelectual e industrial a favor de Jaime Gascón López.</p>
          <p>No se permite la reproducción y/o publicación, total o parcial, del sitio web, ni su tratamiento informático, su distribución, su difusión, ni su modificación, transformación o descompilación, ni demás derechos reconocidos legalmente a su titular, sin el permiso previo y por escrito del mismo.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. Responsabilidad</h3>
          <p>El titular no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">4. Legislación Aplicable y Jurisdicción</h3>
          <p>Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Alicante.</p>
        </div>
      </div>
    </section>
  );
};

export default AvisoLegal;
