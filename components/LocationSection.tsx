
import React from 'react';
import { CIUDADES } from '../data/cobertura';

const LocationSection: React.FC = () => {
  // Fuente única de verdad: data/cobertura.ts (Tanda 2, unidad 6).
  // Cambio visual vs versión anterior: "Alicante Capital" pasa a "Alicante" para
  // unificar el display con la constante y el schema. Sin otras diferencias.
  const locations = CIUDADES.map((c) => c.name);

  return (
    <section className="bg-white py-20 md:py-28 font-plex">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow mb-4 inline-flex items-center gap-2" aria-hidden="true"><span className="h-px w-5 bg-brand"></span>Cobertura</span>
          <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Trabajamos en toda la provincia de Alicante
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
            Servicio rápido de urgencia 24h para hostelería. Llegamos a cualquier cocina industrial de la provincia sin costes extra de desplazamiento.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="flex items-center gap-2 border-b border-line bg-mist px-5 py-3" aria-hidden="true">
            <span className="material-symbols-outlined text-[18px] text-brand">map</span>
            <span className="font-mono text-[11.5px] text-muted">Provincia de Alicante</span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3">
            {locations.map((location, idx) => (
              <li key={idx} className="flex items-center gap-2 border-b border-r border-line px-4 py-3 text-[14px] text-ink-2 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                <span>{location}</span>
              </li>
            ))}
            <li className="col-span-1 flex items-center gap-2 bg-brand-soft px-4 py-3 sm:col-span-3">
              <span className="material-symbols-outlined text-[17px] text-brand" aria-hidden="true">check_circle</span>
              <span className="text-[14px] font-semibold text-brand">Toda la Provincia</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
