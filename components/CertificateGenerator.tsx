import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// ── Acceso ───────────────────────────────────────────────────────────
// Código que solo conocéis Jaime y Jorge. Para cambiarlo, edita esta línea.
const ACCESS_CODE = 'Jaimitopiensa';

// ── Datos fijos de la empresa ──────────────────────────────────────
const EMPRESA = {
  nombre: 'Afondo Limpieza de Campanas',
  tecnico: 'Jaime Gascón López',
  nif: '53978208-Z',
  direccion: 'Partida Canastell, E-17, 03690 San Vicente del Raspeig (Alicante)',
  tel: '622 064 101',
  email: 'afondolimpiezadecampanas@gmail.com',
  web: 'afondolimpiezadecampanas.com',
};

const BRAND = '#6A65E3';
const BRAND_DARK = '#4f48b8';
const NAVY = '#0b1020';
const INK = '#0f172a';
const GOLD = '#d4af37';
const GOLD_LIGHT = '#f3d98b';

interface Foto {
  dataUrl: string;
  etiqueta: string; // "Antes" | "Después" | ""
}

const HOY = new Date().toISOString().slice(0, 10);
const refDefecto = () => {
  const y = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${y}-ALC-${n}`;
};

const CertificateGenerator: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => sessionStorage.getItem('afondo_unlock') === ACCESS_CODE
  );
  const [codigo, setCodigo] = useState('');
  const [verCodigo, setVerCodigo] = useState(false);
  const [error, setError] = useState('');

  // Campos del informe
  const [nInforme, setNInforme] = useState(refDefecto());
  const [fecha, setFecha] = useState(HOY);
  const [cliente, setCliente] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [actividad, setActividad] = useState('');
  const [instalacion, setInstalacion] = useState(
    'Sistema de extracción de humos compuesto por campana mural, conductos y turbina de extracción. Filtros tipo malla metálica.'
  );
  const [metodologia, setMetodologia] = useState(
    'Aplicación de espuma activa desengrasante alcalina, cepillado mecánico de superficies y aclarado a alta presión con agua a 80 ºC. Desengrase integral de campana, plenum, filtros y conductos accesibles.'
  );
  const [productos, setProductos] = useState(
    'Desengrasante alcalino profesional de uso industrial (no biocida). Apto para superficies en contacto con instalaciones de cocina.'
  );
  const [conclusion, setConclusion] = useState(
    'La instalación queda limpia de acumulación de grasa y en condiciones seguras de uso, reduciendo el riesgo de incendio y favoreciendo el cumplimiento de las condiciones de higiene del establecimiento.'
  );
  const [validez, setValidez] = useState('6 meses (revisión recomendada)');
  const [factura, setFactura] = useState('');
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [generando, setGenerando] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [frameH, setFrameH] = useState(0);

  // Escala la maqueta para que quepa entera en su columna (sin recorte)
  useLayoutEffect(() => {
    const recompute = () => {
      if (!frameRef.current || !previewRef.current) return;
      const w = frameRef.current.clientWidth;
      const s = Math.min(1, w / 794);
      setScale(s);
      setFrameH(previewRef.current.offsetHeight * s);
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    if (frameRef.current) ro.observe(frameRef.current);
    if (previewRef.current) ro.observe(previewRef.current);
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [fotos, instalacion, metodologia, productos, conclusion, cliente, direccionCliente, actividad, validez, factura, unlocked]);

  const tryUnlock = () => {
    if (codigo.trim() === ACCESS_CODE) {
      sessionStorage.setItem('afondo_unlock', ACCESS_CODE);
      setUnlocked(true);
      setError('');
    } else {
      setError('Código incorrecto.');
    }
  };

  // Carga + reescalado de fotos (máx 8, máx 1400px lado mayor)
  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const restantes = 8 - fotos.length;
      const lote = Array.from(files).slice(0, Math.max(0, restantes));
      lote.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const max = 1400;
            let { width, height } = img;
            if (width > max || height > max) {
              const r = Math.min(max / width, max / height);
              width = Math.round(width * r);
              height = Math.round(height * r);
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setFotos((prev) =>
              prev.length >= 8 ? prev : [...prev, { dataUrl, etiqueta: '' }]
            );
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    },
    [fotos.length]
  );

  const quitarFoto = (i: number) =>
    setFotos((prev) => prev.filter((_, idx) => idx !== i));
  const setEtiqueta = (i: number, et: string) =>
    setFotos((prev) => prev.map((f, idx) => (idx === i ? { ...f, etiqueta: et } : f)));

  const colsFotos = (num: number) => (num <= 2 ? 2 : num <= 4 ? 2 : num <= 6 ? 3 : 4);

  const generarPDF = async () => {
    if (!previewRef.current) return;
    setGenerando(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgW = 210;
      const pageH = 297;
      const imgH = (canvas.height * imgW) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      let heightLeft = imgH;
      let pos = 0;
      pdf.addImage(imgData, 'JPEG', 0, pos, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        pos = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, pos, imgW, imgH);
        heightLeft -= pageH;
      }
      const safe = (cliente || 'informe').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      pdf.save(`afondo-informe-${nInforme}-${safe}.pdf`);
    } catch (err) {
      alert('No se pudo generar el PDF. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setGenerando(false);
    }
  };

  // ── Pantalla de acceso ──────────────────────────────────────────
  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle at 30% 20%, ${BRAND_DARK}, ${NAVY})`,
          fontFamily: '"Public Sans", system-ui, sans-serif',
          padding: 24,
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: 40,
            width: '100%',
            maxWidth: 380,
            boxShadow: '0 25px 60px rgba(0,0,0,.45)',
            textAlign: 'center',
            borderTop: `4px solid ${GOLD}`,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 30, color: INK, letterSpacing: 1 }}>AFONDO</div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 24,
            }}
          >
            Generador de Informes
          </div>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              type={verCodigo ? 'text' : 'password'}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
              placeholder="Código de acceso"
              style={{
                width: '100%',
                padding: '14px 46px 14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: 12,
                fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setVerCodigo((v) => !v)}
              aria-label={verCodigo ? 'Ocultar código' : 'Mostrar código'}
              style={{
                position: 'absolute',
                right: 6,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {verCodigo ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <button
            onClick={tryUnlock}
            style={{
              width: '100%',
              padding: '14px',
              background: BRAND,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // ── Estilos del formulario ─────────────────────────────────────
  const label: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 800,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 16,
  };
  const input: React.CSSProperties = {
    width: '100%',
    padding: '11px 13px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    fontSize: 15,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const n = fotos.length;
  const cols = colsFotos(n);

  // Bloque de sección del informe (numerado, premium)
  const Bloque: React.FC<{ num: number; titulo: string; children: React.ReactNode }> = ({
    num,
    titulo,
    children,
  }) => (
    <div style={{ marginTop: 20, breakInside: 'avoid', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
            color: '#fff',
            fontSize: 11,
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 900,
            color: INK,
            textTransform: 'uppercase',
            letterSpacing: 1.4,
          }}
        >
          {titulo}
        </div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #e2e8f0, transparent)' }} />
      </div>
      <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, paddingLeft: 32 }}>{children}</div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e9ebf2',
        fontFamily: '"Public Sans", system-ui, sans-serif',
        padding: '24px 16px 80px',
      }}
    >
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, color: INK }}>AFONDO · Generador de Informes</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Rellena los datos, sube de 2 a 8 fotos y descarga el PDF.</div>
          </div>
          <button
            onClick={generarPDF}
            disabled={generando || n < 2}
            style={{
              padding: '14px 26px',
              background: n < 2 ? '#94a3b8' : `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 800,
              cursor: n < 2 ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(106,101,227,.35)',
            }}
          >
            {generando ? 'Generando…' : n < 2 ? 'Sube al menos 2 fotos' : 'Descargar PDF'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: 24, alignItems: 'start' }} className="afondo-grid">
          {/* ── FORMULARIO ── */}
          <div style={{ background: '#fff', borderRadius: 18, padding: 22, boxShadow: '0 4px 20px rgba(15,23,42,.06)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={{ ...label, marginTop: 0 }}>Nº informe</label>
                <input style={input} value={nInforme} onChange={(e) => setNInforme(e.target.value)} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={{ ...label, marginTop: 0 }}>Fecha</label>
                <input style={{ ...input, maxWidth: '100%' }} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </div>
            </div>

            <label style={label}>Cliente / Establecimiento</label>
            <input style={input} value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Restaurante El Puerto" />

            <label style={label}>Dirección del establecimiento</label>
            <input style={input} value={direccionCliente} onChange={(e) => setDireccionCliente(e.target.value)} placeholder="C/ ..., Alicante" />

            <label style={label}>Actividad (opcional)</label>
            <input style={input} value={actividad} onChange={(e) => setActividad(e.target.value)} placeholder="Restaurante / cocina industrial" />

            <label style={label}>Descripción de la instalación</label>
            <textarea style={{ ...input, minHeight: 70, resize: 'vertical' }} value={instalacion} onChange={(e) => setInstalacion(e.target.value)} />

            <label style={label}>Metodología aplicada</label>
            <textarea style={{ ...input, minHeight: 80, resize: 'vertical' }} value={metodologia} onChange={(e) => setMetodologia(e.target.value)} />

            <label style={label}>Productos utilizados</label>
            <textarea style={{ ...input, minHeight: 60, resize: 'vertical' }} value={productos} onChange={(e) => setProductos(e.target.value)} />

            <label style={label}>Conclusión</label>
            <textarea style={{ ...input, minHeight: 70, resize: 'vertical' }} value={conclusion} onChange={(e) => setConclusion(e.target.value)} />

            <label style={label}>Validez / próxima revisión</label>
            <input style={input} value={validez} onChange={(e) => setValidez(e.target.value)} />

            <label style={label}>Nº de factura asociada (opcional)</label>
            <input style={input} value={factura} onChange={(e) => setFactura(e.target.value)} placeholder="Ej. F-2026/045" />

            <label style={label}>Fotos ({n}/8)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => { onFiles(e.target.files); e.target.value = ''; }} style={{ fontSize: 14 }} />
            {n > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginTop: 12 }}>
                {fotos.map((f, i) => (
                  <div key={i} style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                    <img src={f.dataUrl} alt={`foto ${i + 1}`} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                    <select value={f.etiqueta} onChange={(e) => setEtiqueta(i, e.target.value)} style={{ width: '100%', border: 'none', borderTop: '1px solid #e2e8f0', fontSize: 12, padding: 4 }}>
                      <option value="">Sin etiqueta</option>
                      <option value="Antes">Antes</option>
                      <option value="Después">Después</option>
                    </select>
                    <button onClick={() => quitarFoto(i)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,.9)', color: '#fff', border: 'none', borderRadius: 6, width: 22, height: 22, cursor: 'pointer', fontWeight: 800 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── PREVIEW / PDF (escalado para caber) ── */}
          <div ref={frameRef} style={{ position: 'relative', width: '100%', height: frameH, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 794, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden' }}>
              <div
                ref={previewRef}
                id="afondo-pdf-root"
                style={{
                  width: 794,
                  background: '#fff',
                  boxShadow: '0 18px 50px rgba(15,23,42,.18)',
                  color: INK,
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Marca de agua */}
                <div
                  style={{
                    position: 'absolute',
                    top: 360,
                    left: -40,
                    fontSize: 150,
                    fontWeight: 900,
                    color: 'rgba(106,101,227,0.04)',
                    transform: 'rotate(-24deg)',
                    letterSpacing: 6,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  AFONDO
                </div>

                {/* Cabecera */}
                <div style={{ position: 'relative', background: `linear-gradient(125deg, ${NAVY} 0%, ${BRAND_DARK} 60%, ${BRAND} 100%)`, color: '#fff', padding: '30px 40px 28px', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -70, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ position: 'absolute', bottom: -90, right: 90, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.12)', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-6 9 6" />
                          <path d="M5 9v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                          <path d="M9 18v-5h6v5" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 1.5, lineHeight: 1 }}>AFONDO</div>
                        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 4, opacity: 0.8, textTransform: 'uppercase' }}>Higiene Industrial</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 17, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>Informe Técnico</div>
                      <div style={{ fontSize: 11.5, opacity: 0.85 }}>de Limpieza y Desengrase</div>
                      <div style={{ display: 'inline-block', marginTop: 8, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 800 }}>
                        Nº {nInforme}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Filo dorado */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})` }} />

                {/* Franja datos empresa */}
                <div style={{ background: INK, color: '#cbd5e1', padding: '9px 40px', fontSize: 10.5, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span>{EMPRESA.tecnico} · NIF {EMPRESA.nif}</span>
                  <span>{EMPRESA.tel} · {EMPRESA.email}</span>
                </div>

                <div style={{ position: 'relative', padding: '26px 40px 0' }}>
                  {/* Sello verificado */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 36,
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      border: `2px solid ${GOLD}`,
                      background: 'radial-gradient(circle, #fffdf5, #fbf3da)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'rotate(-10deg)',
                      boxShadow: '0 6px 16px rgba(212,175,55,.25)',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <div style={{ fontSize: 7.5, fontWeight: 900, color: '#9a7b1f', textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center', marginTop: 3, lineHeight: 1.2 }}>Servicio<br />Verificado</div>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 40, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Nº de informe</div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{nInforme}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Fecha del servicio</div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{fecha.split('-').reverse().join('/')}</div>
                    </div>
                    {factura && (
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Factura asociada</div>
                        <div style={{ fontSize: 15, fontWeight: 800 }}>{factura}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ position: 'relative', padding: '4px 40px 36px' }}>
                  {/* Datos cliente */}
                  <Bloque num={1} titulo="Datos del establecimiento">
                    <div style={{ background: 'linear-gradient(135deg, rgba(106,101,227,0.07), rgba(106,101,227,0.02))', border: '1px solid rgba(106,101,227,0.18)', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>{cliente || '—'}</div>
                      {direccionCliente && <div style={{ marginTop: 2 }}>{direccionCliente}</div>}
                      {actividad && <div style={{ color: '#64748b', marginTop: 2 }}>{actividad}</div>}
                    </div>
                  </Bloque>

                  <Bloque num={2} titulo="Descripción de la instalación">{instalacion}</Bloque>
                  <Bloque num={3} titulo="Metodología técnica aplicada">{metodologia}</Bloque>
                  <Bloque num={4} titulo="Productos utilizados">{productos}</Bloque>

                  {/* Fotos */}
                  {n > 0 && (
                    <Bloque num={5} titulo="Reportaje fotográfico">
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
                        {fotos.map((f, i) => (
                          <div key={i} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 14px rgba(15,23,42,.16)', aspectRatio: '4 / 3' }}>
                            <img src={f.dataUrl} alt={`foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            {f.etiqueta && (
                              <span style={{ position: 'absolute', bottom: 8, left: 8, background: f.etiqueta === 'Antes' ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#22c55e,#15803d)', color: '#fff', fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, padding: '3px 9px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,.25)' }}>{f.etiqueta}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Bloque>
                  )}

                  <Bloque num={n > 0 ? 6 : 5} titulo="Conclusión">{conclusion}</Bloque>

                  {/* Validez + firma */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 30, paddingTop: 18, borderTop: '2px solid #f1f5f9' }}>
                    <div style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1 }}>Validez recomendada</div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: '#15803d' }}>{validez}</div>
                    </div>
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -34, left: '50%', transform: 'translateX(-50%) rotate(-8deg)', width: 70, height: 70, borderRadius: '50%', border: `1.5px dashed ${BRAND}`, opacity: 0.25 }} />
                      <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: 22, color: BRAND_DARK, lineHeight: 1, marginBottom: 4 }}>Afondo</div>
                      <div style={{ width: 190, borderBottom: '1.5px solid #94a3b8', marginBottom: 6 }} />
                      <div style={{ fontSize: 12, fontWeight: 900 }}>{EMPRESA.tecnico}</div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>Técnico responsable · Afondo</div>
                    </div>
                  </div>
                </div>

                {/* Pie corporativo */}
                <div style={{ background: NAVY, color: '#94a3b8', padding: '14px 40px', fontSize: 9.5, lineHeight: 1.55 }}>
                  <div style={{ color: GOLD_LIGHT, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', fontSize: 9.5, marginBottom: 4 }}>
                    Empresa con seguro de Responsabilidad Civil en vigor
                  </div>
                  Informe técnico privado del servicio de limpieza y desengrase realizado, con valor probatorio ante compañías aseguradoras y autoridades sanitarias. Acredita el mantenimiento higiénico y la reducción del riesgo de incendio por acumulación de grasa (CTE DB-SI · Reg. CE 852/2004).
                  <div style={{ marginTop: 6, color: '#cbd5e1' }}>{EMPRESA.direccion} · {EMPRESA.tel} · {EMPRESA.web}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .afondo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;
