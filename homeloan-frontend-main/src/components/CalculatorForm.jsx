import React from 'react';

export default function CalculatorForm({ formData, setFormData }) {
  return (
    <div className="space-y-4 max-w-md">
      <span className="text-xl text-zinc-300">Loan Amount (₹)</span>
      <input
        type="number"
        placeholder="Loan Amount (₹)"
        value={formData.principal}
        onChange={(e) =>
          setFormData({ ...formData, principal: e.target.value })
        }
        className="border-b shadow p-2 w-full"
      />

      <span className="text-xl text-zinc-300">Interest Rate (%)</span>
      <input
        type="number"
        step="0.1"
        placeholder="Interest Rate (%)"
        value={formData.rate}
        onChange={(e) =>
          setFormData({ ...formData, rate: e.target.value })
        }
        className="border-b shadow p-2 w-full"
      />

      <span className="text-xl text-zinc-300">Loan Tenure (Years)</span>
      <input
        type="number"
        placeholder="Loan Tenure (Years)"
        value={formData.tenure}
        onChange={(e) =>
          setFormData({ ...formData, tenure: e.target.value })
        }
        className="border-b shadow p-2 w-full"
      />
    </div>
  );
}
