import React, { useState, useEffect } from "react";

const Eligibility = () => {
  const [eligibilityData, setEligibilityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/eligibility-applications");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEligibilityData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold">
        ⚠️ Error loading data: {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Eligibility Submissions
      </h1>

      {eligibilityData.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Borrow Amount</th>
                <th className="px-4 py-3">Property Worth</th>
                <th className="px-4 py-3">Loan Tenure</th>
                <th className="px-4 py-3">Eligible?</th>
                <th className="px-4 py-3">EMI</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {eligibilityData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 font-medium">{item.id}</td>
                  <td className="px-4 py-3">
                    {item.first_name} {item.last_name}
                  </td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.phone_number}</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">
                    ₹{item.borrow_amount?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    ₹{item.property_worth?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{item.loan_tenure} yrs</td>
                  <td className="px-4 py-3">
                    {item.is_eligible ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        ✅ Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        ❌ No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-indigo-700">
                    ₹{item.calculated_emi?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.eligibility_message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Eligibility;
