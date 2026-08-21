// Listado de reseñas pedidas.
//
// Vive en DOS sitios a la vez, y ese es el diseño:
//
//   · `localStorage` — la copia de este aparato. Es la que manda para que la
//     herramienta funcione: si no hay internet, o el servidor no contesta, o
//     falla cualquier cosa, Jaime sigue enviando por WhatsApp igual.
//   · el servidor (`/listado.php`) — la copia común. Es la que hace que lo
//     que apunta Jaime en el móvil le salga a Jorge en el PC.
//
// Todas las funciones tragan sus errores y devuelven algo utilizable. Ninguna
// puede lanzar hacia arriba: el enviar por WhatsApp no depende de esto.

import { ACCESS_CODE } from '../acceso';

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
const RUTA = '/listado.php';
const ESPERA_MS = 8000;

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
): { ok: boolean; entrada: EntradaResena; entradas: EntradaResena[] } {
  const entrada: EntradaResena = {
    ...datos,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fechaISO: new Date().toISOString(),
  };
  const entradas = [entrada, ...leerHistorial()];
  const ok = escribir(entradas);
  return { ok, entrada, entradas: ok ? entradas : leerHistorial() };
}

export function borrarEntrada(id: string): EntradaResena[] {
  const entradas = leerHistorial().filter((e) => e.id !== id);
  escribir(entradas);
  return entradas;
}

// Manda al servidor lo que este aparato tenga de nuevo o haya borrado, y se
// queda con la lista común que devuelve. `null` = no se ha podido hablar con
// el servidor; el que llama sigue con su copia local y lo dice en pantalla.
export async function sincronizar(
  opciones: { nuevas?: EntradaResena[]; borrar?: string[] } = {}
): Promise<EntradaResena[] | null> {
  const corte = new AbortController();
  const reloj = setTimeout(() => corte.abort(), ESPERA_MS);
  try {
    const respuesta = await fetch(RUTA, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codigo: ACCESS_CODE,
        nuevas: opciones.nuevas ?? [],
        borrar: opciones.borrar ?? [],
      }),
      signal: corte.signal,
    });
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();
    if (!datos?.ok || !Array.isArray(datos.entradas)) return null;

    const entradas = datos.entradas.filter(esEntrada);
    escribir(entradas);
    return entradas;
  } catch {
    return null;
  } finally {
    clearTimeout(reloj);
  }
}
