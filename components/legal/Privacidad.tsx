
import React from 'react';

interface LegalProps {
  onBack: () => void;
}

const Privacidad: React.FC<LegalProps> = ({ onBack }) => {
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
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12">Política de Privacidad</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>De conformidad con lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos sobre el tratamiento de sus datos:</p>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">1. Responsable del Tratamiento</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identidad:</strong> Jaime Gascón López</li>
            <li><strong>NIF:</strong> 53978208-Z</li>
            <li><strong>Dirección:</strong> Partida Canastell, E17, 03690, San Vicente del Raspeig, Alicante</li>
            <li><strong>Email:</strong> hola@limpiezadecampanas.com</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Finalidad del Tratamiento</h3>
          <p>Tratamos la información que nos facilita con las siguientes finalidades:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Gestionar la solicitud de presupuestos y contacto realizada a través de la web o WhatsApp.</li>
            <li>Prestar los servicios contratados de limpieza y mantenimiento industrial.</li>
            <li>Cumplir con las obligaciones legales derivadas de nuestra actividad.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. Legitimación</h3>
          <p>La base legal para el tratamiento de sus datos es el consentimiento del interesado al contactar con nosotros o la ejecución de un contrato de servicios en caso de contratación.</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">4. Conservación de Datos</h3>
          <p>Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales (generalmente 5 años para acciones personales o lo que estipule la normativa tributaria).</p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">5. Derechos</h3>
          <p>Usted tiene derecho a obtener confirmación sobre si estamos tratando sus datos personales. Puede ejercer sus derechos de:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Acceso:</strong> Consultar qué datos tenemos de usted.</li>
            <li><strong>Rectificación:</strong> Modificar datos inexactos.</li>
            <li><strong>Supresión (Derecho al olvido):</strong> Solicitar la eliminación de sus datos.</li>
            <li><strong>Limitación y Oposición:</strong> Restringir el uso de sus datos.</li>
            <li><strong>Portabilidad:</strong> Recibir sus datos en formato electrónico.</li>
          </ul>
          <p>Para ejercer estos derechos, puede enviar un email a <strong>hola@limpiezadecampanas.com</strong> adjuntando copia de su DNI.</p>
        </div>
      </div>
    </section>
  );
};

export default Privacidad;
