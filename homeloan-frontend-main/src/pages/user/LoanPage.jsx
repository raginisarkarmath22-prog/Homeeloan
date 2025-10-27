// pages/LoanPage.jsx
import { useNavigate } from "react-router-dom";

const LoanPage = ({ bankSlug }) => {
  const navigate = useNavigate();

  const cities = [
    { name: "Kolkata", img: "/approvedProjects/Kolkata.png" },
    { name: "Mumbai", img: "/approvedProjects/Mumbai.png" },
    { name: "Hyderabad", img: "/approvedProjects/Hyderabad.png" },
    { name: "Chennai", img: "/approvedProjects/Chennai.png" },
    { name: "Pune", img: "/approvedProjects/Pune.png" },
    { name: "Bangalore", img: "/approvedProjects/Bangalore.png" },
    { name: "Delhi", img: "/approvedProjects/Delhi.png" },
  ];

  return (
    <div className="relative  rounded-[90px]">
      <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-white 
             bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 
             py-10 mb-10 text-center drop-shadow-md 
             z-10 relative rounded-b-[80px]">
        Approved Projects
      </h1>

      {/* Locations background */}
      <div className="absolute bottom-0 left-0 w-full sm:h-[40%] h-[20%] bg-cover bg-bottom rounded-tl-[70px] rounded-tr-[70px]" style={{ backgroundImage: "url('/approvedProjects/Locations.png')" }}></div>
      <div className="flex flex-wrap justify-center sm:gap-8  mt-8">
        {cities.map((city, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/loan/${bankSlug}/projects/${city.name.toLowerCase()}`)
            }
            className="group flex flex-col items-center cursor-pointer transition-transform duration-300 mb-18 hover:scale-110"
          >
            <div className="relative w-13 h-13 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/50 shadow-lg bg-white group-hover:shadow-blue-300 group-hover:border-blue-100 transition-all duration-300">
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>


            <p className="
  mt-4 px-3 py-1 text-[13px] sm:text-m font-bold border border-blue-700/30
  text-black 
  bg-white/40 backdrop-blur-md rounded-md shadow-md 
  transition-all duration-300 
  group-hover:shadow-[0_0_15px_#2563EB]
  group-hover:bg-white/50
">
              {city.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanPage;
