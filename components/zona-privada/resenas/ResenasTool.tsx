import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { construirMensaje } from './mensaje';
import { leerHistorial, guardarEntrada, borrarEntrada, EntradaResena } from './historial';

// Atajos fijos. Nada que ver con los 9 servicios del generador: aquello es
// documentación técnica interna, esto es lenguaje de cara al cliente final.
const CHIPS_FIJOS = [
  'la limpieza y desengrase de tu campana extractora',
  'la limpieza de los conductos de extracción',
  'la limpieza integral de tu sistema de extracción',
  'el trabajo en la turbina de extracción',
  'la instalación de tu sistema de extracción',
  'la reparación de tu sistema de extracción',
  'el mantenimiento de tu sistema de extracción',
];

// Devuelve el número en E.164 sin '+', o null si no hay forma de leerlo.
function normalizarTelefono(entrada: string): string | null {
  let t = entrada.replace(/[\s.\-()]/g, '');
  if (t.startsWith('+')) t = t.slice(1);
  else if (t.startsWith('00')) t = t.slice(2);
  if (!/^\d+$/.test(t)) return null;
  if (/^[679]\d{8}$/.test(t)) return `34${t}`;
  if (/^34\d{9}$/.test(t)) return t;
  return null;
}

const fechaCorta = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-ES');
};

const ResenasTool: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [negocio, setNegocio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');

  const [errores, setErrores] = useState<{ nombre?: string; telefono?: string; servicio?: string }>({});
  const [entradas, setEntradas] = useState<EntradaResena[]>(() => leerHistorial());
  const [verListado, setVerListado] = useState(false);
  const [verMensaje, setVerMensaje] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [aviso, setAviso] = useState('');
  const [errorGuardado, setErrorGuardado] = useState('');

  const telefonoNormalizado = normalizarTelefono(telefono);
  const mensaje = construirMensaje(nombre, servicio);
  const valido = nombre.trim() !== '' && servicio.trim() !== '' && telefonoNormalizado !== null;

  const href = valido
    ? `https://wa.me/${telefonoNormalizado}?text=${encodeURIComponent(mensaje)}`
    : '#';

  const repetido = telefonoNormalizado
    ? entradas.find((e) => e.telefonoNormalizado === telefonoNormalizado)
    : undefined;

  const chipsAprendidos = useMemo(() => {
    const vistos = new Set(CHIPS_FIJOS);
    const fuera: string[] = [];
    for (const e of entradas) {
      const s = (e.servicio || '').trim();
      if (s && !vistos.has(s)) {
        vistos.add(s);
        fuera.push(s);
      }
      if (fuera.length === 5) break;
    }
    return fuera;
  }, [entradas]);

  const listadoFiltrado = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return entradas;
    return entradas.filter((e) =>
      [e.nombre, e.negocio, e.telefono, e.telefonoNormalizado].some((v) =>
        (v || '').toLowerCase().includes(q)
      )
    );
  }, [entradas, busqueda]);

  const alEnviar = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valido) {
      ev.preventDefault();
      setErrores({
        nombre: nombre.trim() ? undefined : 'Pon el nombre del cliente',
        telefono: telefonoNormalizado
          ? undefined
          : 'Ese teléfono no parece correcto. Escríbelo como 622064101',
        servicio: servicio.trim() ? undefined : 'Escribe qué trabajo le has hecho',
      });
      return;
    }

    const res = guardarEntrada({
      nombre: nombre.trim(),
      negocio: negocio.trim(),
      telefono: telefono.trim(),
      telefonoNormalizado,
      servicio: servicio.trim(),
    });
    setEntradas(res.entradas);
    setErrores({});
    setAviso(res.ok ? 'Guardado en tu listado ✅' : '');
    setErrorGuardado(
      res.ok ? '' : 'No se ha podido guardar en el listado, pero el mensaje sí se puede enviar.'
    );

    // Vaciar en un tick aparte: si lo hacemos dentro del onClick, React repinta
    // el <a> con href="#" antes de que el navegador siga el enlace, y en el
    // iPhone no se abriría WhatsApp.
    setTimeout(() => {
      setNombre('');
      setNegocio('');
      setTelefono('');
      setServicio('');
      setVerMensaje(false);
    }, 0);
  };

  const alBorrar = (entrada: EntradaResena) => {
    const etiqueta = entrada.negocio || entrada.nombre;
    if (window.confirm(`¿Borrar a ${etiqueta} del listado?`)) {
      setEntradas(borrarEntrada(entrada.id));
    }
  };

  const claseCampo =
    'w-full h-14 px-4 text-base rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:outline-none transition-colors';
  const claseEtiqueta =
    'block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2';
  const claseAyuda = 'mt-2 text-sm text-slate-500 dark:text-slate-400';

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark px-6 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <span className="material-symbols-outlined !text-5xl text-primary" aria-hidden="true">star</span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Pedir reseña
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-primary mt-2">Afondo</p>
        </header>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-lg p-6 sm:p-10">
          <div className="mb-6">
            <label htmlFor="cliente-nombre" className={claseEtiqueta}>Nombre del cliente</label>
            <input
              id="cliente-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={claseCampo}
            />
            <p className={claseAyuda}>El nombre que aparecerá en el mensaje. Ej: José</p>
            {errores.nombre && (
              <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">{errores.nombre}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="cliente-negocio" className={claseEtiqueta}>Nombre del negocio</label>
            <input
              id="cliente-negocio"
              type="text"
              value={negocio}
              onChange={(e) => setNegocio(e.target.value)}
              className={claseCampo}
            />
            <p className={claseAyuda}>
              Solo para tu listado, para saber quién es. Ej: Restaurante El Puerto
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="cliente-telefono" className={claseEtiqueta}>Teléfono</label>
            <input
              id="cliente-telefono"
              type="tel"
              inputMode="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={claseCampo}
            />
            <p className={claseAyuda}>Su móvil. Ej: 622064101</p>
            {errores.telefono && (
              <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">{errores.telefono}</p>
            )}
            {repetido && (
              <p className="mt-2 text-sm font-bold text-amber-600 dark:text-amber-400">
                ⚠️ Ya le pediste una reseña a este número el {fechaCorta(repetido.fechaISO)}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="cliente-servicio" className={claseEtiqueta}>Trabajo realizado</label>

            <div className="flex flex-wrap gap-2 mb-3">
              {[...CHIPS_FIJOS, ...chipsAprendidos].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setServicio(chip)}
                  className="px-3 py-2 text-sm text-left rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <input
              id="cliente-servicio"
              type="text"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              placeholder="la limpieza de tu campana extractora"
              className={claseCampo}
            />
            <p className={claseAyuda}>
              Escríbelo como si siguiera la frase: «Gracias por confiar en nosotros para…». Ej: la
              limpieza de tu campana extractora
            </p>
            {errores.servicio && (
              <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">{errores.servicio}</p>
            )}
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={alEnviar}
            className="flex items-center justify-center gap-2 w-full h-16 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-wider rounded-xl transition-all"
          >
            <span className="material-symbols-outlined !text-2xl" aria-hidden="true">send</span>
            Enviar por WhatsApp
          </a>

          {aviso && (
            <p className="mt-4 text-center text-sm font-bold text-green-600 dark:text-green-400">{aviso}</p>
          )}
          {errorGuardado && (
            <p className="mt-4 text-center text-sm font-bold text-amber-600 dark:text-amber-400">
              {errorGuardado}
            </p>
          )}

          <button
            type="button"
            onClick={() => setVerListado((v) => !v)}
            className="mt-4 flex items-center justify-center gap-2 w-full h-14 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary font-black uppercase tracking-wider rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined !text-2xl" aria-hidden="true">list</span>
            Ver listado
          </button>

          <button
            type="button"
            onClick={() => setVerMensaje((v) => !v)}
            className="mt-6 text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
          >
            {verMensaje ? 'Ocultar el mensaje que se enviará' : 'Ver el mensaje que se enviará'}
          </button>
          {verMensaje && (
            <pre className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words font-sans">
              {mensaje}
            </pre>
          )}
        </div>

        {verListado && (
          <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-lg p-6 sm:p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Tu listado
            </h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-primary">
              Has pedido {entradas.length} reseñas
            </p>

            {entradas.length === 0 ? (
              <p className="mt-6 text-base text-slate-600 dark:text-slate-400">
                Aún no has pedido ninguna reseña. Rellena el formulario y pulsa Enviar.
              </p>
            ) : (
              <>
                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, negocio o teléfono"
                  className={`${claseCampo} mt-6`}
                />
                <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                  {listadoFiltrado.map((e) => (
                    <li key={e.id} className="py-4 flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-black text-slate-900 dark:text-white truncate">
                          {e.negocio || e.nombre}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {e.nombre} · {e.telefono}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 truncate">
                          {e.servicio} · {fechaCorta(e.fechaISO)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alBorrar(e)}
                        aria-label={`Borrar a ${e.negocio || e.nombre} del listado`}
                        className="shrink-0 p-2 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined !text-2xl" aria-hidden="true">delete</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/zona-privada"
            className="text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
          >
            ← Volver a la zona privada
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResenasTool;
