import React from "react";
import "./Button.css";

function Button({ variant, active, ...props }) {
  return (
    <button
      className={`button is-${variant}${active ? " is-active" : ""}`}
      {...props}
    />
  );
}

Button.defaultProps = {
  type: "button",
  variant: "primary",
  active: false,
};

export default Button;
