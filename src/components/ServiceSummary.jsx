import React, { useRef } from 'react';
import SignaturePad from './SignaturePad.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ServiceSummary({ data, checks, parts, signatures, onField, onExport }) {
  const printableRef = useRef(null);

  const checklistItems = Object.entries(checks).flatMap(([catKey, items]) =>
    Object.entries(items || {}).map(([name, done]) => ({ catKey, name, done }))
  );

  const partsTotal = parts.reduce((sum, p) => sum + (Number(p.qty) || 0) * (Number(p.unitCost) || 0), 0);

  const exportPDF = async () => {
    const node = printableRef.current;
    if (!node) return;

    const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    const filename = `service-report_${new Date().toISOString().slice(0,10)}.pdf`;
    pdf.save(filename);
  };

  return (
    <section className="bg-white/60 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Service Summary</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExport}
            className="rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={exportPDF}
            className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div ref={printableRef} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-slate-700 mb-2">Work Performed</h3>
            <textarea
              className="w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={data.workDone}
              onChange={(e) => onField('workDone', e.target.value)}
              placeholder="Describe diagnostics, repairs, adjustments, and tests..."
            />
          </div>
          <div>
            <h3 className="font-medium text-slate-700 mb-2">Recommendations / Notes</h3>
            <textarea
              className="w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={data.recommendations}
              onChange={(e) => onField('recommendations', e.target.value)}
              placeholder="Preventive actions, parts to order, follow-up visit..."
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-medium text-slate-700 mb-2">Checklist Summary</h4>
            {checklistItems.length === 0 ? (
              <p className="text-sm text-slate-500">No items selected yet.</p>
            ) : (
              <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1 max-h-48 overflow-auto">
                {checklistItems
                  .filter((i) => i.done)
                  .map((i, idx) => (
                    <li key={idx}>{i.name}</li>
                  ))}
              </ul>
            )}
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-medium text-slate-700 mb-2">Parts Summary</h4>
            {parts.length === 0 ? (
              <p className="text-sm text-slate-500">No parts added.</p>
            ) : (
              <div className="text-sm text-slate-700 space-y-1 max-h-48 overflow-auto">
                {parts.map((p, idx) => (
                  <div key={idx} className="flex justify-between gap-3">
                    <span className="truncate">{p.description} x{p.qty}</span>
                    <span>${(Number(p.qty) * Number(p.unitCost)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 text-right text-slate-700">
              <span className="font-medium">Total:</span> ${partsTotal.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={signatures.techSignature}
              onChange={(e) => onField('signatures', { ...signatures, techSignature: e.target.value })}
              placeholder="Technician Name"
            />
            <SignaturePad
              label="Technician Signature"
              value={signatures.techSignatureImage}
              onChange={(img) => onField('signatures', { ...signatures, techSignatureImage: img })}
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={signatures.customerSignature}
              onChange={(e) => onField('signatures', { ...signatures, customerSignature: e.target.value })}
              placeholder="Customer Name"
            />
            <SignaturePad
              label="Customer Signature"
              value={signatures.customerSignatureImage}
              onChange={(img) => onField('signatures', { ...signatures, customerSignatureImage: img })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
