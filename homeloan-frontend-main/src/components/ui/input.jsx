import React from "react";
import clsx from "clsx";

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
};
