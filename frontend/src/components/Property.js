import React, { useContext } from "react";
import Tooltip from "./Tooltip";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
import { ReactComponent as IconWarning } from "../icons/alert-triangle.svg";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Property.css";

function getPropertyField(property, id, onChange) {
  switch (property.type) {
    case "select":
      return (
        <Select
          id={id}
          name={id}
          disabled={property.disabled}
          defaultValue={property.defaultValue}
          options={property.options}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <Textarea
          disabled={property.disabled}
          onChange={onChange}
          id={id}
          name={id}
          defaultValue={property.defaultValue}
        />
      );
    case "boolean":
      return (
        <Checkbox
          id={id}
          name={id}
          onChange={onChange}
          defaultChecked={property.defaultValue}
        />
      );
    default:
      return (
        <Input
          type={property.type}
          onChange={onChange}
          disabled={property.disabled}
          readOnly={property.readonly}
          id={id}
          name={id}
          defaultValue={property.defaultValue}
        />
      );
  }
}

function Property({ property, namespace, onChange }) {
  const id = namespace + "." + property.name;
  const { helpers } = useContext(SettingsContext);

  const handleChange = (evt) => {
    onChange({ ...property, target: evt.target });
  };

  return (
    <div className={"property-group" + (property.hidden ? " is-hidden" : "")}>
      <label className="form-label" htmlFor={id}>
        <code>{property.name}</code>
      </label>
      <div>
        {getPropertyField(property, id, handleChange)}

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
