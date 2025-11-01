import React from "react";
import clsx from "clsx";

export const Label = ({ className, ...props }) => {
  return (
    <label
      className={clsx(
        "block text-sm font-medium text-gray-700 mb-1",
        className
      )}
      {...props}
    />
  );
};
