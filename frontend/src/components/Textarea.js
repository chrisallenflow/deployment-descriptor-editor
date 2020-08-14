import React from "react";
import "./Textarea.css";

function Textarea({ className, ...props }) {
  return (
    <textarea
      rows="5"
      className={"textarea" + (className ? className : "")}
      {...props}
    />
  );
}

export default Textarea;
