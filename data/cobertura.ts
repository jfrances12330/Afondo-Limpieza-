// Lista canónica única de cobertura geográfica de Afondo (Tanda 2).
// Punto único de edición: al confirmar con Jaime, se toca aquí y se propaga a
// LocationSection, Footer schema, y schemas de todas las páginas de servicio.

export interface Ciudad {
  name: string;   // Nombre para display y para @type: City en schema
}

/** 15 ciudades canónicas + Provincia. Lista provisional (pendiente confirmación Jaime). */
export const CIUDADES: Ciudad[] = [
  { name: "Alicante" },
  { name: "Alcoy" },
  { name: "Altea" },
  { name: "Benidorm" },
  { name: "Dénia" },
  { name: "El Campello" },
  { name: "Elche" },
  { name: "Elda" },
  { name: "Guardamar" },
  { name: "Jávea" },
  { name: "Orihuela" },
  { name: "San Vicente del Raspeig" },
  { name: "Santa Pola" },
  { name: "Torrevieja" },
  { name: "Villajoyosa" },
];

export const PROVINCIA_NAME = "Provincia de Alicante";

/** Genera el array `areaServed` para schema.org (City[] + AdministrativeArea). */
export function areaServedSchema() {
  return [
    ...CIUDADES.map((c) => ({ "@type": "City", name: c.name })),
    { "@type": "AdministrativeArea", name: PROVINCIA_NAME },
  ];
}
