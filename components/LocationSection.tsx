
import React from 'react';

const LocationSection: React.FC = () => {
  const locations = [
    "Alicante Capital", "Elche", "Benidorm", "Torrevieja", 
    "Orihuela", "Alcoy", "Elda", "Dénia", 
    "San Vicente del Raspeig", "Santa Pola", "Villajoyosa"
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Trabajamos en toda la provincia de Alicante
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-16 max-w-2xl mx-auto">
          Servicio rápido de urgencia 24h para hostelería. Llegamos a cualquier cocina industrial de la provincia sin costes extra de desplazamiento.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {locations.map((location, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl flex items-center justify-center gap-2 hover:border-primary/50 transition-colors group">
              <span className="material-symbols-outlined text-primary text-sm group-hover:scale-125 transition-transform">location_on</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{location}</span>
            </div>
          ))}
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-center gap-2">
            <span className="text-xs font-black text-primary uppercase">Toda la Provincia</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
