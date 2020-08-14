import React, { useContext } from "react";
import Input from "./Input";
import Tooltip from "./Tooltip";
import { ReactComponent as IconWarning } from "../icons/alert-triangle.svg";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Property.css";

function Property({ property, namespace, onChange }) {
  const id = namespace + "." + property.name;
  const { helpers } = useContext(SettingsContext);

  return (
    <div className={"property-group" + (property.hidden ? " is-hidden" : "")}>
      <label className="form-label" htmlFor={id}>
        <code>{property.name}</code>
      </label>
      <div>
        <Input
          property={property}
          id={id}
          name={id}
          onChange={(evt) => onChange({ ...property, target: evt.target })}
          disabled={property.disabled}
        />

        {property.disabled && (
          <Tooltip title={property.warning}>
            <IconWarning width="22" height="22" />
          </Tooltip>
        )}
      </div>
      {helpers && (
        <div className="form-helper">
          <p className="message">{property.description}</p>
        </div>
      )}
    </div>
  );
}

export default Property;
