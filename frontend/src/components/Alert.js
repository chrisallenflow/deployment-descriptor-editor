import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ReactComponent as IconClose } from "../icons/close.svg";
import "./Alert.css";

function Alert({ message, variant, onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);

    setTimeout(() => {
      onClose();
    }, 400);
  };
  useEffect(() => {
    if (variant === "error") {
      return;
    }

    let timeout = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, variant]);

  return (
    <div
      role="alert"
      className={`alert is-${variant}${fadeOut ? " fade-out" : ""}`}
    >
      <Button
        aria-label="Close alert"
        variant="transparent"
        onClick={handleClose}
      >
        <IconClose />
      </Button>
      {message}
    </div>
  );
}

Alert.defaultProps = {
  variant: "error",
};

export default Alert;
