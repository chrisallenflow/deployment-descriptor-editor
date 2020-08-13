import React, { useEffect, useContext } from "react";
import Select from "./Select";
import RadioButtonInput from "./RadioInputButton";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Dropdown.css";

function Dropdown({ isVisible, onClose }) {
  const { platform, layout, dispatch } = useContext(SettingsContext);

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape" && isVisible) {
        onClose();
      }
    };

    const handleClick = (evt) => {
      if (!evt.target.closest(".dropdown-wrapper")) {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="dropdown-wrapper">
      <h2 className="title">Settings</h2>

      <label htmlFor="platform" className="label">
        Choose your platform:
      </label>
      <Select
        id="platform"
        defaultValue={platform}
        onChange={(evt) =>
          dispatch({ type: "SWITCH_PLATFORM", payload: evt.target.value })
        }
      >
        <option value="sprint-boot">Spring Boot</option>
        <option value="tomcat">Tomcat</option>
        <option value="jboss">Jboss/Wildfly</option>
        <option value="websphere">IBM Websphere</option>
        <option value="weblogic">Oracle Weblogic</option>
      </Select>

      <label className="label">Layout:</label>
      <div className="radio-button-group">
        <RadioButtonInput
          title="Tabs"
          description="Show a tab menu to navigate categories"
          defaultChecked={layout === "tabs"}
          onChange={() => dispatch({ type: "TOGGLE_LAYOUT", payload: "tabs" })}
          name="layout"
        />
        <RadioButtonInput
          title="List"
          description="Show all categories and properties in a list"
          defaultChecked={layout === "list"}
          onChange={() => dispatch({ type: "TOGGLE_LAYOUT", payload: "list" })}
          name="layout"
        />
      </div>
    </div>
  );
}

export default Dropdown;
