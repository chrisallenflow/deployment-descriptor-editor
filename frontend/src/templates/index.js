import adminUser from "./admin-user";
import authorization from "./authorization";
import dataSource from "./data-source";
import eventing from "./eventing";
import filter from "./filter";
import general from "./general";
import jobExecution from "./job-execution";
import jpa from "./jpa";
import management from "./management";
import metrics from "./metrics";
import webapp from "./webapp";
import webappCsrf from "./webapp-csrf";
import webappHeaderSecurity from "./webapp-header-security";

export default [
  general,
  jobExecution,
  dataSource,
  eventing,
  jpa,
  management,
  metrics,
  webapp,
  webappCsrf,
  webappHeaderSecurity,
  authorization,
  adminUser,
  filter,
];
