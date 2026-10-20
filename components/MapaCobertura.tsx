import React, { useState } from 'react';
import { CIUDADES } from '../data/cobertura';

/**
 * Mapa de cobertura (restyling oct-2026). Costa trazada a mano a partir de
 * coordenadas reales; los pueblos van en su latitud/longitud. La lista de
 * nombres (lo que lee Google) está debajo del mapa; el SVG es decorativo.
 */
const COORD: Record<string, [number, number, number, number]> = {
  // nombre: [lat, lon, dx etiqueta, dy etiqueta]
  'Alicante': [38.3452, -0.4810, 8, 14],
  'Alcoy': [38.6983, -0.4736, 8, 4],
  'Altea': [38.5990, -0.0518, -34, -8],
  'Benidorm': [38.5411, -0.1225, 8, 12],
  'Dénia': [38.8408, 0.1057, -38, -8],
  'El Campello': [38.4286, -0.3975, 8, 4],
  'Elche': [38.2669, -0.6984, -36, 4],
  'Elda': [38.4776, -0.7917, -28, 4],
  'Guardamar': [38.0897, -0.6551, 8, 4],
  'Jávea': [38.7896, 0.1663, -36, 14],
  'Orihuela': [38.0848, -0.9440, 8, -6],
  'San Vicente del Raspeig': [38.3964, -0.5253, -72, -8],
  'Santa Pola': [38.1916, -0.5658, 8, 4],
  'Torrevieja': [37.9787, -0.6822, 8, 4],
  'Villajoyosa': [38.5075, -0.2335, -58, 16],
};
const COSTA: [number, number][] = [
  [37.86, -0.79], [37.98, -0.68], [38.09, -0.65], [38.16, -0.60], [38.19, -0.56], [38.23, -0.52],
  [38.33, -0.49], [38.35, -0.47], [38.40, -0.41], [38.43, -0.39], [38.47, -0.33], [38.50, -0.23],
  [38.53, -0.15], [38.54, -0.12], [38.57, -0.07], [38.60, -0.05], [38.63, 0.03], [38.65, 0.07],
  [38.70, 0.14], [38.73, 0.23], [38.79, 0.20], [38.84, 0.11], [38.88, 0.04], [38.93, -0.02],
];
const W = 560, H = 440, LON0 = -1.08, LON1 = 0.3, LAT0 = 37.84, LAT1 = 38.96;
const px = (lat: number, lon: number): [number, number] => [((lon - LON0) / (LON1 - LON0)) * W, ((LAT1 - lat) / (LAT1 - LAT0)) * H];

const MapaCobertura: React.FC<{ todaLaProvincia: React.ReactNode }> = ({ todaLaProvincia }) => {
  const [activo, setActivo] = useState<string | null>(null);
  const costa = COSTA.map(([la, lo]) => px(la, lo));
  const tierra = `M0,0 L${costa[costa.length - 1][0]},0 ` + [...costa].reverse().map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(' ') + ` L${costa[0][0]},${H} L0,${H} Z`;
  const linea = costa.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line bg-mist px-5 py-3" aria-hidden="true">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-brand">map</span>
          <span className="font-mono text-[11.5px] text-muted">Provincia de Alicante</span>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span className="h-2 w-2 rounded-full bg-brand ring-4 ring-brand/15"></span> 15 + provincia
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full bg-[#eaf1fb]" aria-hidden="true">
        <defs>
          <pattern id="olas" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 q3.5 -3 7 0 t7 0" fill="none" stroke="#d3e0f3" strokeWidth="1" />
          </pattern>
          <pattern id="relieve" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".8" fill="#e3e6eb" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#olas)" />
        <path d={tierra} fill="#fbfbfa" />
        <path d={tierra} fill="url(#relieve)" />
        <path d={linea} fill="none" stroke="#b9c4ff" strokeWidth="1.5" />
        <text x={W - 130} y={H - 40} className="fill-[#9fb0d6] font-mono" fontSize="11" letterSpacing="2">MAR</text>
        <text x={W - 130} y={H - 26} className="fill-[#9fb0d6] font-mono" fontSize="11" letterSpacing="2">MEDITERRÁNEO</text>
        {CIUDADES.map(({ name }) => {
          const c = COORD[name]; if (!c) return null;
          const [x, y] = px(c[0], c[1]);
          const base = name === 'San Vicente del Raspeig';
          const on = activo === name;
          return (
            <g key={name} opacity={activo && !on ? 0.35 : 1} style={{ transition: 'opacity .2s' }}>
              {base && <circle cx={x} cy={y} r="14" fill="#1f35d1" opacity=".12" />}
              <circle cx={x} cy={y} r={base || on ? 6 : 4.5} fill={base ? '#1f35d1' : '#fff'} stroke="#1f35d1" strokeWidth="2" />
              <text x={x + c[2]} y={y + c[3]} fontSize="11.5" className="fill-ink-2 font-plex" fontWeight={base || on ? 600 : 400}>
                {name === 'San Vicente del Raspeig' ? 'San Vicente' : name}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="flex flex-wrap gap-1.5 border-t border-line p-4">
        {CIUDADES.map(({ name }) => (
          <li key={name}>
            <span
              onMouseEnter={() => setActivo(name)}
              onMouseLeave={() => setActivo(null)}
              className={`inline-flex cursor-default items-center gap-1.5 rounded-md border px-2.5 py-1 text-[13px] transition-colors ${activo === name ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-white text-ink-2'}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true"></span>
              {name}
            </span>
          </li>
        ))}
        <li>{todaLaProvincia}</li>
      </ul>
    </div>
  );
};

export default MapaCobertura;
