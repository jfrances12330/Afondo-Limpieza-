import React, { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// ── Acceso ───────────────────────────────────────────────────────────
// Código que solo conocéis Jaime y Jorge. Para cambiarlo, edita `acceso.ts`.
import { ACCESS_CODE } from './zona-privada/acceso';

// ── Datos fijos de la empresa ──────────────────────────────────────
const EMPRESA = {
  nombre: 'Afondo Limpieza de Campanas',
  tecnico: 'Jaime Gascón López',
  nif: '53978208-Z',
  direccion: 'Partida Canastell, E-17, 03690 San Vicente del Raspeig (Alicante)',
  tel: '622 064 101',
  email: 'hola@afondolimpiezadecampanas.com',
  web: 'afondolimpiezadecampanas.com',
};

// ── Tipos de servicio ──────────────────────────────────────────────
// Jaime marca lo que ha hecho y los textos técnicos se rellenan solos
// (siguen siendo editables). Puede marcar uno o varios a la vez.
type Servicio = {
  key: string;
  grupo: string;
  label: string;
  subtitulo: string;
  instalacion: string;
  metodologia: string;
  productos: string;
  conclusion: string;
  footer: string;
};

const GRUPOS = [
  '🧽 Limpieza y mantenimiento',
  '🔧 Reparación y sustitución',
  '🏗️ Instalación',
  '🔇 Insonorización',
  '🧗 Trabajos verticales',
];

// Productos reales que usa Jaime (fotos enviadas por Jorge 2026-06-10).
// El desengrasante va en los servicios de limpieza; la masilla de poliuretano
// se usa para sellar en TODOS los servicios. La mención a las FDS cubre
// inspecciones de sanidad o policía local.
const DESENGRASANTE_PL =
  'Desengrasante: DETERGRAS PL (Droguería Valiente), desengrasante alcalino profesional para planchas, hornos y sistemas de extracción.';
const MASILLA_PU =
  'Sellado: Masilla de Poliuretano Blanca (Unecol, ref. 7801) — ficha del producto: unecol.com/productos/public/ver/?idp=67';
const FICHAS_FDS =
  'Ficha técnica y ficha de datos de seguridad (FDS) de los productos a disposición de la autoridad sanitaria o inspección competente.';
const PRODUCTOS_LIMPIEZA = `${DESENGRASANTE_PL} ${MASILLA_PU} ${FICHAS_FDS}`;

const SERVICIOS: Servicio[] = [
  {
    key: 'limpieza_completa',
    grupo: '🧽 Limpieza y mantenimiento',
    label: 'Limpieza completa: campana + conductos + turbina',
    subtitulo: 'de Limpieza y Desengrase',
    instalacion: 'Sistema completo de extracción de cocina profesional formado por campana mural con filtros tipo malla metálica, plenum, red de conductos y turbina de extracción. Por el uso continuado presentaba acumulación de grasa en filtros, paredes interiores y rodete que reducía el caudal de aspiración y aumentaba el riesgo de incendio.',
    metodologia: 'Desmontaje y desengrase de filtros por inmersión y aplicación de espuma alcalina activa con arrastre mecánico en campana, plenum y paredes interiores de los conductos accesibles por registros. Desengrase de turbina y carcasa, remontaje y prueba de funcionamiento final verificando caudal y ausencia de vibraciones.',
    productos: PRODUCTOS_LIMPIEZA,
    conclusion: 'El sistema queda limpio y desengrasado en toda su longitud accesible, eliminando el principal foco de riesgo de incendio por grasa y restableciendo el rendimiento de aspiración. La actuación sigue los criterios de la norma UNE 100165 y contribuye al cumplimiento del CTE DB-SI (seguridad frente a incendio) y del Reglamento (CE) 852/2004 de higiene alimentaria. Se recomienda mantener la periodicidad de limpieza según el uso de la cocina.',
    footer: 'El presente certificado acredita el mantenimiento higiénico y la reducción del riesgo de incendio del sistema de extracción, en línea con el CTE DB-SI (seguridad en caso de incendio) y el Reglamento (CE) 852/2004 sobre higiene de los productos alimenticios.',
  },
  {
    key: 'limpieza_campanas',
    grupo: '🧽 Limpieza y mantenimiento',
    label: 'Limpieza de campana (filtros y plenum)',
    subtitulo: 'de Limpieza de Campana',
    instalacion: 'Campana extractora de cocina profesional con filtros tipo malla metálica y plenum, con acumulación de grasa en filtros y superficies interiores por el uso continuado. La actuación se centra en la campana, sin intervenir la red de conductos ni la turbina.',
    metodologia: 'Desmontaje de los filtros y desengrase por inmersión, aplicación de espuma alcalina activa con arrastre mecánico en plenum y superficies interiores y exteriores de la campana, aclarado y retirada de residuos. Remontaje de los filtros y comprobación final del estado de la campana.',
    productos: PRODUCTOS_LIMPIEZA,
    conclusion: 'La campana y sus filtros quedan limpios y desengrasados, restableciendo la capacidad de captación de grasas y reduciendo el riesgo de incendio en el punto de mayor acumulación del sistema. La actuación sigue los criterios de la norma UNE 100165 y contribuye al cumplimiento del CTE DB-SI (seguridad frente a incendio) y del Reglamento (CE) 852/2004 de higiene alimentaria.',
    footer: 'Este certificado acredita la limpieza de la campana extractora y la consiguiente reducción del riesgo de incendio, conforme al CTE DB-SI y al Reglamento (CE) 852/2004 en materia de higiene alimentaria.',
  },
  {
    key: 'limpieza_conductos',
    grupo: '🧽 Limpieza y mantenimiento',
    label: 'Limpieza de conductos de extracción',
    subtitulo: 'de Limpieza de Conductos',
    instalacion: 'Red de conductos de extracción de la cocina, desde la campana hasta la salida al exterior, con depósitos de grasa adheridos a las paredes interiores por el uso prolongado. La actuación se limita a la tubería, sin intervenir campana ni turbina.',
    metodologia: 'Apertura o práctica de registros de inspección a lo largo del trazado, aplicación de desengrasante de contacto y arrastre mecánico de las paredes interiores hasta retirar la costra de grasa. Se sellan posteriormente las aberturas practicadas y se comprueba el tiro.',
    productos: PRODUCTOS_LIMPIEZA,
    conclusion: 'Los conductos quedan libres de grasa en los tramos accesibles, mejorando el tiro y la evacuación de humos y reduciendo el riesgo de propagación de incendio por el interior de la red. La limpieza sigue los criterios de la norma UNE 100165 y contribuye al cumplimiento del CTE DB-SI y del Reglamento (CE) 852/2004.',
    footer: 'Este certificado acredita la limpieza de los conductos de extracción y la consiguiente reducción del riesgo de incendio, conforme al CTE DB-SI y al Reglamento (CE) 852/2004 en materia de higiene alimentaria.',
  },
  {
    key: 'desmontaje_turbina_limpieza',
    grupo: '🧽 Limpieza y mantenimiento',
    label: 'Desmontaje y limpieza en profundidad de turbina',
    subtitulo: 'de Limpieza de Turbina',
    instalacion: 'Turbina o extractor centrífugo del sistema de extracción, con acumulación de grasa en rodete, álabes y carcasa. Esta acumulación desequilibraba el rodete y comprometía el rendimiento de aspiración, generando vibraciones y sobreesfuerzo del motor.',
    metodologia: 'Corte de alimentación y desmontaje completo del grupo, desengrase a fondo de rodete, álabes y carcasa por inmersión y arrastre mecánico. Remontaje con revisión de fijaciones y juntas, y prueba de funcionamiento verificando sentido de giro, caudal y ausencia de vibraciones.',
    productos: PRODUCTOS_LIMPIEZA,
    conclusion: 'La turbina recupera su rendimiento de aspiración y funciona sin vibraciones ni ruidos anómalos, eliminando la grasa acumulada que constituía un foco de riesgo de incendio. La actuación contribuye al cumplimiento del CTE DB-SI en materia de seguridad frente a incendio y del Reglamento (CE) 852/2004 de higiene alimentaria.',
    footer: 'El presente certificado acredita la limpieza en profundidad y la verificación funcional del equipo de extracción, contribuyendo a la seguridad frente a incendio (CTE DB-SI) y a la higiene alimentaria (Reglamento (CE) 852/2004).',
  },
  {
    key: 'cambio_turbina',
    grupo: '🔧 Reparación y sustitución',
    label: 'Sustitución de turbina/motor por avería',
    subtitulo: 'de Sustitución de Turbina',
    instalacion: 'Campana de cocina profesional cuya turbina centrífuga presentaba avería (ausencia de caudal o ruido y vibración excesivos). Comprobado que campana y conductos se encontraban en estado apto, la actuación se centra en la sustitución del grupo motor-turbina.',
    metodologia: 'Corte y bloqueo de la alimentación eléctrica, desmontaje del grupo averiado e instalación de un nuevo motor-turbina de caudal equivalente. Reconexión eléctrica, sellado de la unión al conducto y prueba de funcionamiento verificando caudal, sentido de giro y ausencia de vibraciones.',
    productos: `Grupo motor-turbina de sustitución con caudal acorde al dimensionado del sistema, elementos de fijación y antivibratorios, y material eléctrico de conexión. Todos los materiales son de uso profesional y compatibles con la instalación existente. ${MASILLA_PU} ${FICHAS_FDS}`,
    conclusion: 'Tras la sustitución el sistema queda operativo, restableciendo el caudal de aspiración y la correcta evacuación de humos al exterior. La instalación funciona conforme a las exigencias de ventilación del CTE DB-HS3 y a las condiciones de higiene del Reglamento (CE) 852/2004, quedando documentada la reparación a efectos de garantía y seguro.',
    footer: 'El presente documento acredita la correcta ejecución de los trabajos de sustitución del grupo motor de extracción descritos y tiene valor a efectos de justificación técnica ante compañías aseguradoras y autoridades sanitarias, en el marco del CTE DB-HS3 y del Reglamento (CE) 852/2004.',
  },
  {
    key: 'reparacion_conductos',
    grupo: '🔧 Reparación y sustitución',
    label: 'Reparación de conductos (medidas correctoras)',
    subtitulo: 'de Medidas Correctoras',
    instalacion: 'Red de conductos de evacuación de humos con deficiencias de estanqueidad en uno o varios tramos, que provocaban fugas de humo y olores hacia el interior del local o zonas colindantes. Las deficiencias se corrigen mediante medidas correctoras sobre los tramos afectados.',
    metodologia: 'Inspección y localización de los puntos de fuga, reparación de uniones y sustitución de los tramos dañados, con sellado resistente a alta temperatura. Comprobación final de la estanqueidad y de la correcta evacuación de humos al exterior.',
    productos: `Tramos de conducto, abrazaderas y uniones, juntas resistentes a alta temperatura, y material de fijación y soporte. Todos los componentes son aptos para conductos de extracción de cocina y compatibles con la instalación. ${MASILLA_PU} ${FICHAS_FDS}`,
    conclusion: 'El sistema queda estanco y evacúa correctamente al exterior, eliminando las fugas de humo y olores detectadas. Las medidas correctoras se ajustan a las exigencias de ventilación del CTE DB-HS3 y de seguridad frente a incendio del CTE DB-SI, junto con la higiene del Reglamento (CE) 852/2004.',
    footer: 'El presente documento acredita las medidas correctoras ejecutadas sobre el sistema de extracción de humos a efectos de su presentación ante la autoridad municipal y los servicios técnicos competentes, así como ante compañías aseguradoras, en cumplimiento del CTE DB-HS3, el CTE DB-SI y el Reglamento (CE) 852/2004.',
  },
  {
    key: 'instalacion_completa',
    grupo: '🏗️ Instalación',
    label: 'Instalación completa de campana y extracción',
    subtitulo: 'de Instalación de Extracción',
    instalacion: 'Instalación nueva de un sistema completo de extracción para cocina profesional, compuesto por campana con filtros, red de conductos, turbina de extracción y salida de evacuación al exterior. Dimensionado acorde a la potencia y al uso previsto de la cocina.',
    metodologia: 'Montaje de campana y red de conductos con uniones estancas, instalación de la turbina y de la salida de evacuación a cubierta o fachada, y conexionado eléctrico. Puesta en marcha con comprobación de caudal de aspiración, estanqueidad y ausencia de vibraciones.',
    productos: `Campana, conductos y accesorios, turbina, terminal de salida, fijaciones y antivibratorios, juntas resistentes a alta temperatura, y material de conexión eléctrica. Materiales de uso profesional adecuados a la sección y temperatura de trabajo del sistema. ${MASILLA_PU} ${FICHAS_FDS}`,
    conclusion: 'El sistema instalado queda operativo y estanco, con el caudal de aspiración verificado y la evacuación de humos resuelta al exterior. La instalación cumple las exigencias de ventilación del CTE DB-HS3, de seguridad frente a incendio del CTE DB-SI y de higiene del Reglamento (CE) 852/2004.',
    footer: 'El presente documento acredita la correcta ejecución de la instalación del sistema de extracción de humos descrito y tiene valor a efectos de justificación técnica ante compañías aseguradoras y autoridades sanitarias y municipales, en el marco del CTE DB-HS3, el CTE DB-SI y el Reglamento (CE) 852/2004.',
  },
  {
    key: 'insonorizacion',
    grupo: '🔇 Insonorización',
    label: 'Insonorización de campana o turbina',
    subtitulo: 'de Aislamiento Acústico',
    instalacion: 'Elementos del sistema de extracción generadores de ruido y vibraciones —principalmente la turbina y, en su caso, campana y conductos— que transmitían molestias acústicas al local y a las viviendas o locales colindantes.',
    metodologia: 'Medición del nivel sonoro inicial, instalación de soportes antivibratorios y material absorbente y, donde procede, conexiones flexibles y silenciadores en línea para reducir la transmisión por vía aérea y estructural. Medición final para verificar la reducción obtenida.',
    productos: `Materiales de aislamiento y absorción acústica, antivibratorios tipo silentblock y soportes elásticos, conexiones flexibles y, en su caso, silenciadores en línea. Materiales seleccionados según el rango de frecuencias y el nivel de reducción requerido. ${MASILLA_PU} ${FICHAS_FDS}`,
    conclusion: 'Se reduce de forma medible el nivel sonoro y las vibraciones transmitidas al entorno. La actuación está orientada a situar la inmisión (NAE) dentro de los límites de la normativa de contaminación acústica y de las ordenanzas municipales aplicables, debiendo verificarse con la medición reglamentaria cuando proceda.',
    footer: 'Este certificado acredita las medidas correctoras de aislamiento acústico ejecutadas y la reducción del nivel sonoro (inmisión NAE), a efectos de la normativa de contaminación acústica y las ordenanzas municipales aplicables.',
  },
  {
    key: 'trabajos_verticales',
    grupo: '🧗 Trabajos verticales',
    label: 'Trabajos verticales en conductos de fachada',
    subtitulo: 'de Trabajos Verticales',
    instalacion: 'Conductos de evacuación situados en fachada o en altura, no accesibles por medios convencionales como andamios o plataformas. La intervención se ejecuta mediante técnicas de acceso y posicionamiento por cuerda.',
    metodologia: 'Trabajos por cuerda con doble línea independiente de trabajo y de seguridad, accediendo a los tramos en altura para reparar uniones y elementos afectados. Se restablece la estanqueidad del tramo y se comprueba la evacuación.',
    productos: `EPI anticaídas y equipo de acceso por cuerda (arnés, cuerdas, dispositivos y anclajes) conforme a normativa, y materiales de reparación: uniones, juntas resistentes a alta temperatura y material de fijación. El equipo de seguridad se revisa antes de cada intervención. ${MASILLA_PU} ${FICHAS_FDS}`,
    conclusion: 'Se restablece la estanqueidad y la correcta evacuación de humos del tramo intervenido. Los trabajos en altura se han ejecutado en condiciones de seguridad conforme al RD 2177/2004 y a la norma EN 363, recuperando las condiciones de ventilación exigidas por el CTE DB-HS3.',
    footer: 'El presente documento acredita la correcta ejecución de los trabajos en altura descritos y las medidas correctoras aplicadas al conducto, así como su realización en condiciones de seguridad conforme al RD 2177/2004 y la norma EN 363, teniendo valor a efectos de justificación ante compañías aseguradoras y autoridades municipales y sanitarias en el marco del CTE DB-HS3.',
  },
];

const SUBTITULO_DEFECTO = 'de Limpieza y Desengrase';
const SUBTITULO_MULTI = 'de Actuación Técnica';
const FOOTER_DEFECTO = 'Informe técnico privado del servicio de limpieza y desengrase realizado, con valor probatorio ante compañías aseguradoras y autoridades sanitarias. Acredita el mantenimiento higiénico y la reducción del riesgo de incendio por acumulación de grasa (CTE DB-SI · Reg. CE 852/2004).';
const FOOTER_MULTI = 'Documento técnico privado de las actuaciones descritas sobre el sistema de extracción de humos, con valor probatorio ante compañías aseguradoras y autoridades sanitarias y municipales. Acredita la correcta ejecución de los trabajos y, en su caso, de las medidas correctoras ejecutadas (CTE DB-SI · CTE DB-HS3 · Reg. CE 852/2004).';

// Combina los textos de los servicios marcados (uno o varios) en cada bloque.
const componer = (keys: string[]) => {
  const sel = SERVICIOS.filter((s) => keys.includes(s.key));
  const join = (f: 'instalacion' | 'metodologia' | 'productos' | 'conclusion') =>
    sel.map((s) => s[f]).join('\n\n');
  return {
    instalacion: join('instalacion'),
    metodologia: join('metodologia'),
    productos: join('productos'),
    conclusion: join('conclusion'),
    subtitulo: sel.length === 1 ? sel[0].subtitulo : SUBTITULO_MULTI,
    footer: sel.length === 1 ? sel[0].footer : FOOTER_MULTI,
  };
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
  const [nifCliente, setNifCliente] = useState('');
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
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState('');
  const [aviso, setAviso] = useState('');

  // Servicios marcados con checkbox → autorrellenan los textos (editables)
  const [serviciosSel, setServiciosSel] = useState<string[]>([]);
  const [subtituloDoc, setSubtituloDoc] = useState(SUBTITULO_DEFECTO);
  const [footerTexto, setFooterTexto] = useState(FOOTER_DEFECTO);

  const toggleServicio = (key: string) => {
    setServiciosSel((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      if (next.length > 0) {
        const c = componer(next);
        setInstalacion(c.instalacion);
        setMetodologia(c.metodologia);
        setProductos(c.productos);
        setConclusion(c.conclusion);
        setSubtituloDoc(c.subtitulo);
        setFooterTexto(c.footer);
      } else {
        setSubtituloDoc(SUBTITULO_DEFECTO);
        setFooterTexto(FOOTER_DEFECTO);
      }
      return next;
    });
  };

  // Si el usuario cambia datos o fotos, el PDF anterior deja de ser válido
  useEffect(() => {
    setPdfBlob(null);
    setAviso('');
  }, [fotos, nInforme, fecha, cliente, direccionCliente, nifCliente, actividad, instalacion, metodologia, productos, conclusion, validez, factura, subtituloDoc, footerTexto]);

  const previewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [frameH, setFrameH] = useState(0);
  // Vista previa colapsable: al redactar, el protagonista es el formulario.
  // Oculta, la maqueta sigue montada off-screen a ancho real (794) para que
  // html2canvas pueda rasterizarla igual al generar el PDF.
  const [verPreview, setVerPreview] = useState(false);

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
  }, [fotos, instalacion, metodologia, productos, conclusion, cliente, direccionCliente, nifCliente, actividad, validez, factura, unlocked]);

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

  // Descarga directa: ancla con `download` → el navegador lo deja en su carpeta
  // de Descargas, sin hoja de compartir por medio. (jsPDF.save() por sí solo en
  // iOS Safari abre el visor pero NO descarga; el ancla sí funciona.)
  const descargarPDF = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 4000);
  };

  // Compartir: hoja nativa del sistema con el PDF adjunto — ahí se elige WhatsApp.
  // La web no puede abrir WhatsApp directamente con un archivo (wa.me solo admite
  // texto), así que la hoja del sistema es el camino más corto posible.
  const compartirPDF = async (blob: Blob, name: string) => {
    const file = new File([blob], name, { type: 'application/pdf' });
    const nav = navigator as Navigator & {
      canShare?: (data?: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; title?: string }) => Promise<void>;
    };
    if (nav.canShare && nav.share && nav.canShare({ files: [file] })) {
      try {
        await nav.share({ files: [file], title: name });
        return;
      } catch (e) {
        // Si el usuario cancela la hoja de compartir, no hacemos nada más
        if (e instanceof Error && e.name === 'AbortError') return;
        // Cualquier otro fallo (p.ej. gesto caducado en iOS) → caemos a descarga
      }
    }
    descargarPDF(blob, name);
    setAviso('Este navegador no permite compartir directo: el PDF se ha descargado — adjúntalo en WhatsApp desde Descargas.');
  };

  const generarPDF = async () => {
    if (!previewRef.current) return;
    setGenerando(true);
    setAviso('');
    try {
      const node = previewRef.current;
      // La maqueta se muestra encogida con `transform: scale(<1)` (ver wrapper en el
      // render) para que quepa en su columna. html2canvas hereda ese scale del ancestro
      // y reduce los elementos de 1px (filo dorado, separadores) a una fracción de píxel:
      // genera un canvas de alto 0 y `createPattern` lanza "width or height of 0", de ahí
      // el fallo. En móvil el scale es ~0.45 y SIEMPRE falla; en escritorio es ~1 y por eso
      // ahí funcionaba. Lo neutralizamos solo en el clon que html2canvas rasteriza, sin
      // tocar lo que ve el usuario.
      const maxSide = 4000;
      const w = node.offsetWidth || 794;
      const h = node.offsetHeight || 1123;
      const escala = Math.min(2, maxSide / w, maxSide / h);

      // Posición (como fracción 0..1 de la altura) del borde superior e inferior de cada
      // bloque que NO debe partirse entre páginas. Se mide sobre el DOM real; al usar
      // fracciones, la escala de visualización del móvil se cancela.
      const rootRect = node.getBoundingClientRect();
      const Hreal = rootRect.height || 1;
      const lineas = new Set<number>([0, 1]);
      node.querySelectorAll('[data-pdf-block]').forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        lineas.add((r.top - rootRect.top) / Hreal);
        lineas.add((r.bottom - rootRect.top) / Hreal);
      });

      const canvas = await html2canvas(node, {
        scale: escala,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        windowWidth: w,
        windowHeight: h,
        onclone: (doc) => {
          const cloned = doc.getElementById('afondo-pdf-root');
          const wrapper = cloned?.parentElement;
          if (wrapper) {
            wrapper.style.transform = 'none';
            wrapper.style.overflow = 'visible';
            const frame = wrapper.parentElement;
            if (frame) {
              frame.style.height = 'auto';
              frame.style.overflow = 'visible';
            }
          }
          // html2canvas 1.4.1 pinta cada linear-gradient en un canvas temporal cuyo
          // tamaño es el float CSS del elemento: si queda entre 0 y 1px, `canvas.width`
          // se trunca a 0 pero pasa el guard interno `width > 0` y createPattern lanza
          // "width or height of 0" (bug upstream #2775). Saneamos el clon: gradientes en
          // elementos sub-píxel fuera, y elementos reemplazados de tamaño 0 ocultos.
          if (cloned) {
            const win = doc.defaultView || window;
            cloned.querySelectorAll<HTMLElement>('*').forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.width < 1 || r.height < 1) {
                const bg = win.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none') el.style.backgroundImage = 'none';
                if (el instanceof win.HTMLImageElement || el instanceof win.HTMLCanvasElement || el.tagName.toLowerCase() === 'svg') {
                  el.style.display = 'none';
                }
              }
            });
          }
        },
      });
      if (!canvas.width || !canvas.height) {
        throw new Error('el informe se rasterizó vacío');
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgW = 210;
      const pageH = 297;
      // Alto de canvas (px) que llena una página A4 completa
      const pageCanvasH = canvas.width * (pageH / imgW);
      // Margen superior (mm) para la 2ª página en adelante: aire para que el
      // contenido respire y no quede pegado al borde de arriba. La 1ª empieza
      // a tope porque ahí va la cabecera con su propio diseño.
      const margenTopMm = 12;
      const margenTopPx = canvas.width * (margenTopMm / imgW);

      // Líneas de corte seguras (bordes de bloque) en px de canvas, ordenadas
      const cortes = [...lineas].map((f) => f * canvas.height).sort((a, b) => a - b);

      // Reparte en páginas cortando SIEMPRE en un borde de bloque cuando es posible,
      // para que ningún bloque ni foto quede partido entre dos páginas.
      const paginas: Array<[number, number]> = [];
      let y = 0;
      while (y < canvas.height - 1) {
        // En páginas 2+ el alto útil se reduce por el margen superior.
        const disp = paginas.length === 0 ? pageCanvasH : pageCanvasH - margenTopPx;
        const minAvance = disp * 0.15; // evita páginas casi vacías / bucle infinito
        const objetivo = y + disp;
        if (objetivo >= canvas.height) {
          paginas.push([y, canvas.height]);
          break;
        }
        let corte = -1;
        for (const ln of cortes) {
          if (ln > y + minAvance && ln <= objetivo) corte = ln;
        }
        if (corte < 0) corte = objetivo; // un bloque más alto que una página: corte forzado
        paginas.push([y, corte]);
        y = corte;
      }

      paginas.forEach(([y0, y1], i) => {
        const ph = Math.max(1, Math.round(y1 - y0));
        const tmp = document.createElement('canvas');
        tmp.width = canvas.width;
        tmp.height = ph;
        const tctx = tmp.getContext('2d');
        if (tctx) {
          tctx.fillStyle = '#ffffff';
          tctx.fillRect(0, 0, tmp.width, tmp.height);
          tctx.drawImage(canvas, 0, y0, canvas.width, ph, 0, 0, canvas.width, ph);
        }
        const img = tmp.toDataURL('image/jpeg', 0.92);
        const hmm = (ph * imgW) / canvas.width;
        const offTop = i === 0 ? 0 : margenTopMm;
        if (i > 0) pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, offTop, imgW, hmm);
      });

      const safe = (cliente || 'informe').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      const name = `afondo-informe-${nInforme}-${safe}.pdf`;
      const blob = pdf.output('blob');
      setPdfBlob(blob);
      setPdfName(name);
      descargarPDF(blob, name);
      setAviso('PDF descargado. Para enviarlo por WhatsApp, pulsa «Compartir PDF».');
    } catch (err) {
      const motivo = err instanceof Error && err.message ? `\n\nMotivo: ${err.message}` : '';
      alert(`No se pudo generar el PDF. Inténtalo de nuevo.${motivo}`);
      console.error('Afondo · error al generar PDF:', err);
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
  const ayuda: React.CSSProperties = {
    fontSize: 12.5,
    color: '#94a3b8',
    marginTop: -2,
    marginBottom: 7,
    lineHeight: 1.4,
  };

  const n = fotos.length;
  const cols = colsFotos(n);

  // Bloque de sección del informe (numerado, premium)
  const Bloque: React.FC<{ num: number; titulo: string; children: React.ReactNode }> = ({
    num,
    titulo,
    children,
  }) => (
    <div data-pdf-block style={{ marginTop: 20, breakInside: 'avoid', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
            flexShrink: 0,
          }}
        >
          {/* El número se dibuja como <text> SVG con dominant-baseline=central:
              html2canvas rasteriza el SVG con el motor nativo del navegador y lo
              centra de forma exacta. Su motor de texto normal ignoraba line-height
              y margin y dejaba el dígito caído hacia abajo, fuera del centro. */}
          <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block' }}>
            <text
              x="11"
              y="11.5"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#fff"
              fontSize="11"
              fontWeight="900"
              fontFamily="'Public Sans', system-ui, sans-serif"
            >
              {num}
            </text>
          </svg>
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
      <div style={{ maxWidth: verPreview ? 1340 : 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, color: INK }}>AFONDO · Generador de Informes</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Marca el servicio, revisa los datos, añade fotos si quieres (opcional) y pulsa “Descargar PDF”.</div>
          </div>
          <button
            onClick={() => setVerPreview((v) => !v)}
            style={{
              padding: '10px 16px',
              background: verPreview ? '#fff' : `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
              color: verPreview ? INK : '#fff',
              border: verPreview ? '1.5px solid #e2e8f0' : 'none',
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {verPreview ? '✕ Ocultar vista previa' : '👁 Ver vista previa'}
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: verPreview ? 'minmax(420px, 1.25fr) minmax(360px, 1fr)' : 'minmax(0, 1fr)',
            gap: 24,
            alignItems: 'start',
          }}
          className="afondo-grid"
        >
          {/* ── FORMULARIO ── */}
          <div style={{ background: '#fff', borderRadius: 18, padding: 26, boxShadow: '0 4px 20px rgba(15,23,42,.06)' }}>
            {/* ── ¿Qué has hecho? Checkboxes que autorrellenan los textos ── */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: INK }}>1 · ¿Qué has hecho hoy?</div>
              <div style={{ fontSize: 12.5, color: '#64748b', marginBottom: 10, lineHeight: 1.45 }}>
                Marca lo que has hecho (puedes marcar varios). El texto del certificado se rellena solo y luego puedes cambiarlo.
              </div>
            </div>
            {GRUPOS.map((g) => {
              const items = SERVICIOS.filter((s) => s.grupo === g);
              if (items.length === 0) return null;
              return (
                <div key={g} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: BRAND_DARK, marginBottom: 7, letterSpacing: 0.3 }}>{g}</div>
                  {items.map((s) => {
                    const on = serviciosSel.includes(s.key);
                    return (
                      <label
                        key={s.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 11,
                          padding: '11px 13px',
                          marginBottom: 7,
                          border: `1.5px solid ${on ? BRAND : '#e2e8f0'}`,
                          background: on ? 'rgba(106,101,227,0.08)' : '#fff',
                          borderRadius: 11,
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleServicio(s.key)}
                          style={{ width: 19, height: 19, accentColor: BRAND, flexShrink: 0, cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.3 }}>{s.label}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
            <div style={{ height: 1, background: '#e2e8f0', margin: '8px 0 18px' }} />
            <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 12 }}>2 · Datos del informe</div>

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

            <label style={label}>NIF / CIF</label>
            <input style={input} value={nifCliente} onChange={(e) => setNifCliente(e.target.value)} placeholder="B12345678" />

            <label style={label}>Actividad (opcional)</label>
            <input style={input} value={actividad} onChange={(e) => setActividad(e.target.value)} placeholder="Restaurante / cocina industrial" />

            <div style={{ height: 1, background: '#e2e8f0', margin: '20px 0 16px' }} />
            <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 2 }}>3 · Redacción del informe</div>
            <div style={{ fontSize: 12.5, color: '#64748b', marginBottom: 6, lineHeight: 1.45 }}>
              Los textos vienen rellenos según lo que has marcado arriba. Repásalos y cambia lo que quieras.
            </div>

            <label style={label}>Descripción de la instalación</label>
            <div style={ayuda}>Qué sistema había y en qué estado estaba al llegar.</div>
            <textarea style={{ ...input, minHeight: 130, resize: 'vertical', lineHeight: 1.5 }} value={instalacion} onChange={(e) => setInstalacion(e.target.value)} />

            <label style={label}>Metodología aplicada</label>
            <div style={ayuda}>Qué habéis hecho y cómo, paso a paso.</div>
            <textarea style={{ ...input, minHeight: 140, resize: 'vertical', lineHeight: 1.5 }} value={metodologia} onChange={(e) => setMetodologia(e.target.value)} />

            <label style={label}>Productos utilizados</label>
            <div style={ayuda}>Con qué productos y materiales se ha trabajado.</div>
            <textarea style={{ ...input, minHeight: 110, resize: 'vertical', lineHeight: 1.5 }} value={productos} onChange={(e) => setProductos(e.target.value)} />

            <label style={label}>Conclusión</label>
            <div style={ayuda}>Cómo queda la instalación y qué acredita el informe.</div>
            <textarea style={{ ...input, minHeight: 130, resize: 'vertical', lineHeight: 1.5 }} value={conclusion} onChange={(e) => setConclusion(e.target.value)} />

            <div style={{ height: 1, background: '#e2e8f0', margin: '20px 0 16px' }} />
            <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 12 }}>4 · Cierre y descarga</div>

            <label style={{ ...label, marginTop: 0 }}>Validez / próxima revisión</label>
            <input style={input} value={validez} onChange={(e) => setValidez(e.target.value)} />

            <label style={label}>Nº de factura asociada (opcional)</label>
            <input style={input} value={factura} onChange={(e) => setFactura(e.target.value)} placeholder="Ej. F-2026/045" />

            <label style={label}>Fotos — opcional ({n}/8)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => { onFiles(e.target.files); e.target.value = ''; }} style={{ fontSize: 14, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }} />
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

            {/* Botón principal: al final, tras rellenar los datos */}
            <button
              onClick={generarPDF}
              disabled={generando}
              style={{
                width: '100%',
                marginTop: 22,
                padding: '16px 26px',
                background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 800,
                cursor: generando ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(106,101,227,.35)',
              }}
            >
              {generando ? 'Generando…' : 'Descargar PDF'}
            </button>

            {pdfBlob && (
              <button
                onClick={() => compartirPDF(pdfBlob, pdfName)}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: '14px 26px',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(22,163,74,.30)',
                }}
              >
                📲 Compartir PDF (WhatsApp)
              </button>
            )}
            {aviso && (
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
                {aviso}
              </div>
            )}
          </div>

          {/* ── PREVIEW / PDF (escalado para caber; oculta = montada off-screen
                a ancho real 794 para que html2canvas rasterice igual) ── */}
          <div
            ref={frameRef}
            style={
              verPreview
                ? { position: 'relative', width: '100%', height: frameH, overflow: 'hidden' }
                : { position: 'fixed', left: -3000, top: 0, width: 794, height: 0, overflow: 'hidden', pointerEvents: 'none' }
            }
          >
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
                <div data-pdf-block style={{ position: 'relative', background: `linear-gradient(125deg, ${NAVY} 0%, ${BRAND_DARK} 60%, ${BRAND} 100%)`, color: '#fff', padding: '30px 40px 28px', overflow: 'hidden' }}>
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
                      <div style={{ fontSize: 11.5, opacity: 0.85 }}>{subtituloDoc}</div>
                      <div style={{ display: 'inline-block', marginTop: 8, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 800 }}>
                        Nº {nInforme}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Filo dorado */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})` }} />

                {/* Franja datos empresa */}
                <div data-pdf-block style={{ background: INK, color: '#cbd5e1', padding: '9px 40px', fontSize: 10.5, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span>{EMPRESA.tecnico} · NIF {EMPRESA.nif}</span>
                  <span>{EMPRESA.tel} · {EMPRESA.email}</span>
                </div>

                <div data-pdf-block style={{ position: 'relative', padding: '26px 40px 0' }}>
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
                      {nifCliente && <div style={{ marginTop: 2 }}>NIF/CIF: {nifCliente}</div>}
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
                          <div key={i} data-pdf-block style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 14px rgba(15,23,42,.16)', aspectRatio: '4 / 3' }}>
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
                  <div data-pdf-block style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 30, paddingTop: 18, borderTop: '2px solid #f1f5f9' }}>
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
                <div data-pdf-block style={{ background: NAVY, color: '#94a3b8', padding: '14px 40px', fontSize: 9.5, lineHeight: 1.55 }}>
                  <div style={{ color: GOLD_LIGHT, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', fontSize: 9.5, marginBottom: 4 }}>
                    Empresa con seguro de Responsabilidad Civil en vigor
                  </div>
                  {footerTexto}
                  <div style={{ marginTop: 6, color: '#cbd5e1' }}>{EMPRESA.direccion} · {EMPRESA.tel} · {EMPRESA.web}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .afondo-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
        .afondo-grid > * { min-width: 0; }
        .afondo-grid input[type="date"] { -webkit-appearance: none; appearance: none; }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;
