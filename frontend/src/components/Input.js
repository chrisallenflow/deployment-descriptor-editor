import React from "react";
import "./Input.css";

function Input({ property, ...props }) {
  switch (property.type) {
    case "number":
      return (
        <input
          type="number"
          className="input"
          defaultValue={property.defaultValue}
          {...props}
        />
      );
    case "select":
      return (
        <select
          className="input"
          defaultValue={property.defaultValue}
          {...props}
        >
          {property.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <textarea
          rows="5"
          className="input"
          defaultValue={property.defaultValue}
          {...props}
        />
      );
    case "boolean":
      return (
        <label className="checkbox">
          <input
            type="checkbox"
            defaultChecked={property.defaultValue}
            {...props}
          />
          <span className="knob"></span>
          <span className="track"></span>
        </label>
      );
    default:
      return (
        <input
          type="text"
          className="input"
          defaultValue={property.defaultValue}
          {...props}
        />
      );
  }
}

export default Input;
