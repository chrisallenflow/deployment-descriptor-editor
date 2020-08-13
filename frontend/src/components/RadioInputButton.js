import React from "react";
import "./RadioInputButton.css";

function RadioInputButton({ title, description, ...props }) {
  return (
    <label className="radio-input">
      <input type="radio" {...props} />

      <div className="box">
        <strong className="title">{title}</strong>
        {description && <i className="description">{description}</i>}
      </div>
    </label>
  );
}

export default RadioInputButton;
