import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const Index = ({ rate = 7.35 }) => {
    const navigate = useNavigate();
    const [animatedRate, setAnimatedRate] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

  const slides = [
    "/home.png",
    "/home1.png",
    // "/home3.png",
    "/robo_with_bubble.png",
    "/card.png",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate rate counter
          let start = 0;
          const end = rate;
          const duration = 2000; // 2 seconds
          const increment = end / (duration / 16); // 60fps
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setAnimatedRate(end);
              clearInterval(timer);
            } else {
              setAnimatedRate(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rate]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center overflow-hidden font-sans pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-24">
      <div className="absolute inset-0 z-0 perspective-1500">
        <div className="absolute animate-bounce-slow top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 opacity-30 rounded-full shadow-xl transform-gpu hover:scale-105 hover:rotate-2"></div>
        <div className="absolute animate-pulse-slow bottom-8 right-8 sm:bottom-12 sm:right-12 md:bottom-20 md:right-24 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-300 opacity-35 rounded-full shadow-2xl transform-gpu hover:scale-110"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-green-200 opacity-25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-200 opacity-25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-teal-100 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className={`z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-2000 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col lg:flex-row bg-white backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform-style-preserve-3d rotate-y-3d hover:rotate-y-10 hover:scale-105 transition-all duration-1000 ease-in-out hover:shadow-3xl">
          {/* Left Content - Text & Rate */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 text-center lg:text-left transform-gpu translate-z-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-serif text-gray-800 mb-2 sm:mb-4 drop-shadow-lg uppercase tracking-widest animate-slide-in-left">
              Unlock Your{" "}
              <span className="text-green-500 animate-glow">Homeeloan</span>{" "}
              Journey
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in font-semibold text-shadow-sm">
              Experience smarter home loan choices with modern digital solutions.
            </p>
            <div className="inline-block text-left mb-4 sm:mb-6 w-full max-w-md mx-auto lg:mx-0">
              <p className="text-gray-800 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                Interest Rates from
              </p>
              <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-2">
                <div className="relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-green-600 bg-gray-200 p-1 px-2 sm:px-3 rounded-2xl shadow-lg rotate-y-3 hover:rotate-y-10 font-[analog] transition-transform duration-700 transform hover:scale-105 hover:shadow-xl">
                  {animatedRate.toFixed(2)}
                  <span className="absolute top-1/2 right-[-80px] sm:right-[-100px] md:right-[-120px] lg:right-[-142px] xl:right-[-195px] -translate-y-1/2 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[400px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 300 300"
                      className="w-full h-full fill-current text-blue-700"
                    >
                      <g
                        transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                        fill="#517cd1"
                        stroke="none"
                      >
                        <path
                          d="M1645 1778 c-10 -23 -51 -90 -90 -148 -93 -136 -115 -180 -115 -230
                          0 -56 24 -100 54 -100 37 0 108 28 146 59 19 15 45 33 58 40 26 14 30 36 5 28
                          -10 -3 -56 -16 -103 -30 -47 -13 -95 -29 -108 -36 -12 -6 -22 -9 -22 -6 0 14
                          49 98 109 189 144 215 149 227 113 259 -10 10 -21 17 -23 17 -3 0 -14 -19 -24
                          -42z m-115 -213 c-6 -8 -27 -42 -46 -77 -37 -69 -47 -73 -13 -5 25 48 58 97
                          66 97 3 0 0 -7 -7 -15z"
                        />
                        <path
                          d="M1408 1780 c-26 -27 -30 -36 -25 -68 15 -91 130 -113 172 -32 19 37
                          19 64 -1 28 -24 -46 -84 -66 -84 -29 0 21 48 61 74 61 25 0 19 26 -10 49 -40
                          31 -89 28 -126 -9z m96 -8 c3 -5 -10 -14 -29 -20 -18 -7 -36 -19 -39 -27 -6
                          -17 -26 -20 -26 -5 0 33 79 76 94 52z"
                        />
                        <path
                          d="M1620 1569 c-24 -46 -25 -87 -4 -117 33 -47 103 -10 129 68 16 48 16
                          52 0 70 -12 14 -30 19 -62 18 -41 0 -45 -3 -63 -39z m100 0 c0 -38 -69 -124
                          -86 -107 -3 3 0 26 6 50 9 34 18 47 38 55 36 15 42 15 42 2z"
                        />
                      </g>
                    </svg>{" "}
                  </span>
                </div>

                <p className="ml-4 sm:ml-6 md:ml-10 lg:ml-14 text-blue-700 text-2xl sm:text-2xl md:text-3xl font-sans font-semibold">
                  PA
                </p>
              </div>
              <p className="text-blue-400 text-xs mt-1 sm:mt-2 font-medium">
                Fixed & Variable options available
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center md:justify-start">
               <button
        onClick={() => navigate("/eligibility-form")}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-b from-green-800 to-green-900 text-white rounded-full hover:bg-gradient-to-b hover:from-blue-800 hover:to-blue-950 transition shadow-lg hover:shadow-xl hover:scale-105 transform text-sm sm:text-base"
      >
        Check Eligibility
      </button>
            </div>
          </div>

          {/* Right Image with 3D Perspective & Hover Rotation */}
          <div className="flex-1 p-2 sm:p-4 flex justify-center items-center relative transform-gpu perspective-1500 hover:rotate-y-10 transition-transform duration-1000 ease-in-out">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-80 md:h-96 rounded-3xl shadow-3xl hover:scale-105 hover:rotate-y-3d transition-transform duration-700 ease-in-out overflow-hidden">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
