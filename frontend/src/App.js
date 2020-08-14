import React from "react";
import PageHeader from "./components/PageHeader";
import Form from "./components/Form";
import SettingsContextWrapper from "./contexts/SettingsContext";
import "./App.css";

function App() {
  return (
    <SettingsContextWrapper>
      <PageHeader />

      <Form />
    </SettingsContextWrapper>
  );
}

export default App;
