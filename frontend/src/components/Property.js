import React from "react";
import Input from "./Input";
import "./Property.css";

function Property({ property, namespace }) {
  return (
    <div className={"form-group" + (property.hidden ? " is-hidden" : "")}>
      <label className="form-label">
        <code>{property.name}</code>
      </label>
      <Input property={property} name={namespace + "." + property.name} />
      <p className="form-helper">{property.description}</p>
    </div>
  );
}

export default Property;
