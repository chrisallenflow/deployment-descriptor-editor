import React, { useEffect, useContext } from "react";
import Select from "./Select";
import RadioButtonInput from "./RadioInputButton";
import Checkbox from "./Checkbox";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Dropdown.css";

function Dropdown({ isVisible, onClose }) {
  const { platform, layout, helpers, dispatch } = useContext(SettingsContext);

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
        options={[
          "Spring Boot",
          "Tomcat",
          "Jboss/Wildfly",
          "IBM Websphere",
          "Oracle Weblogic",
        ]}
        onChange={(evt) =>
          dispatch({ type: "SWITCH_PLATFORM", payload: evt.target.value })
        }
      />

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

      <label htmlFor="helpers" className="label">
        Show property descriptions:
      </label>
      <Checkbox
        id="helpers"
        defaultChecked={helpers}
        onChange={(evt) =>
          dispatch({ type: "TOGGLE_HELPERS", payload: evt.target.checked })
        }
      />
    </div>
  );
}

export default Dropdown;
