// Texto aprobado por Jorge 21-ago-2026 (opción A). No modificar sin OK explícito.
//
// Este fichero es el único sitio donde vive el mensaje. La interfaz y el historial
// no lo reescriben: sólo sustituyen {NOMBRE} y {SERVICIO}.

const PLANTILLA = `Hola {NOMBRE} 😊
Soy Jaime, de Afondo. ¡Gracias por confiar en nosotros para {SERVICIO}! Espero que todo haya quedado a tu gusto.

Te pido un favor pequeñito: somos un negocio de aquí, de Alicante, y las reseñas en Google son lo que hace que otros clientes de la zona nos encuentren. ¿Me dejas dos líneas contando qué tal fue? Y si te acuerdas de mencionar el trabajo que te hicimos, nos ayudas el doble 😉

👉 https://g.page/r/CYEix1qwZxY_EBM/review

¡Mil gracias de verdad! 🙌
Jaime — Afondo Limpieza de Campanas`;

export function construirMensaje(nombre: string, servicio: string): string {
  return PLANTILLA
    .replace('{NOMBRE}', () => nombre.trim())
    .replace('{SERVICIO}', () => servicio.trim());
}
