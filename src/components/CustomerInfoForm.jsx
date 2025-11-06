import React from 'react';

export default function CustomerInfoForm({ data, onChange }) {
  return (
    <section className="bg-white/60 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Customer Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={data.customerName}
            onChange={(e) => onChange({ ...data, customerName: e.target.value })}
            placeholder="e.g., Acme Foods Ltd."
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Site Address</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={data.siteAddress}
            onChange={(e) => onChange({ ...data, siteAddress: e.target.value })}
            placeholder="Street, City, ZIP"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Contact Person</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={data.contactPerson}
            onChange={(e) => onChange({ ...data, contactPerson: e.target.value })}
            placeholder="Full name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              placeholder="contact@company.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Visit Date</label>
          <input
            type="date"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={data.visitDate}
            onChange={(e) => onChange({ ...data, visitDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Technician</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={data.technician}
            onChange={(e) => onChange({ ...data, technician: e.target.value })}
            placeholder="Your name"
          />
        </div>
      </div>
    </section>
  );
}
