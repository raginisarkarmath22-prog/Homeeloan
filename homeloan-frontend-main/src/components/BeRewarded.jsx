import React from "react";
import { motion } from "framer-motion";
import piggy from "../assets/1.mp4";
import useAnimatedCounter from "../hooks/beRewardedAnimateCounter";

const BeRewarded = ({ isExpanded }) => {
  const { ref: rewardRef, count } = useAnimatedCounter(0.3, 5000);

  return (
    <motion.div
      ref={rewardRef}
      className="relative rounded-2xl border border-green-900 overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 text-center w-full min-h-[400px]"
      layout
      transition={{ duration: 0.3 }}
    >
      <video
        src={piggy}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-center items-center h-full">
        <h4 className="text-2xl mb-2 font-bold md:-mt-70 -mt-50 text-black drop-shadow-lg uppercase tracking-wide">
          Be Rewarded
        </h4>
        <ul className="text-white  sm:font-semibold font-bold font-sans text-base">
          <span className="text-4xl font-[analog] rounded-2xl shadow-sm shadow-blue-50 bg-green-800 px-2 ">
            {count.toFixed(2)}%
          </span>
          <li className="md:text-xl mt-1 text-lg text-black font-mono ">
            Additional rate discount in year 30
            <br />
            No negotiation needed
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default BeRewarded;
