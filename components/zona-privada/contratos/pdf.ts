import { jsPDF } from 'jspdf';
import {
  Contrato, Bloque, clausulasAntesDelPrecio, clausulaDuracion, CONFORMIDAD,
  PAGOS, importes, eur, fechaLarga,
} from './datos';

// Mismo registro visual que el certificado de Jaime (violeta + oro, fondo blanco).
const BRAND: [number, number, number] = [106, 101, 227];
const NAVY: [number, number, number] = [11, 16, 32];
const INK: [number, number, number] = [15, 23, 42];
const GRIS: [number, number, number] = [100, 116, 139];
const LINEA: [number, number, number] = [226, 232, 240];
const GOLD: [number, number, number] = [212, 175, 55];

const M = 20, W = 210, H = 297, ANCHO = W - 2 * M, PIE = 18;

type Seg = { s: string; b?: boolean };

export function generarContratoPDF(c: Contrato): Blob {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let y = 0;

  const fuente = (b = false, size = 9.5, color = INK) => {
    pdf.setFont('helvetica', b ? 'bold' : 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
  };
  const salto = (alto: number) => {
    if (y + alto > H - PIE - 6) { pdf.addPage(); y = M; }
  };

  // Texto mixto (negrita + normal) con ajuste de línea
  const rico = (segs: Seg[], x: number, ancho: number, size = 9.5, lh = 4.6) => {
    const palabras: { w: string; b: boolean }[] = [];
    segs.forEach((sg) => sg.s.split(/\s+/).filter(Boolean).forEach((w) => palabras.push({ w, b: !!sg.b })));
    let linea: typeof palabras = [];
    const medir = (p: typeof palabras) => p.reduce((acc, q, i) => {
      fuente(q.b, size); return acc + pdf.getTextWidth(q.w) + (i ? pdf.getTextWidth(' ') : 0);
    }, 0);
    const pintar = (p: typeof palabras) => {
      salto(lh);
      let cx = x;
      p.forEach((q, i) => {
        fuente(q.b, size);
        if (i) cx += pdf.getTextWidth(' ');
        pdf.text(q.w, cx, y);
        cx += pdf.getTextWidth(q.w);
      });
      y += lh;
    };
    palabras.forEach((p) => {
      if (linea.length && medir([...linea, p]) > ancho) { pintar(linea); linea = []; }
      linea.push(p);
    });
    if (linea.length) pintar(linea);
  };

  const bloque = (bq: Bloque) => {
    if (bq.t === 'h') {
      salto(30); y += 4;
      fuente(true, 10.5, BRAND); pdf.text(bq.s, M, y);
      y += 2; pdf.setDrawColor(...LINEA); pdf.setLineWidth(0.3); pdf.line(M, y, W - M, y); y += 5;
    } else if (bq.t === 'sub') {
      salto(9); y += 1.5; fuente(true, 9.8, INK); pdf.text(bq.s, M, y); y += 5;
    } else if (bq.t === 'p') {
      rico([{ s: bq.s }], M, ANCHO); y += 1.5;
    } else {
      salto(5);
      pdf.setFillColor(...BRAND); pdf.circle(M + 2.2, y - 1.2, 0.8, 'F');
      rico(bq.b ? [{ s: bq.b, b: true }, { s: bq.s }] : [{ s: bq.s }], M + 6, ANCHO - 6);
      y += 1;
    }
  };

  // ── Cabecera ──
  pdf.setFillColor(...NAVY); pdf.rect(0, 0, W, 34, 'F');
  pdf.setFillColor(...GOLD); pdf.rect(0, 34, W, 0.8, 'F');
  fuente(true, 15, [255, 255, 255]); pdf.text('AFONDO', M, 14);
  fuente(false, 7.5, [190, 196, 230]); pdf.text('HIGIENE INDUSTRIAL', M, 19);
  fuente(true, 10.5, [255, 255, 255]);
  pdf.text(['CONTRATO DE MANTENIMIENTO PREVENTIVO Y TÉCNICO', 'DE SISTEMAS DE EXTRACCIÓN DE HUMOS'], W - M, 13, { align: 'right' });
  y = 46;
  fuente(false, 9.5, GRIS);
  pdf.text(`En ${c.lugar || '________________'}, a ${fechaLarga(c.fecha) || '________________'}.`, W - M, y, { align: 'right' });
  y += 10;

  // ── Reunidos ──
  fuente(true, 10.5, BRAND); pdf.text('REUNIDOS', M, y); y += 2;
  pdf.setDrawColor(...LINEA); pdf.line(M, y, W - M, y); y += 6;

  const parte = (titulo: string, filas: [string, string][]) => {
    const alto = 8 + filas.length * 5.4 + 3;
    salto(alto);
    pdf.setFillColor(248, 250, 252); pdf.setDrawColor(...LINEA);
    pdf.roundedRect(M, y - 4, ANCHO, alto, 2, 2, 'FD');
    fuente(true, 8.5, BRAND); pdf.text(titulo, M + 4, y + 1); y += 6.5;
    filas.forEach(([k, v]) => {
      fuente(false, 8.5, GRIS); pdf.text(k, M + 4, y);
      fuente(true, 9.3, INK); pdf.text(pdf.splitTextToSize(v || '—', ANCHO - 60)[0], M + 52, y);
      y += 5.4;
    });
    y += 6;
  };
  parte('DE UNA PARTE, EL PRESTADOR DEL SERVICIO', [
    ['Razón Social / Nombre', c.prestador.nombre], ['NIF / CIF', c.prestador.nif],
    ['Domicilio Social', c.prestador.direccion], ['Teléfono de Contacto', c.prestador.telefono],
    ['Correo Electrónico', c.prestador.email],
  ]);
  parte('DE OTRA PARTE, EL CLIENTE / ESTABLECIMIENTO', [
    ['Razón Social / Nombre', c.cliente.nombre], ['NIF / CIF', c.cliente.nif],
    ['Dirección de la Cocina / Local', c.cliente.direccion], ['Persona de Contacto', c.cliente.contacto || ''],
    ['Teléfono de Contacto', c.cliente.telefono], ['Correo Electrónico', c.cliente.email],
  ]);
  rico([{ s: 'Ambas partes se reconocen mutuamente la capacidad legal suficiente para formalizar el presente contrato de prestación de servicios y, a tal efecto, acuerdan las siguientes:' }], M, ANCHO);
  y += 4; salto(12);
  fuente(true, 12, INK); pdf.text('CLÁUSULAS', W / 2, y, { align: 'center' }); y += 4;

  clausulasAntesDelPrecio(c).forEach(bloque);

  // ── Tabla de precio ──
  const { n, base, iva, total } = importes(c);
  salto(40); y += 2;
  const col = [M, M + 92, M + 128];
  pdf.setFillColor(...NAVY); pdf.rect(M, y - 4.5, ANCHO, 7.5, 'F');
  fuente(true, 8.5, [255, 255, 255]);
  pdf.text('Concepto', col[0] + 3, y); pdf.text('Periodicidad', col[1] + 3, y); pdf.text('Importe Unitario (sin IVA)', W - M - 3, y, { align: 'right' });
  y += 8;
  fuente(false, 9, INK);
  pdf.text('Servicio Mantenimiento y Limpieza Técnica Periódica', col[0] + 3, y);
  pdf.text(`${c.periodicidad} (${n}/año)`, col[1] + 3, y);
  pdf.text(eur(c.precioUnitario), W - M - 3, y, { align: 'right' });
  y += 3; pdf.setDrawColor(...LINEA); pdf.line(M, y, W - M, y); y += 5.5;
  ([['Total Base Imponible Anual', eur(base), false], ['IVA 21%', eur(iva), false], ['Importe Total Anual', eur(total), true]] as [string, string, boolean][]).forEach(([k, v, fuerte]) => {
    if (fuerte) { pdf.setFillColor(238, 237, 252); pdf.rect(M + 92, y - 4.5, ANCHO - 92, 7, 'F'); }
    fuente(fuerte, fuerte ? 10 : 9, fuerte ? BRAND : INK);
    pdf.text(k, col[1] + 3, y); pdf.text(v, W - M - 3, y, { align: 'right' });
    y += 6.5;
  });
  y += 3;

  // ── Modalidad de pago ──
  salto(30);
  fuente(true, 9.8, INK); pdf.text('Modalidad de Pago', M, y); y += 5;
  rico([{ s: 'El pago del importe contratado se fraccionará y satisfará según la opción seleccionada:' }], M, ANCHO);
  y += 1;
  PAGOS.forEach((p) => {
    salto(6);
    pdf.setDrawColor(...INK); pdf.setLineWidth(0.3); pdf.rect(M + 1, y - 3.2, 3.6, 3.6);
    if (c.pago === p.id) {
      pdf.setDrawColor(...BRAND); pdf.setLineWidth(0.7);
      pdf.line(M + 1.6, y - 1.4, M + 2.6, y - 0.2); pdf.line(M + 2.6, y - 0.2, M + 4.2, y - 2.8);
      pdf.setLineWidth(0.3);
    }
    const yy = y; rico([{ s: p.titulo + ':', b: true }, { s: p.texto }], M + 7, ANCHO - 7); if (y === yy) y += 4.6;
  });
  y += 2; salto(10);
  fuente(true, 9.3, INK); pdf.text('Datos Bancarios para el Pago (si procede):', M, y); y += 5;
  fuente(false, 9.5, INK); pdf.text(`IBAN  ${c.iban || 'ES__ ____ ____ ____ ____ ____'}`, M + 3, y); y += 6;

  clausulaDuracion.forEach(bloque);

  // ── Firmas ──
  salto(70); y += 6;
  fuente(true, 10.5, BRAND); pdf.text('CONFORMIDAD Y FIRMAS', M, y); y += 2;
  pdf.setDrawColor(...LINEA); pdf.line(M, y, W - M, y); y += 6;
  rico([{ s: CONFORMIDAD }], M, ANCHO); y += 5;
  const anchoF = (ANCHO - 10) / 2;
  const firma = (x: number, titulo: string, img: string | undefined, nombre: string, nif: string) => {
    let yy = y;
    fuente(true, 8.5, GRIS); pdf.text(titulo, x, yy); yy += 4;
    pdf.setDrawColor(...LINEA); pdf.setFillColor(252, 252, 253); pdf.roundedRect(x, yy, anchoF, 30, 2, 2, 'FD');
    if (img) {
      try {
        // Encaja la firma sin deformarla dentro del recuadro
        const pr = pdf.getImageProperties(img), bw = anchoF - 8, bh = 24;
        const k = Math.min(bw / pr.width, bh / pr.height), iw = pr.width * k, ih = pr.height * k;
        pdf.addImage(img, 'PNG', x + 4 + (bw - iw) / 2, yy + 4 + (bh - ih) / 2, iw, ih);
      } catch { /* firma ilegible: se queda el hueco */ }
    }
    fuente(false, 7.5, GRIS); pdf.text('Firma:', x + 3, yy + 4.5);
    yy += 35;
    fuente(true, 9.3, INK); pdf.text(pdf.splitTextToSize(nombre || '________________________', anchoF)[0], x, yy); yy += 5;
    fuente(false, 8.5, GRIS); pdf.text(`NIF/CIF ${nif || '____________________'}`, x, yy);
  };
  firma(M, 'Por el Prestador del Servicio', c.firmaPrestador, c.prestador.nombre, c.prestador.nif);
  firma(M + anchoF + 10, 'Por el Cliente / Establecimiento', c.firmaCliente, c.cliente.contacto || c.cliente.nombre, c.cliente.nif);

  // ── Pie en todas las páginas ──
  const total_p = pdf.getNumberOfPages();
  for (let i = 1; i <= total_p; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(...LINEA); pdf.line(M, H - PIE + 4, W - M, H - PIE + 4);
    fuente(false, 7.5, GRIS);
    pdf.text('Afondo · Contrato de mantenimiento de sistemas de extracción de humos', M, H - PIE + 9);
    pdf.text(`Página ${i} de ${total_p}`, W - M, H - PIE + 9, { align: 'right' });
  }
  return pdf.output('blob');
}

export const nombreArchivo = (c: Contrato) =>
  `Contrato_Afondo_${(c.cliente.nombre || 'cliente').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '')}_${c.fecha || 'sin-fecha'}.pdf`;
