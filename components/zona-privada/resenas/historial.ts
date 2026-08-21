// Listado local de reseñas pedidas. Vive sólo en el navegador de Jaime:
// sin backend, sin API, sin envío de datos a ningún sitio.
//
// Todas las funciones tragan sus errores y devuelven un resultado utilizable.
// Si localStorage está lleno, bloqueado o el JSON corrupto, la herramienta
// tiene que seguir enviando por WhatsApp igual.

export interface EntradaResena {
  id: string;
  nombre: string;
  negocio: string;
  telefono: string;
  telefonoNormalizado: string;
  servicio: string;
  fechaISO: string;
}

const CLAVE = 'afondo_resenas_v1';

const esEntrada = (v: unknown): v is EntradaResena =>
  typeof v === 'object' && v !== null && typeof (v as EntradaResena).id === 'string';

export function leerHistorial(): EntradaResena[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    return datos.filter(esEntrada);
  } catch {
    return [];
  }
}

function escribir(entradas: EntradaResena[]): boolean {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(entradas));
    return true;
  } catch {
    return false;
  }
}

export function guardarEntrada(
  datos: Omit<EntradaResena, 'id' | 'fechaISO'>
): { ok: boolean; entradas: EntradaResena[] } {
  const entrada: EntradaResena = {
    ...datos,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fechaISO: new Date().toISOString(),
  };
  const entradas = [entrada, ...leerHistorial()];
  const ok = escribir(entradas);
  return { ok, entradas: ok ? entradas : leerHistorial() };
}

export function borrarEntrada(id: string): EntradaResena[] {
  const entradas = leerHistorial().filter((e) => e.id !== id);
  escribir(entradas);
  return entradas;
}
