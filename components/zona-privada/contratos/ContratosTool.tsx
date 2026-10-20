import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Contrato, Parte, Periodicidad, Respuesta, INTERVENCIONES, PAGOS, importes, eur,
} from './datos';
import FirmaPad from './FirmaPad';

/**
 * Herramienta de contratos de mantenimiento (zona privada, oct-2026).
 * Todo ocurre en el móvil: no hay servidor ni base de datos. Los datos de
 * Afondo se recuerdan en este aparato; el contrato en curso se guarda como
 * borrador local hasta pulsar «Nuevo contrato». El PDF lo genera jsPDF, que
 * se carga solo al pulsar el botón.
 */
const K_PRESTADOR = 'afondo_contrato_prestador';
const K_BORRADOR = 'afondo_contrato_borrador';

const hoy = () => new Date().toISOString().slice(0, 10);
const prestadorBase: Parte = {
  nombre: 'Jaime Gascón López',
  nif: '53978208-Z',   // el mismo del certificado y del aviso legal
  direccion: 'Partida Canastell, E17, 03690 San Vicente del Raspeig (Alicante)',
  telefono: '622 064 101',
  email: 'hola@afondolimpiezadecampanas.com',
};
const clienteVacio: Parte = { nombre: '', nif: '', direccion: '', contacto: '', telefono: '', email: '' };

const leer = <T,>(k: string): T | null => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : null; } catch { return null; }
};
const guardar = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento: sigue funcionando */ } };

const nuevo = (): Contrato => ({
  lugar: 'San Vicente del Raspeig',
  fecha: hoy(),
  prestador: leer<Parte>(K_PRESTADOR) || prestadorBase,
  cliente: { ...clienteVacio },
  periodicidad: 'Semestral',
  respuesta: '24',
  precioUnitario: 0,
  pago: 'intervencion',
  iban: '',
});

// ── Piezas de formulario ──
const Campo: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; req?: boolean; full?: boolean; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'] }> =
  ({ label, value, onChange, type = 'text', placeholder, req, full, inputMode }) => (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{label}{req && <span className="text-[#dc2626]"> *</span>}</span>
      <input
        type={type} value={value} placeholder={placeholder} inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-lg border border-line bg-white px-3.5 text-[16px] text-ink placeholder:text-muted/60 focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );

const Tarjeta: React.FC<React.PropsWithChildren<{ n: number; titulo: string; extra?: React.ReactNode }>> = ({ n, titulo, extra, children }) => (
  <section className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
    <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
      <h2 className="flex items-center gap-2.5 text-[15.5px] font-semibold text-ink">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-white">{n}</span>
        {titulo}
      </h2>
      {extra}
    </header>
    <div className="p-5">{children}</div>
  </section>
);

const Segmento = <T extends string>({ opciones, valor, onChange }: { opciones: { v: T; t: string; s?: string }[]; valor: T; onChange: (v: T) => void }) => (
  <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${opciones.length}, minmax(0, 1fr))` }}>
    {opciones.map((o) => (
      <button key={o.v} type="button" onClick={() => onChange(o.v)} aria-pressed={valor === o.v}
        className={`rounded-lg border px-2 py-2.5 text-center transition-colors ${valor === o.v ? 'border-brand bg-brand-soft/70 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/25'}`}>
        <span className="block text-[14px] font-medium text-ink">{o.t}</span>
        {o.s && <span className="block font-mono text-[10.5px] text-muted">{o.s}</span>}
      </button>
    ))}
  </div>
);

const ContratosTool: React.FC = () => {
  const [c, setC] = useState<Contrato>(() => leer<Contrato>(K_BORRADOR) || nuevo());
  const [verPrestador, setVerPrestador] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [pdf, setPdf] = useState<{ blob: Blob; nombre: string; url: string } | null>(null);
  const [aviso, setAviso] = useState('');
  const [intentado, setIntentado] = useState(false);

  useEffect(() => { guardar(K_BORRADOR, c); }, [c]);
  useEffect(() => () => { if (pdf) URL.revokeObjectURL(pdf.url); }, [pdf]);

  const set = <K extends keyof Contrato>(k: K, v: Contrato[K]) => { setC((p) => ({ ...p, [k]: v })); setPdf(null); };
  const setP = (k: keyof Parte, v: string) => { setC((p) => { const prestador = { ...p.prestador, [k]: v }; guardar(K_PRESTADOR, prestador); return { ...p, prestador }; }); setPdf(null); };
  const setCl = (k: keyof Parte, v: string) => { setC((p) => ({ ...p, cliente: { ...p.cliente, [k]: v } })); setPdf(null); };

  const { n, base, iva, total } = useMemo(() => importes(c), [c]);

  const faltan = [
    !c.prestador.nombre && 'nombre de Afondo', !c.prestador.nif && 'NIF de Afondo',
    !c.cliente.nombre && 'nombre del cliente', !c.cliente.nif && 'NIF/CIF del cliente',
    !c.cliente.direccion && 'dirección del local', !c.lugar && 'lugar', !c.fecha && 'fecha',
    !(c.precioUnitario > 0) && 'precio por intervención',
  ].filter(Boolean) as string[];

  const generar = async () => {
    setIntentado(true);
    if (faltan.length) { setAviso(''); return; }
    setGenerando(true); setAviso('');
    try {
      const m = await import('./pdf');
      const blob = m.generarContratoPDF(c);
      if (pdf) URL.revokeObjectURL(pdf.url);
      setPdf({ blob, nombre: m.nombreArchivo(c), url: URL.createObjectURL(blob) });
    } catch (e) {
      setAviso('No se ha podido generar el PDF. Vuelve a intentarlo.');
      console.error(e);
    } finally { setGenerando(false); }
  };

  const descargar = () => {
    if (!pdf) return;
    const a = document.createElement('a'); a.href = pdf.url; a.download = pdf.nombre; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  };
  // Hoja nativa de compartir (ahí está WhatsApp). Si el navegador no puede, se descarga.
  const compartir = async () => {
    if (!pdf) return;
    const file = new File([pdf.blob], pdf.nombre, { type: 'application/pdf' });
    const nav = navigator as Navigator & { canShare?: (d?: { files?: File[] }) => boolean };
    if (nav.canShare?.({ files: [file] }) && navigator.share) {
      try { await navigator.share({ files: [file], title: pdf.nombre }); return; }
      catch (e) { if (e instanceof Error && e.name === 'AbortError') return; }
    }
    descargar();
    setAviso('Este navegador no deja compartir directo: el PDF se ha descargado; adjúntalo en WhatsApp desde Descargas.');
  };

  const empezarNuevo = () => {
    if (!window.confirm('¿Empezar un contrato nuevo? Se borran los datos del cliente y las firmas (los de Afondo se quedan).')) return;
    const nv = nuevo(); setC(nv); setPdf(null); setIntentado(false); setAviso('');
  };

  return (
    <div className="min-h-screen bg-mist pb-40 font-plex text-ink">
      <div className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/zona-privada" className="inline-flex items-center gap-1 text-[14px] font-medium text-muted hover:text-ink">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Zona privada
          </Link>
          <button type="button" onClick={empezarNuevo} className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-[13.5px] font-medium text-ink-2 hover:bg-mist">
            <span className="material-symbols-outlined text-[17px]">add</span> Nuevo contrato
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 px-4 pt-6">
        <header className="mb-2">
          <p className="font-mono text-[11.5px] text-brand">Contrato de mantenimiento</p>
          <h1 className="mt-1 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">Rellena y genera el contrato</h1>
          <p className="mt-1 text-[14.5px] text-muted">Lo que escribas se guarda en este móvil hasta que pulses «Nuevo contrato».</p>
        </header>

        <Tarjeta n={1} titulo="Datos de Afondo (prestador)" extra={
          <button type="button" onClick={() => setVerPrestador((v) => !v)} className="text-[13px] font-medium text-brand">{verPrestador ? 'Ocultar' : 'Editar'}</button>
        }>
          {verPrestador ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Campo label="Razón social / Nombre" value={c.prestador.nombre} onChange={(v) => setP('nombre', v)} req />
              <Campo label="NIF / CIF" value={c.prestador.nif} onChange={(v) => setP('nif', v.toUpperCase())} req />
              <Campo label="Domicilio social" value={c.prestador.direccion} onChange={(v) => setP('direccion', v)} full />
              <Campo label="Teléfono" value={c.prestador.telefono} onChange={(v) => setP('telefono', v)} type="tel" />
              <Campo label="Correo electrónico" value={c.prestador.email} onChange={(v) => setP('email', v)} type="email" />
              <p className="text-[12.5px] text-muted sm:col-span-2">Se recuerdan en este móvil para los siguientes contratos.</p>
            </div>
          ) : (
            <p className="text-[14px] text-ink-2"><span className="font-medium">{c.prestador.nombre}</span> · {c.prestador.nif || <span className="text-[#dc2626]">falta NIF</span>}</p>
          )}
        </Tarjeta>

        <Tarjeta n={2} titulo="Cliente / establecimiento">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Campo label="Razón social / Nombre" value={c.cliente.nombre} onChange={(v) => setCl('nombre', v)} req placeholder="Restaurante…" />
            <Campo label="NIF / CIF" value={c.cliente.nif} onChange={(v) => setCl('nif', v.toUpperCase())} req />
            <Campo label="Dirección de la cocina / local" value={c.cliente.direccion} onChange={(v) => setCl('direccion', v)} req full />
            <Campo label="Persona de contacto" value={c.cliente.contacto || ''} onChange={(v) => setCl('contacto', v)} />
            <Campo label="Teléfono" value={c.cliente.telefono} onChange={(v) => setCl('telefono', v)} type="tel" />
            <Campo label="Correo electrónico" value={c.cliente.email} onChange={(v) => setCl('email', v)} type="email" full />
          </div>
        </Tarjeta>

        <Tarjeta n={3} titulo="Lugar y fecha de firma">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Campo label="Lugar" value={c.lugar} onChange={(v) => set('lugar', v)} req />
            <Campo label="Fecha" value={c.fecha} onChange={(v) => set('fecha', v)} type="date" req />
          </div>
        </Tarjeta>

        <Tarjeta n={4} titulo="Servicio y precio">
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-2">Periodicidad de las intervenciones</p>
              <Segmento<Periodicidad>
                valor={c.periodicidad} onChange={(v) => set('periodicidad', v)}
                opciones={(['Anual', 'Semestral', 'Cuatrimestral'] as Periodicidad[]).map((p) => ({ v: p, t: p, s: `${INTERVENCIONES[p]} al año` }))}
              />
            </div>
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-2">Respuesta a avisos (horas laborables)</p>
              <Segmento<Respuesta> valor={c.respuesta} onChange={(v) => set('respuesta', v)} opciones={[{ v: '24', t: '24 horas' }, { v: '48', t: '48 horas' }]} />
            </div>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-2">Precio por intervención (sin IVA)<span className="text-[#dc2626]"> *</span></span>
              <div className="relative">
                <input
                  type="number" inputMode="decimal" min={0} step="0.01"
                  value={c.precioUnitario || ''} placeholder="0,00"
                  onChange={(e) => set('precioUnitario', Math.max(0, Number(e.target.value.replace(',', '.')) || 0))}
                  className="h-12 w-full rounded-lg border border-line bg-white pl-3.5 pr-10 text-[18px] font-semibold text-ink focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/15"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[16px] text-muted">€</span>
              </div>
            </label>
            <dl className="overflow-hidden rounded-lg border border-line text-[14px]">
              <div className="flex justify-between px-4 py-2.5"><dt className="text-muted">{eur(c.precioUnitario)} × {n} {n > 1 ? 'intervenciones' : 'intervención'}</dt><dd className="tnum font-medium">{eur(base)}</dd></div>
              <div className="flex justify-between border-t border-line px-4 py-2.5"><dt className="text-muted">IVA 21%</dt><dd className="tnum font-medium">{eur(iva)}</dd></div>
              <div className="flex justify-between border-t border-line bg-brand-soft/60 px-4 py-3"><dt className="font-semibold">Importe total anual</dt><dd className="tnum text-[16px] font-semibold text-brand">{eur(total)}</dd></div>
            </dl>
          </div>
        </Tarjeta>

        <Tarjeta n={5} titulo="Forma de pago">
          <div className="space-y-2">
            {PAGOS.map((p) => (
              <button key={p.id} type="button" onClick={() => set('pago', p.id)} aria-pressed={c.pago === p.id}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${c.pago === p.id ? 'border-brand bg-brand-soft/70 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/25'}`}>
                <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${c.pago === p.id ? 'border-brand' : 'border-line'}`}>
                  {c.pago === p.id && <span className="h-2 w-2 rounded-full bg-brand"></span>}
                </span>
                <span><span className="block text-[14.5px] font-medium">{p.titulo}</span><span className="block text-[13px] text-muted">{p.texto}</span></span>
              </button>
            ))}
            <div className="pt-2">
              <Campo label="IBAN (si procede)" value={c.iban} onChange={(v) => set('iban', v.toUpperCase())} placeholder="ES00 0000 0000 0000 0000 0000" full />
            </div>
          </div>
        </Tarjeta>

        <Tarjeta n={6} titulo="Firmas (opcional)">
          <p className="mb-4 text-[13.5px] text-muted">Si firmáis aquí con el dedo, las firmas salen en el PDF. Si no, queda el hueco para firmar en papel.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FirmaPad etiqueta="Por el Prestador del Servicio" valor={c.firmaPrestador} onChange={(v) => set('firmaPrestador', v)} />
            <FirmaPad etiqueta="Por el Cliente / Establecimiento" valor={c.firmaCliente} onChange={(v) => set('firmaCliente', v)} />
          </div>
        </Tarjeta>

        {pdf && (
          <section className="overflow-hidden rounded-xl border border-[#bbf7d0] bg-white shadow-card">
            <div className="flex items-center gap-3 border-b border-line bg-[#f0fdf4] px-5 py-3.5">
              <span className="material-symbols-outlined text-[22px] text-[#16a34a]">task_alt</span>
              <div className="min-w-0">
                <p className="text-[14.5px] font-semibold">Contrato listo</p>
                <p className="truncate font-mono text-[11px] text-muted">{pdf.nombre}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3">
              <button type="button" onClick={compartir} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1fa855] text-[15px] font-semibold text-white hover:bg-[#178a45]">
                <span className="material-symbols-outlined text-[20px]">share</span> Compartir
              </button>
              <button type="button" onClick={descargar} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line text-[15px] font-semibold text-ink hover:bg-mist">
                <span className="material-symbols-outlined text-[20px]">download</span> Descargar
              </button>
              <a href={pdf.url} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line text-[15px] font-semibold text-ink hover:bg-mist">
                <span className="material-symbols-outlined text-[20px]">visibility</span> Ver
              </a>
            </div>
          </section>
        )}
        {aviso && <p className="rounded-lg bg-[#fff4db] px-4 py-3 text-[13.5px] text-[#92400e]">{aviso}</p>}
      </div>

      {/* Barra fija: total + generar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-3">
          {intentado && faltan.length > 0 && (
            <p className="mb-2 text-[12.5px] text-[#b91c1c]">Falta: {faltan.join(', ')}.</p>
          )}
          <div className="flex items-center gap-3">
            <div className="flex-1 leading-tight">
              <span className="block font-mono text-[10.5px] text-muted">Total anual (IVA incl.)</span>
              <span className="tnum text-[1.35rem] font-semibold">{eur(total)}</span>
            </div>
            <button type="button" onClick={generar} disabled={generando}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-white hover:bg-ink-2 disabled:opacity-60">
              <span className="material-symbols-outlined text-[20px]">{generando ? 'hourglass_top' : 'picture_as_pdf'}</span>
              {generando ? 'Generando…' : pdf ? 'Volver a generar' : 'Generar contrato'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContratosTool;
