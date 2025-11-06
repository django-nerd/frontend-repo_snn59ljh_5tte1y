import React, { useEffect, useRef } from 'react';

export default function SignaturePad({ label = 'Signature', value, onChange, height = 160 }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const scaleRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const h = height;
    canvas.width = width * dpr;
    canvas.height = h * dpr;
    scaleRef.current = dpr;
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#0f172a';
    ctxRef.current = ctx;

    // Load existing signature image if provided
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, h);
        ctx.drawImage(img, 0, 0, width, h);
      };
      img.src = value;
    } else {
      // draw placeholder line
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, h);
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(8, h - 24);
      ctx.lineTo(width - 8, h - 24);
      ctx.stroke();
      ctx.strokeStyle = '#0f172a';
    }
  }, [height]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left), y: (clientY - rect.top) };
  };

  const start = (e) => {
    e.preventDefault();
    drawingRef.current = true;
    const { x, y } = getPos(e);
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = ctxRef.current;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const data = canvasRef.current.toDataURL('image/png');
    onChange && onChange(data);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const width = canvas.clientWidth;
    const h = height;
    ctx.clearRect(0, 0, width, h);
    // redraw baseline
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, h);
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(8, h - 24);
    ctx.lineTo(width - 8, h - 24);
    ctx.stroke();
    ctx.strokeStyle = '#0f172a';
    onChange && onChange('');
  };

  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">{label}</label>
      <div className="rounded-md border border-slate-300 bg-white select-none">
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ height: height + 'px' }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
        <div className="flex justify-end p-2">
          <button type="button" onClick={clear} className="text-xs px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700">Clear</button>
        </div>
      </div>
    </div>
  );
}
