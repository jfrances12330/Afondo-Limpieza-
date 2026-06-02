import React, { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// ── Acceso ──────────────────────────────────────────────────────────────
// Código que solo conocéis Jaime y Jorge. Para cambiarlo, edita esta línea.
const ACCESS_CODE = 'afondo2026';

// ── Datos fijos de la empresa ───────────────────────────────────────────
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
const INK = '#0f172a';

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
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [generando, setGenerando] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

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

  const colsFotos = (n: number) => (n <= 2 ? 2 : n <= 4 ? 2 : n <= 6 ? 3 : 4);

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

  // ── Pantalla de acceso ──────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${INK}, ${BRAND_DARK})`,
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
            boxShadow: '0 25px 60px rgba(0,0,0,.35)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 28, color: INK, letterSpacing: 1 }}>
            AFONDO
          </div>
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
          <input
            type="password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
            placeholder="Código de acceso"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none',
              marginBottom: 12,
            }}
          />
          {error && (
            <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</div>
          )}
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

  // ── Estilos reutilizables ────────────────────────────────────────────
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

  // Sección de bloque del PDF
  const Bloque: React.FC<{ titulo: string; children: React.ReactNode }> = ({
    titulo,
    children,
  }) => (
    <div style={{ marginTop: 18, breakInside: 'avoid' }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 900,
          color: BRAND,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: 5,
          marginBottom: 10,
        }}
      >
        {titulo}
      </div>
      <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{children}</div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#eef0f6',
        fontFamily: '"Public Sans", system-ui, sans-serif',
        padding: '24px 16px 80px',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
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
              background: n < 2 ? '#94a3b8' : BRAND,
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

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: 24, alignItems: 'start' }} className="afondo-grid">
          {/* ── FORMULARIO ── */}
          <div style={{ background: '#fff', borderRadius: 18, padding: 22, boxShadow: '0 4px 20px rgba(15,23,42,.06)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ ...label, marginTop: 0 }}>Nº informe</label>
                <input style={input} value={nInforme} onChange={(e) => setNInforme(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ ...label, marginTop: 0 }}>Fecha</label>
                <input style={input} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
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

          {/* ── PREVIEW / PDF ── */}
          <div style={{ overflowX: 'auto' }}>
            <div style={{ width: 794, transformOrigin: 'top left' }} className="afondo-preview-wrap">
              <div
                ref={previewRef}
                id="afondo-pdf-root"
                style={{
                  width: 794,
                  background: '#fff',
                  boxShadow: '0 10px 40px rgba(15,23,42,.12)',
                  color: INK,
                  boxSizing: 'border-box',
                }}
              >
                {/* Cabecera */}
                <div style={{ background: `linear-gradient(120deg, ${BRAND_DARK}, ${BRAND})`, color: '#fff', padding: '26px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 1, lineHeight: 1 }}>AFONDO</div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, opacity: 0.85, textTransform: 'uppercase' }}>Higiene Industrial</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>Informe Técnico</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>de Limpieza y Desengrase</div>
                  </div>
                </div>

                {/* Franja datos empresa */}
                <div style={{ background: INK, color: '#cbd5e1', padding: '8px 36px', fontSize: 10.5, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span>{EMPRESA.tecnico} · NIF {EMPRESA.nif}</span>
                  <span>{EMPRESA.tel} · {EMPRESA.email}</span>
                </div>

                <div style={{ padding: '24px 36px 36px' }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Nº de informe</div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{nInforme}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Fecha del servicio</div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{fecha.split('-').reverse().join('/')}</div>
                    </div>
                  </div>

                  {/* Datos cliente */}
                  <Bloque titulo="Datos del establecimiento">
                    <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{cliente || '—'}</div>
                    {direccionCliente && <div>{direccionCliente}</div>}
                    {actividad && <div style={{ color: '#64748b' }}>{actividad}</div>}
                  </Bloque>

                  <Bloque titulo="Descripción de la instalación">{instalacion}</Bloque>
                  <Bloque titulo="Metodología técnica aplicada">{metodologia}</Bloque>
                  <Bloque titulo="Productos utilizados">{productos}</Bloque>

                  {/* Fotos */}
                  {n > 0 && (
                    <Bloque titulo="Reportaje fotográfico">
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
                        {fotos.map((f, i) => (
                          <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '4 / 3' }}>
                            <img src={f.dataUrl} alt={`foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            {f.etiqueta && (
                              <span style={{ position: 'absolute', bottom: 6, left: 6, background: f.etiqueta === 'Antes' ? '#dc2626' : '#16a34a', color: '#fff', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 5 }}>{f.etiqueta}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Bloque>
                  )}

                  <Bloque titulo="Conclusión">{conclusion}</Bloque>

                  {/* Validez + firma */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 26, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1 }}>Validez recomendada</div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#15803d' }}>{validez}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 180, borderBottom: '1.5px solid #94a3b8', marginBottom: 6 }} />
                      <div style={{ fontSize: 12, fontWeight: 900 }}>{EMPRESA.tecnico}</div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>Técnico responsable · Afondo</div>
                    </div>
                  </div>

                  {/* Pie legal */}
                  <div style={{ marginTop: 22, background: '#f8fafc', borderRadius: 10, padding: '12px 14px', fontSize: 9.5, color: '#94a3b8', lineHeight: 1.5 }}>
                    Empresa con seguro de Responsabilidad Civil en vigor. Este documento es un informe técnico privado del servicio de limpieza y desengrase realizado, con valor probatorio ante compañías aseguradoras y autoridades sanitarias. Acredita el mantenimiento higiénico y la reducción del riesgo de incendio por acumulación de grasa (CTE DB-SI · Reg. CE 852/2004). {EMPRESA.direccion} · {EMPRESA.web}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .afondo-grid { grid-template-columns: 1fr !important; }
          .afondo-preview-wrap { transform: scale(.46); height: auto; }
        }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;
