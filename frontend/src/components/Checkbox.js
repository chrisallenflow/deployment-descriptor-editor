import React from "react";
import "./Checkbox.css";

function Checkbox({ className, ...props }) {
  return (
    <label className="checkbox">
      <input type="checkbox" {...props} />
      <span className="knob"></span>
      <span className="track"></span>
    </label>
  );
}

export default Checkbox;
