import React, { useState } from "react";
import { MapPin, Home, Heart } from "lucide-react";
import ApplicationFormPopup from "./ApplicationFormPopup";
import Ads from "../../ads";

const ApprovedProjectKolkata = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const projects = [
    {
      id: 1,
      name: "Avidipta",
      loan_id: "sbi/kol/avi/oo2/2025",
      Approved: "Sbi Approved",
      location: "Mukundapur, Kolkata",
      bhk: "1, 4 BHK",
      price: "Rs. 20.52 Lacs - 95.01 Lacs",
      image: "/SbiKolkata/Avidipta.webp",
      possessionDate: "Jun-2016",
      configuration: "448 to 2,074 Sq.ft.",
      carpetArea: "291 to 1,348 Sq.ft.",
      towers: "NA",
      floors: "1 - 17",
      apartmentsPerFloor: "NA",
      liked: false,
    },
    {
      id: 2,
      name: "Kwality Waterside",
      Approved: "Rera Approved",
      loan_id: "sbi/kol/avi/oo2/2025",

      location: "Rajarhat, Kolkata",
      bhk: "1, 2 BHK",
      price: "Rs. 13.36 Lacs - 17.61 Lacs",
      image: "/SbiKolkata/kwality.jpg",
      possessionDate: "Oct-2024",
      configuration: "448 to 2,074 Sq.ft.",
      carpetArea: "294 to 388 Sq.ft.",
      towers: "1",
      floors: "4",
      apartmentsPerFloor: "2-3",
      liked: false,
    },
    {
      id: 3,
      name: "Magnolia Success",
      Approved: "Rera Approved",
      loan_id: "sbi/kol/avi/oo2/2025",

      location: "New Town, Kolkata",
      bhk: "2,3 BHK",
      price: "Rs. 33.06 Lacs - 49.31 Lacs ",
      image: "/SbiKolkata/kwality.jpg",
      possessionDate: "June-2023",
      configuration: "743 to 1,108 Sq.ft.",
      carpetArea: "482 to 720 Sq.ft.",
      towers: "4",
      floors: "4",
      apartmentsPerFloor: "4-6",
      liked: false,
    },
    {
      id: 4,
      name: "Meena Orchid",
      Approved: "Rera Approved",
      loan_id: "sbi/kol/avi/oo2/2025",

      location: "Saltlake-V, Kolkata",
      bhk: "2,3 BHK",
      image: "/SbiKolkata/Avidipta.webp",

      price: "Rs. 48.75 Lacs - 77.94 Lacs",
      possessionDate: "Apr-2023",
      configuration: "750 to 1,199 Sq.ft.",
      carpetArea: "487 to 779 Sq.ft.",
      towers: "6",
      floors: "4",
      apartmentsPerFloor: "5",
      liked: false,
    },
    {
      id: 5,
      name: "Shriram Grand City",
      Approved: "Rera Approved",
      image: "/SbiKolkata/Avidipta.webp",

      loan_id: "sbi/kol/avi/oo2/2025",

      location: "Uttarpara, Kolkata",
      bhk: "1,3 BHK",
      price: "Rs. 48.75 Lacs - 77.94 Lacs",
      possessionDate: "Dec-2026",
      configuration: "469 to 1,119 Sq.ft.",
      carpetArea: "365 to 872 Sq.ft.",
      towers: "24",
      floors: "1-14",
      apartmentsPerFloor: "4-6",
      liked: false,
    },
    {
      id: 6,
      name: "Joyville Howrah (Codename Home Next)",
      Approved: "Rera Approved",
      loan_id: "sbi/kol/avi/oo2/2025",

      location: "Howrah, Kolkata",
      bhk: "1,3 BHK",
      image: "/SbiKolkata/Avidipta.webp",

      price: "26.83 Lacs - 58.76 Lacs",
      possessionDate: "Sep-2028",
      configuration: "611 to 1,339 Sq.ft.",
      carpetArea: "416 to 911 Sq.ft.",
      towers: "9",
      floors: "20",
      apartmentsPerFloor: "6-8",
      liked: false,
    },

    {
      id: 7,
      name: "Solaris Joka",
      loan_id: "sbi/kol/avi/oo2/2025",

      Approved: "Rera Approved",
      location: "Pailan, Kolkata",
      bhk: "1,2 BHK",
      image: "/SbiKolkata/Avidipta.webp",

      price: "Rs. 12.76 Lacs - 23.93 Lacs",
      possessionDate: "Apr-2023",
      configuration: "400 to 750 Sq.ft.",
      carpetArea: "260 to 487 Sq.ft.",
      towers: "1",
      floors: "1-12",
      apartmentsPerFloor: "5",
      liked: false,
    },

    {
      id: 8,
      name: "Unikue Bee Gee Apartment",
      Approved: "Rera Approved",
      location: "Howrah, Kolkata",
      image: "/SbiKolkata/Avidipta.webp",
      loan_id: "sbi/kol/avi/oo2/2025",

      bhk: "1,3 BHK",
      price: "Rs. 9.75 Lacs - 26.13 Lacs",
      possessionDate: "Feb-2026",
      configuration: "375 to 1,005 Sq.ft.",
      carpetArea: "225 to 603 Sq.ft.",
      towers: "3",
      floors: "5",
      apartmentsPerFloor: "4",
      liked: false,
    },

    {
      id: 9,
      name: "Urban Retreat",
      Approved: "Rera Approved",
      location: "Kasba, Kolkata",
      bhk: "2,3 BHK",
      image: "/SbiKolkata/Avidipta.webp",

      price: "Rs. 53.63 Lacs - 77.16 Lacs",
      possessionDate: "Apr-2026",
      configuration: "825 to 1,187 Sq.ft.",
      carpetArea: "528 to 759 Sq.ft.",
      towers: "3",
      floors: "1-4",
      apartmentsPerFloor: "5-6",
      liked: false,
    },

    {
      id: 10,
      name: "Tilottama Natural City",
      Approved: "Rera Approved",
      loan_id: "sbi/kol/avi/oo2/2025",

      location: "Madhyamgram, Kolkata",
      bhk: "1,3 BHK",
      image: "/SbiKolkata/Avidipta.webp",

      price: "Rs. 17.5 Lacs - 46.59 Lacs",
      possessionDate: "Dec-2025",
      configuration: "500 to 1,331 Sq.ft.",
      carpetArea: "300 to 798 Sq.ft.",
      towers: "7",
      floors: "4",
      apartmentsPerFloor: "4",
      liked: false,
    },


  ];

  const [projectList, setProjectList] = useState(projects);

  const handleLike = (id) => {
    setProjectList(projectList.map(p =>
      p.id === id ? { ...p, liked: !p.liked } : p
    ));
  };

  const handleApplyNow = (project) => {
    setSelectedProject(project);
  };

  const handleCloseForm = () => {
    setSelectedProject(null);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted for:", formData);
    // Here you can add logic to send data to your backend
    handleCloseForm();
  };

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 font-sans pt-20">
  <div className="rounded-2xl p-2 text-center lg:w-[60%] lg:ml-20 shadow-sm">
<h2 className="text-lg md:text-4xl font-serif font-extrabold text-gray-800 tracking-wide">
        SBI Approved Projects
      </h2>
      <p className="text-4xl font-serif font-extrabold mb-12 text-blue-800 underline tracking-wide">
        Kolkata
      </p>
  </div>
      
      <div className="flex flex-row justify-between">
        
        <div className="p-6  lg:w-[70%]">
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl h-auto mx-auto">
            {projectList.map((project) => (
              <div
                key={project.id}
                className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative cursor-pointer"
                onClick={() => toggleCardExpansion(project.id)}
              >
                {/* Image */}
                <div className="relative h-56 w-full">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge & Heart Button */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  {project.Approved} ✔
                </div>


                {/* Content Card */}
                <div className="p-6 bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="md:text-2xl text-xl font-bold text-gray-900 ">{project.name}</h3>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleLike(project.id); }}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${project.liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      <Heart
                        size={20}
                        className={`${project.liked ? "fill-white" : ""}`}
                      />
                    </button>
                  </div>
                  {project.loan_id && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Loan id :</strong> {project.loan_id}
                    </p>
                  )}
                  {/* Location & BHK */}
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <MapPin className="text-green-400 mr-2" />
                      <span className="text-gray-700 text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="text-green-400 mr-2" />
                      <span className="text-gray-700 text-sm">{project.bhk}</span>
                    </div>
                  </div>

                  {/* Price & Apply Button */}
                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-center mb-4">
                    <div className="text-xl font-extrabold text-blue-600 mb-2 md:mb-0">
                      {project.price}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApplyNow(project); }}
                      className="bg-green-700 text-white font-semibold rounded-lg px-6 py-2 shadow-lg hover:bg-green-900 hover:shadow-xl transition duration-300 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Additional Details - Expandable */}
                  {expandedCards[project.id] && (
                    <div className="mt-4 border-t border-gray-300 pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 animate-fade-in">
                      <div>
                        <strong>Possession Date:</strong> {project.possessionDate}
                      </div>
                      <div>
                        <strong>Configuration:</strong> {project.configuration}
                      </div>
                      <div>
                        <strong>Carpet Area:</strong> {project.carpetArea}
                      </div>
                      <div>
                        <strong>Towers:</strong> {project.towers}
                      </div>
                      <div>
                        <strong>Floors:</strong> {project.floors}
                      </div>
                      <div>
                        <strong>Apartments per Floor:</strong> {project.apartmentsPerFloor}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ads section  */}
        <div className="w-[30%] p-5 hidden lg:block">
          <Ads />
        </div>
      </div>

      {selectedProject && (
        <ApplicationFormPopup
          project={selectedProject}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          defaultCity="Kolkata"
        />
      )}
    </div>
  );
};

export default ApprovedProjectKolkata;