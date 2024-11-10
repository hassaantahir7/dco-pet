import React, { useState } from "react";

const SquareCheckbox = ({ checked, onChange }) => {
  console.log(checked);
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide the default checkbox
      />
      <span
        className={`w-6 h-6 border-2 border-gray-300 flex items-center justify-center mr-2 rounded-sm ${
          checked ? "bg-green-500" : "bg-white"
        }`}
      >
        {checked && <span className="w-4 h-4 bg-white"></span>}{" "}
        {/* Inner square when checked */}
      </span>
      Save the information for the future
    </label>
  );
};

export default SquareCheckbox;
