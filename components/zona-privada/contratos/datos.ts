// Herramienta de contratos (oct-2026). Texto = plantilla de Jorge
// «Contrato_Mantenimiento_Extraccion_Humos» (20-oct-2026), pegado LITERAL,
// erratas incluidas: Jorge no quiere que se toque nada del texto que puso Jaime
// (20-oct: «si él lo ha puesto así yo no quiero modificar nada»). Los huecos de
// la plantilla son los campos de abajo.

export type Periodicidad = 'Anual' | 'Semestral' | 'Cuatrimestral';
export type Respuesta = '24' | '48';
export type Pago = 'unica' | 'intervencion' | 'domiciliacion';

export const INTERVENCIONES: Record<Periodicidad, number> = { Anual: 1, Semestral: 2, Cuatrimestral: 3 };

export interface Parte {
  nombre: string;
  nif: string;
  direccion: string;   // domicilio social (prestador) / dirección de la cocina (cliente)
  contacto?: string;   // persona de contacto (solo cliente)
  telefono: string;
  email: string;
}

export interface Contrato {
  lugar: string;
  fecha: string;            // AAAA-MM-DD
  prestador: Parte;
  cliente: Parte;
  periodicidad: Periodicidad;
  respuesta: Respuesta;
  precioUnitario: number;   // € sin IVA por intervención
  pago: Pago;
  iban: string;
  firmaPrestador?: string;  // dataURL PNG
  firmaCliente?: string;
}

// Normas que cita la cláusula 1, tal cual en la plantilla. Se avisó de que la
// UNE 100030 es de legionela y Jorge decidió dejarlo (20-oct-2026).
export const NORMAS = 'UNE100030 / UNE15780';

export const IVA = 0.21;

export const importes = (c: Contrato) => {
  const n = INTERVENCIONES[c.periodicidad];
  const base = Math.round(c.precioUnitario * n * 100) / 100;
  const iva = Math.round(base * IVA * 100) / 100;
  return { n, base, iva, total: Math.round((base + iva) * 100) / 100 };
};

export const eur = (v: number) =>
  v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

export const fechaLarga = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d} de ${meses[m - 1]} de ${y}`;
};

export const PAGOS: { id: Pago; titulo: string; texto: string }[] = [
  { id: 'unica', titulo: 'Cuota única anual', texto: 'A la firma del contrato.' },
  { id: 'intervencion', titulo: 'Cuota por intervención', texto: 'Tras la realización de cada servicio y entrega del certificado.' },
  { id: 'domiciliacion', titulo: 'Domiciliación mensual / trimestral', texto: 'Mediante recibo bancario.' },
];

// ── Cláusulas ─────────────────────────────────────────────────────────
// Bloques: 'h' título de cláusula, 'sub' subtítulo, 'p' párrafo, 'li' viñeta
// (con «Etiqueta:» en negrita si trae `b`).
export type Bloque = { t: 'h' | 'sub' | 'p' | 'li'; s: string; b?: string };

export const clausulasAntesDelPrecio = (c: Contrato): Bloque[] => [
  { t: 'h', s: '1. OBJETO DEL CONTRATO' },
  { t: 'p', s: `El objeto del presente contrato es la prestación de servicios de revisión, limpieza técnica especializada y mantenimiento preventivo periódico de la instalación de extracción de humos ubicada en el establecimiento del CLIENTE, comprendiendo campanas extractorasa, plenums, filtros, tramos de conductos de evacuación y caja de extracción/turbina, todo ello de conformidad con la normativa vigente en materia de seguridad, protección contra incendios y la norma ${NORMAS}.` },
  { t: 'h', s: '2. COBERTURAS Y SERVICIOS INCLUIDOS' },
  { t: 'p', s: `El servicio contratado comprende la realización de intervenciones de mantenimiento preventivo con una periodicidad ${c.periodicidad}, e incluye expresamente las siguientes actuaciones:` },
  { t: 'sub', s: 'A. Limpieza Integral Periódica' },
  { t: 'li', b: 'Campana Extractora y Plenum:', s: 'Desengrase profundo mediante inyección de espuma alcalina / detergentes específicos de grado alimentario y aclarado a alta temperatura.' },
  { t: 'li', b: 'Filtros:', s: 'Decapado, desengrase e higienización de los filtros metálicos de retención.' },
  { t: 'li', b: 'Conductos de Evacuación:', s: 'Limpieza técnica de tramos accesibles e inspección mediante cepillado neumático/mecánico y extracción de sedimentos grasos.' },
  { t: 'li', b: 'Caja de Extracción y Turbina:', s: 'Desengrase del interior de la caja de extracción, limpiezas de álabes del rodete y eliminación de acumulaciones que puedan desequilibrar el motor.' },
  { t: 'sub', s: 'B. Revisiones Técnicas Periódicas' },
  { t: 'li', s: 'Inspección visual general del estado de conservación de los equipos y componentes.' },
  { t: 'li', s: 'Comprobación de holguras mecánicas y fijaciones.' },
  { t: 'li', s: 'Verificación de la tensión y estado de las correas de transmisión.' },
  { t: 'li', s: 'Inspección técnica del estado de los rodamientos y cojinetes.' },
  { t: 'li', s: 'Medición e inspección de consumos eléctricos del motor (amperaje y voltaje) y comprobación de tiro mecánico/caudal de evacuación.' },
  { t: 'sub', s: 'C. Certificación y Documentación' },
  { t: 'li', s: 'Finalizada cada intervención periódica, el PRESTADOR emitirá un Certificado Técnico de Limpieza y Mantenimiento, con validez ante las Inspecciones de Sanidad, Autoridades Municipales y Compañías Aseguradoras.' },
  { t: 'sub', s: 'D. Atención Prioritaria' },
  { t: 'li', s: `El CLIENTE dispondrá de un servicio de atención prioritaria para la recepción y gestión de avisos técnicos o incidencias en la instalación, garantizando respuesta en un plazo máximo de ${c.respuesta} horas laborables.` },
  { t: 'h', s: '3. EXCLUSIONES' },
  { t: 'p', s: 'Quedan expresamente excluidos de la cobertura del presente contrato los siguientes conceptos:' },
  { t: 'li', s: 'El coste de sustitución de piezas, repuestos, motores, correas, rodamientos, filtros de carbón activo o cualesquiera otros componentes de la instalación.' },
  { t: 'li', s: 'Reparaciones correctivas derivadas del desgaste natural de los equipos, sobretensiones eléctricas, manipulación indebida o causas ajenas al mantenimiento preventivo.' },
  { t: 'li', s: 'Trabajos de puesta a punto inicial o acondicionamiento previo si la instalación presenta una acumulación extrema de grasa u obstrucciones graves anteriores a la firma de este documento.' },
  { t: 'h', s: '4. PRECIO Y FORMA DE PAGO' },
  { t: 'p', s: 'El precio total convenido por los servicios descritos asciende a la cantidad total anual señalada a continuación, más el Impuesto sobre el Valor Añadido IVA correspondiente.' },
];

export const clausulaDuracion: Bloque[] = [
  { t: 'h', s: '5. DURACIÓN Y RENOVACIÓN' },
  { t: 'p', s: 'El presente contrato entrará en vigor el día de su firma y tendrá una duración determinada de un 1 año. El contrato se renovará automáticamente por periodos anuales sucesivos salvo que cualquiera de las partes manifieste por escrito su voluntad de no renovarlo, con una antelación mínima de treinta 30 días naturales a la fecha de vencimiento del periodo inicial o de cualquiera de sus prórrogas.' },
];

export const CONFORMIDAD = 'En prueba de conformidad con todo lo expuesto, ambas partes firman el presente contrato por duplicado ejemplar en el lugar y fecha indicados en el encabezado.';
