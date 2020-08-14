import React from "react";
import "./Input.css";

function Input({ className, ...props }) {
  return (
    <input className={"input" + (className ? className : "")} {...props} />
  );
}

export default Input;
