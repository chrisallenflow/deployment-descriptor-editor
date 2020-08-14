import React from "react";
import "./Select.css";

function Select({ className, options, ...props }) {
  return (
    <select className={"select" + (className ? className : "")} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
