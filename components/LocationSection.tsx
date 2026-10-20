
import React from 'react';
import { CIUDADES } from '../data/cobertura';
import MapaCobertura from './MapaCobertura';

const LocationSection: React.FC = () => {
  // Fuente única de verdad: data/cobertura.ts (Tanda 2, unidad 6).
  // Cambio visual vs versión anterior: "Alicante Capital" pasa a "Alicante" para
  // unificar el display con la constante y el schema. Sin otras diferencias.
  const locations = CIUDADES.map((c) => c.name);

  return (
    <section className="bg-white py-20 md:py-28 font-plex">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow mb-4 inline-flex items-center gap-2" aria-hidden="true"><span className="h-px w-5 bg-brand"></span>Cobertura</span>
          <h2 className="text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Trabajamos en toda la provincia de Alicante
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
            Servicio rápido para hostelería, de lunes a viernes de 8:00 a 20:00. Llegamos a cualquier cocina industrial de la provincia sin costes extra de desplazamiento.
          </p>
        </div>

        <MapaCobertura
          todaLaProvincia={
            <span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1 text-[13px] font-semibold text-white">
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">check_circle</span>
              Toda la Provincia
            </span>
          }
        />
      </div>
    </section>
  );
};

export default LocationSection;
