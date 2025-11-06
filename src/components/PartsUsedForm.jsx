import React from 'react';

export default function PartsUsedForm({ parts, onChange }) {
  const addPart = () => {
    const newParts = [...parts, { description: '', qty: 1, unitCost: 0 }];
    onChange(newParts);
  };
  const updatePart = (index, field, value) => {
    const newParts = parts.map((p, i) => (i === index ? { ...p, [field]: value } : p));
    onChange(newParts);
  };
  const removePart = (index) => {
    const newParts = parts.filter((_, i) => i !== index);
    onChange(newParts);
  };

  const total = parts.reduce((sum, p) => sum + (Number(p.qty) || 0) * (Number(p.unitCost) || 0), 0);

  return (
    <section className="bg-white/60 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Parts & Materials Used</h2>
        <button
          type="button"
          onClick={addPart}
          className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-white hover:bg-sky-700"
        >
          Add Part
        </button>
      </div>

      <div className="space-y-3">
        {parts.map((p, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-3 items-center">
            <input
              type="text"
              placeholder="Description"
              className="col-span-6 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={p.description}
              onChange={(e) => updatePart(idx, 'description', e.target.value)}
            />
            <input
              type="number"
              min="0"
              className="col-span-2 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={p.qty}
              onChange={(e) => updatePart(idx, 'qty', e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              className="col-span-3 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={p.unitCost}
              onChange={(e) => updatePart(idx, 'unitCost', e.target.value)}
            />
            <button
              type="button"
              onClick={() => removePart(idx)}
              className="col-span-1 text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right text-slate-700">
        <span className="font-medium">Total:</span> ${total.toFixed(2)}
      </div>
    </section>
  );
}
