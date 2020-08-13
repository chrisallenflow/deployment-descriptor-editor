import React from "react";
import Input from "./Input";
import "./Property.css";

function Property({ property, namespace }) {
  const id = namespace + "." + property.name;

  return (
    <div className={"property-group" + (property.hidden ? " is-hidden" : "")}>
      <label className="form-label" htmlFor={id}>
        <code>{property.name}</code>
      </label>
      <Input property={property} id={id} name={id} />
      <p className="form-helper">{property.description}</p>
    </div>
  );
}

export default Property;
