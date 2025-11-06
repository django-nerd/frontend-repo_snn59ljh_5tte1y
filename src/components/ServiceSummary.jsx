import React from 'react';

export default function ServiceSummary({ data, checks, parts, signatures, onField, onExport }) {
  const checklistItems = Object.entries(checks).flatMap(([catKey, items]) =>
    Object.entries(items || {}).map(([name, done]) => ({ catKey, name, done }))
  );

  const partsTotal = parts.reduce((sum, p) => sum + (Number(p.qty) || 0) * (Number(p.unitCost) || 0), 0);

  return (
    <section className="bg-white/60 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Service Summary</h2>
        <button
          type="button"
          onClick={onExport}
          className="rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
        >
          Export Report (JSON)
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Technician Signature (type your name)</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={signatures.techSignature}
            onChange={(e) => onField('signatures', { ...signatures, techSignature: e.target.value })}
            placeholder="Technician Name"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Customer Signature (type name)</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={signatures.customerSignature}
            onChange={(e) => onField('signatures', { ...signatures, customerSignature: e.target.value })}
            placeholder="Customer Name"
          />
        </div>
      </div>
    </section>
  );
}
