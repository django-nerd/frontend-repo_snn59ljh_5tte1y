import React from 'react';

const categories = [
  {
    key: 'refrigeration',
    title: 'Refrigeration Machines',
    items: [
      'Compressor condition',
      'Oil level and leaks',
      'Condenser coil cleaned',
      'Evaporator coil cleaned',
      'Refrigerant charge checked',
      'Vibration and noise inspection',
    ],
  },
  {
    key: 'coolingSystems',
    title: 'Cooling Systems',
    items: [
      'Suction/Discharge pressures',
      'Superheat/Subcooling recorded',
      'TXV/EEV operation',
      'Fans and belts',
      'Electrical connections tightened',
      'Control setpoints verified',
    ],
  },
  {
    key: 'rooms',
    title: 'Cooling & Freezer Rooms',
    items: [
      'Door seals & hinges',
      'Defrost operation',
      'Drain lines cleared',
      'Room temperature logged',
      'Alarm and safety checks',
      'Lighting and airflow',
    ],
  },
];

export default function EquipmentChecklist({ checks, onChange }) {
  const toggleItem = (categoryKey, item) => {
    const cat = checks[categoryKey] || {};
    const current = !!cat[item];
    const updated = { ...checks, [categoryKey]: { ...cat, [item]: !current } };
    onChange(updated);
  };

  return (
    <section className="bg-white/60 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Service Checklist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-medium text-slate-700 mb-3">{cat.title}</h3>
            <ul className="space-y-2">
              {cat.items.map((item) => {
                const checked = !!(checks[cat.key] && checks[cat.key][item]);
                return (
                  <li key={item} className="flex items-start gap-2">
                    <input
                      id={`${cat.key}-${item}`}
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-400 text-sky-600 focus:ring-sky-500"
                      checked={checked}
                      onChange={() => toggleItem(cat.key, item)}
                    />
                    <label htmlFor={`${cat.key}-${item}`} className="text-sm text-slate-700">
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
