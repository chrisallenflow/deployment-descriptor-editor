import React from "react";
import Input from "./Input";
import { ReactComponent as IconWarning } from "../icons/alert-triangle.svg";
import "./Property.css";

function Property({ property, namespace, onChange }) {
  const id = namespace + "." + property.name;

  return (
    <div className={"property-group" + (property.hidden ? " is-hidden" : "")}>
      <label className="form-label" htmlFor={id}>
        <code>{property.name}</code>
      </label>
      <Input
        property={property}
        id={id}
        name={id}
        onChange={(evt) => onChange({ ...property, target: evt.target })}
        disabled={property.disabled}
      />
      <div className="form-helper">
        <p className="message">{property.description}</p>
        {property.disabled && (
          <p className="warning">
            <IconWarning width="22" height="22" />
            {property.warning}
          </p>
        )}
      </div>
    </div>
  );
}

export default Property;
