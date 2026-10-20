import React, { useEffect, useRef } from 'react';

// Firma con el dedo o el ratón. Devuelve PNG (dataURL) o undefined si se borra.
const FirmaPad: React.FC<{ valor?: string; onChange: (v?: string) => void; etiqueta: string }> = ({ valor, onChange, etiqueta }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const pintando = useRef(false);
  const hay = useRef(!!valor);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    const ctx = cv.getContext('2d')!; ctx.scale(dpr, dpr);
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0b1324';
    if (valor) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height); img.src = valor; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const down = (e: React.PointerEvent) => {
    pintando.current = true; ref.current!.setPointerCapture(e.pointerId);
    const ctx = ref.current!.getContext('2d')!; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y);
  };
  const move = (e: React.PointerEvent) => {
    if (!pintando.current) return;
    const ctx = ref.current!.getContext('2d')!; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); hay.current = true;
  };
  const up = () => { if (!pintando.current) return; pintando.current = false; if (hay.current) onChange(ref.current!.toDataURL('image/png')); };
  const borrar = () => {
    const cv = ref.current!; cv.getContext('2d')!.clearRect(0, 0, cv.width, cv.height); hay.current = false; onChange(undefined);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-2">{etiqueta}</span>
        <button type="button" onClick={borrar} className="text-[12.5px] font-medium text-muted hover:text-ink">Borrar</button>
      </div>
      <canvas
        ref={ref}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        className="h-36 w-full touch-none rounded-lg border border-dashed border-line bg-mist/60"
      />
    </div>
  );
};

export default FirmaPad;
