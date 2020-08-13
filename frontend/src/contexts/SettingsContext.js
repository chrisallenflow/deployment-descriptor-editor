import React, { useReducer } from "react";

const SettingsContext = React.createContext();

const INITIAL_STATE = {
  layout: localStorage.getItem("editor.layout") || "tabs",
  platform: localStorage.getItem("editor.platform") || "spring-boot",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LAYOUT":
      localStorage.setItem("editor.layout", action.payload);
      return { ...state, layout: action.payload };

    case "SWITCH_PLATFORM":
      localStorage.setItem("editor.platform", action.payload);
      return { ...state, platform: action.payload };

    default:
      return state;
  }
}

function SettingsContextWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext };
export default SettingsContextWrapper;
