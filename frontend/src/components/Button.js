import React from "react";
import "./Button.css";

function Button({ variant, ...props }) {
  return <button className={`button is-${variant}`} {...props} />;
}

Button.defaultProps = {
  type: "button",
  variant: "primary",
};

export default Button;
