// pages/LoanPage.jsx
import { useNavigate } from "react-router-dom";

const LoanPage = ({ bankSlug }) => {
  const navigate = useNavigate();

  const cities = [
    { name: "Kolkata", img: "/approvedProjects/kolkata.jpg" },
    { name: "Mumbai", img: "/approvedProjects/mumbai.jpg" },
    { name: "Hyderabad", img: "/approvedProjects/hyderabad.jpg" },
    { name: "Chennai", img: "/approvedProjects/chennai.jpg" },
    { name: "Pune", img: "/approvedProjects/pune.jpg" },
    { name: "Bangalore", img: "/approvedProjects/bangalore.jpg" },
    { name: "Delhi", img: "/approvedProjects/delhi.jpg" },
  ];

  return (
    <div className="relative mt-16  rounded-[90px]">
      <h1 className="sm:text-lg text:4xl font-extrabold font-serif text-white bg-blue-950 h-30 mb-30 text-center drop-shadow-md pt-15 z-10 relative rounded-b-full">
        Approved Projects
      </h1>

      {/* Blue half background */}
      <div className="absolute bottom-0 left-0 w-full sm:h-[40%] h-[20%] bg-blue-950 rounded-b-[50px] rounded-r-[50px]"></div>      
      <div className="flex flex-wrap justify-center sm:gap-8  mt-8">
        {cities.map((city, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/loan/${bankSlug}/projects/${city.name.toLowerCase()}`)
            }
            className="group flex flex-col items-center cursor-pointer transition-transform duration-300 mb-18 hover:scale-110"
          >
<div className="relative w-13 h-13 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white group-hover:shadow-blue-400 group-hover:border-blue-300 transition-all duration-300">
  <img
    src={city.img}
    alt={city.name}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  />
</div>


            <p className="mt-4 p-0.5 text-[10px] text-green-500 sm:text-lg font-semibold  group-hover:text-yellow-300 transition-colors duration-300 relative">
              {city.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </p>          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanPage;
