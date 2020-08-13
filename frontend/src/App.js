import React from "react";
import PageHeader from "./components/PageHeader";
import Form from "./components/Form";
import SettingsContextWrapper from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsContextWrapper>
      <PageHeader />

      <Form />
    </SettingsContextWrapper>
  );
}

export default App;
