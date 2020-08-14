import React from "react";
import { ReactComponent as LinkIcon } from "../icons/external-link.svg";
import "./PageHeader.css";

function PageHeader() {
  return (
    <header className="page-header">
      <h1 className="title">Deployment Descriptors Editor</h1>
      <a
        href="https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/configuration/#camunda-engine-properties"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        View documentation
        <LinkIcon width="18" height="18" />
      </a>
    </header>
  );
}

export default PageHeader;
