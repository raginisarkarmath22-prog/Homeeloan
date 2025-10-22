import React, { useEffect, useRef, useState } from "react";
import LoanOptionsTabs from "./LoanOptionsTabs";

const HeadingWithStrike = () => {
  const headingRef = useRef(null);
  const [strikePercent, setStrikePercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heading = headingRef.current;
      if (!heading) return;

      const rect = heading.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Top (start) = bottom of screen
      // End = 60% from top of viewport
      const start = windowHeight; // when heading enters from bottom
      const end = windowHeight * 0.4; // 60% scroll = 40% viewport position

      const scrollProgress = (start - rect.top) / (start - end);

      // Clamp between 0 and 1
      const progress = Math.min(Math.max(scrollProgress, 0), 1);

      setStrikePercent(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial fire

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-center my-10">
      <h1
        ref={headingRef}
        className="relative font-semibold md:text-5xl text-xl font-serif inline-block"
      >
        <span className="relative z-10  ">Say Goodbye to Hassles,</span>
        <span
  className="absolute left-0 top-1/2 h-[2px] bg-red-500 z-20"
  style={{
    width: `${strikePercent}%`,
    transition: "width 0.1s ease-out",
  }}
/>
      </h1>

      <h1 className="font-semibold md:text-3xl text-2xl font-serif mt-2">
        Hello to Smart Loans
      </h1>
          <div>
        <LoanOptionsTabs/>
      </div>
    </div>
  );
};

export default HeadingWithStrike;
