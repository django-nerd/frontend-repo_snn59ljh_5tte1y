import React, { useState, useEffect } from 'react';
import CustomerInfoForm from './components/CustomerInfoForm.jsx';
import EquipmentChecklist from './components/EquipmentChecklist.jsx';
import PartsUsedForm from './components/PartsUsedForm.jsx';
import ServiceSummary from './components/ServiceSummary.jsx';

function App() {
  // Core state for the service protocol
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    siteAddress: '',
    contactPerson: '',
    phone: '',
    email: '',
    visitDate: new Date().toISOString().slice(0, 10),
    technician: '',
  });

  const [checks, setChecks] = useState({});
  const [parts, setParts] = useState([]);
  const [summary, setSummary] = useState({
    workDone: '',
    recommendations: '',
    signatures: { techSignature: '', customerSignature: '', techSignatureImage: '', customerSignatureImage: '' },
  });

  // Persist to localStorage so techs don't lose progress accidentally
  useEffect(() => {
    const saved = localStorage.getItem('serviceProtocol');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.customerInfo) setCustomerInfo(parsed.customerInfo);
        if (parsed.checks) setChecks(parsed.checks);
        if (parsed.parts) setParts(parsed.parts);
        if (parsed.summary) setSummary(parsed.summary);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { customerInfo, checks, parts, summary };
    localStorage.setItem('serviceProtocol', JSON.stringify(payload));
  }, [customerInfo, checks, parts, summary]);

  const handleSummaryField = (field, value) => {
    if (field === 'signatures') {
      setSummary((s) => ({ ...s, signatures: value }));
    } else {
      setSummary((s) => ({ ...s, [field]: value }));
    }
  };

  const handleExport = () => {
    const report = {
      ...customerInfo,
      checks,
      parts,
      workDone: summary.workDone,
      recommendations: summary.recommendations,
      signatures: summary.signatures,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeCustomer = customerInfo.customerName || 'customer';
    const safeDate = customerInfo.visitDate || new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `service-report_${safeCustomer.replace(/\s+/g, '-')}_${safeDate}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (!confirm('Clear the current report? This cannot be undone.')) return;
    setCustomerInfo({
      customerName: '',
      siteAddress: '',
      contactPerson: '',
      phone: '',
      email: '',
      visitDate: new Date().toISOString().slice(0, 10),
      technician: '',
    });
    setChecks({});
    setParts([]);
    setSummary({
      workDone: '',
      recommendations: '',
      signatures: { techSignature: '', customerSignature: '', techSignatureImage: '', customerSignatureImage: '' },
    });
    localStorage.removeItem('serviceProtocol');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Service Protocol Report</h1>
            <p className="text-sm text-slate-600">Refrigeration Machines · Cooling Systems · Cooling & Freezer Rooms</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              New Report
            </button>
            <button
              onClick={handleExport}
              className="rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              Export JSON
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <CustomerInfoForm data={customerInfo} onChange={setCustomerInfo} />
        <EquipmentChecklist checks={checks} onChange={setChecks} />
        <PartsUsedForm parts={parts} onChange={setParts} />
        <ServiceSummary
          data={{ workDone: summary.workDone, recommendations: summary.recommendations }}
          checks={checks}
          parts={parts}
          signatures={summary.signatures}
          onField={handleSummaryField}
          onExport={handleExport}
        />

        <footer className="pt-4 text-center text-xs text-slate-500">
          <p>By submitting, you confirm the above services were performed to the best of your knowledge.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
