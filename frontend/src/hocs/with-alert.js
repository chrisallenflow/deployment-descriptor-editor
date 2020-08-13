import React, { useState } from "react";
import Alert from "../components/Alert";

function withAlert(WrappedComponent) {
  return function Component(props) {
    const [alert, setAlert] = useState({});

    const handleAlert = (message, variant) => {
      setAlert({ message, variant });
    };

    return (
      <React.Fragment>
        <WrappedComponent onAlert={handleAlert} {...props} />

        {Boolean(alert.message) && (
          <Alert
            message={alert.message}
            variant={alert.variant}
            onClose={() => setAlert({})}
          />
        )}
      </React.Fragment>
    );
  };
}

export default withAlert;
