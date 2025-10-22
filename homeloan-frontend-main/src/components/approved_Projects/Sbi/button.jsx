import React from "react";
import clsx from "clsx";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};