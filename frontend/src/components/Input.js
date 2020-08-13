import React from "react";
import Select from "./Select";
import Checkbox from "./Checkbox";
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
        <Select defaultValue={property.defaultValue} {...props}>
          {property.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
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
      return <Checkbox defaultChecked={property.defaultValue} {...props} />;
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
