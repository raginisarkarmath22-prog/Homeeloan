// pages/ApprovedProjects.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ApprovedProjectKolkata from "../../components/approved_Projects/Sbi/ApprovedProjectKolkata";

const bankSlugMap = {
  sbi: "State Bank of India",
  hdfc: "HDFC Bank",
  icici: "ICICI Bank",
  axis: "Axis Bank",
  pnb: "Punjab National Bank",
};

const ApprovedProjects = () => {
  const { bankSlug, cityName } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // If the URL is for SBI projects in Kolkata, render the specific component.
  if (bankSlug === "sbi" && cityName === "kolkata") {
    return <ApprovedProjectKolkata />;
  }

  const formattedCityName = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : "";

  useEffect(() => {
    const bankName = bankSlugMap[bankSlug?.toLowerCase()] || bankSlug;
    if (!bankName || !cityName) return;

    setLoading(true);
    axios
      .get(`/api/projects?bank=${bankName}&city=${cityName}`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]); // Ensure projects is an empty array on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bankSlug, cityName]); // bankName is derived, so no need to add it here

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-600">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-15 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Approved Projects in <span className="text-blue-600">{formattedCityName}</span>
        </h2>
        {projects.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">No Approved Projects Found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find any approved projects in <strong className="text-gray-600">{formattedCityName}</strong> at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src={p.image || 'https://via.placeholder.com/400x300.png?text=Project+Image'}
                  alt={p.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">by {p.builder}</p>
                  <p className="text-gray-600 mt-2">{p.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-gray-700">{p.bhk} BHK</span>
                    <span className="text-xl font-bold text-blue-600">{p.priceRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedProjects;
