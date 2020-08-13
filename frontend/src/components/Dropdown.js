import React, { useEffect, useRef, useContext } from "react";
import Select from "./Select";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Dropdown.css";

function Dropdown({ isVisible, onClose }) {
  const ref = useRef();
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

      if (ref && ref.current) {
        ref.current.querySelector("select").focus();
      }
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
    <div className="dropdown-wrapper" ref={ref}>
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

      <label htmlFor="layout" className="label">
        Layout:
      </label>
      <Select
        id="layout"
        defaultValue={layout}
        onChange={(evt) =>
          dispatch({ type: "TOGGLE_LAYOUT", payload: evt.target.value })
        }
      >
        <option value="tabs">Tabs</option>
        <option value="list">List</option>
      </Select>

      {/* <label htmlFor="tooltips" className="label">
        Display property help as:
      </label>
      <Select id="tooltips" defaultValue="block">
        <option value="overlay">Tooltip overlays</option>
        <option value="block">Below the property</option>
        <option value="none">Don't display them</option>
      </Select>

      <label htmlFor="search" className="label">
        Search result highlights:
      </label>
      <Select id="search" defaultValue="hide">
        <option value="fade">Fade out</option>
        <option value="hide">Hide them</option>
      </Select> */}
    </div>
  );
}

export default Dropdown;
