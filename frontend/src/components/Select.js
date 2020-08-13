import React from "react";
import "./Select.css";

function Select({ className, ...props }) {
  return (
    <select className={"select" + (className ? className : "")} {...props} />
  );
}

export default Select;
