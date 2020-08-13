const general = [
  {
    name: "enabled",
    type: "boolean",
    description:
      "Switch to disable the Camunda auto-configuration. Use to exclude Camunda in integration tests.",
    defaultValue: true,
  },
  {
    name: "process-engine-name",
    type: "string",
    description: "Name of the process engine",
    defaultValue: "default",
  },
  {
    name: "generate-unique-process-engine-name",
    type: "boolean",
    description:
      "Generate a unique name for the process engine (format: 'processEngine' + 10 random alphanumeric characters)",
    defaultValue: false,
    dependency: {
      name: "process-engine-name",
      condition: (target) => target.checked,
      action: "disabled",
      description:
        "This property can't be changed while 'generate-unique-process-engine-name' is set to true.",
    },
  },
  {
    name: "generate-unique-process-application-name",
    type: "boolean",
    description:
      "Generate a unique Process Application name for every Process Application deployment (format: 'processApplication' + 10 random alphanumeric characters)",
    defaultValue: false,
  },
  {
    name: "default-serialization-format",
    type: "string",
    description: "Default serialization format",
  },
  {
    name: "history-level",
    type: "select",
    description: "Camunda history level",
    defaultValue: "FULL",
    options: ["NONE", "ACTIVITY", "AUDIT", "FULL", "AUTO"],
    dependency: {
      name: "history-level-default",
      condition: (target) => target.value !== "AUTO",
      action: "disabled",
      description:
        "This property can't be changed while 'history-level' is not set to AUTO.",
    },
  },
  {
    name: "history-level-default",
    type: "select",
    description:
      "Camunda history level to use when history-level is auto, but the level can not determined automatically",
    defaultValue: "FULL",
    options: ["FULL", "AUTO"],
  },
  {
    name: "auto-deployment-enabled",
    type: "boolean",
    description:
      "If processes should be auto deployed. This is disabled when using the SpringBootProcessApplication",
    defaultValue: true,
  },
  {
    name: "default-number-of-retries",
    type: "number",
    description:
      "Specifies how many times a job will be executed before an incident is raised",
    defaultValue: 3,
  },
  {
    name: "job-executor-acquire-by-priority",
    type: "boolean",
    description:
      "If set to true, the job executor will acquire the jobs with the highest priorities",
    defaultValue: false,
  },
  {
    name: "license-file",
    type: "string",
    description:
      "Provides a URL to your Camunda license file and is automatically inserted into the DB when the application starts (but only if no valid license key is found in the DB).",
  },
  {
    name: "id-generator",
    type: "select",
    description: "Configure idGenerator.",
    options: ["simple", "strong", "prefixed"],
    defaultValue: "strong",
  },
  {
    name: "version",
    type: "string",
    description: "Version of the process engine",
    defaultValue: "7.4.0",
  },
  {
    name: "formatted-version",
    type: "string",
    description: "Formatted version of the process engine",
    defaultValue: "v7.4.0",
  },
  {
    name: "deployment-resource-pattern",
    type: "textarea",
    description: "Location for auto deployment",
    defaultValue: `classpath*:**/*.bpmn,
classpath*:**/*.bpmn20.xml,
classpath*:**/*.dmn,
classpath*:**/*.dmn11.xml,
classpath*:**/*.cmmn,
classpath*:**/*.cmmn10.xml,
classpath*:**/*.cmmn11.xml
    `,
  },
];

const jobExecution = [
  {
    name: "enabled",
    type: "boolean",
    description:
      "If set to false, no JobExecutor bean is created at all. Maybe used for testing.",
    defaultValue: true,
  },
  {
    name: "deployment-aware",
    type: "boolean",
    description: "If job executor is deployment aware",
    defaultValue: false,
  },
  {
    name: "core-pool-size",
    type: "number",
    description: "Set to value > 1 to activate parallel job execution.",
    defaultValue: 3,
  },
  {
    name: "keep-alive-seconds",
    type: "number",
    description:
      "Specifies the time, in milliseconds, for which threads are kept alive when there are no more tasks present. When the time expires, threads are terminated so that the core pool size is reached.",
    defaultValue: 0,
  },
  {
    name: "lock-time-in-millis",
    type: "number",
    description:
      "Specifies the time in milliseconds an acquired job is locked for execution. During that time, no other job executor can acquire the job.",
    defaultValue: 300000,
  },
  {
    name: "max-jobs-per-acquisition",
    type: "number",
    description: "Sets the maximal number of jobs to be acquired at once.",
    defaultValue: 3,
  },
  {
    name: "max-pool-size",
    type: "number",
    description: "Maximum number of parallel threads executing jobs.",
    defaultValue: 10,
  },
  {
    name: "queue-capacity",
    type: "number",
    description:
      "Sets the size of the queue which is used for holding tasks to be executed.",
    defaultValue: 3,
  },
  {
    name: "wait-time-in-millis",
    type: "number",
    description:
      "Specifies the wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition. If this is repeatedly the case, the wait time is increased exponentially by the factor waitIncreaseFactor. The wait time is capped by maxWait.",
    defaultValue: 5000,
  },
  {
    name: "max-wait",
    type: "number",
    description:
      "Specifies the maximum wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition.",
    defaultValue: 60000,
  },
  {
    name: "backoff-time-in-millis",
    type: "number",
    description:
      "Specifies the wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked. This condition indicates that there are other job acquisition threads acquiring jobs in parallel. If this is repeatedly the case, the backoff time is increased exponentially by the factor waitIncreaseFactor. The time is capped by maxBackoff. With every increase in backoff time, the number of jobs acquired increases by waitIncreaseFactor as well.",
    defaultValue: 0,
  },
  {
    name: "max-backoff",
    type: "number",
    description:
      "Specifies the maximum wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked.",
    defaultValue: 0,
  },
  {
    name: "backoff-decrease-threshold",
    type: "number",
    description:
      "Specifies the number of successful job acquisition cycles without a job locking failure before the backoff time is decreased again. In that case, the backoff time is reduced by waitIncreaseFactor.",
    defaultValue: 100,
  },
  {
    name: "wait-increase-factor",
    type: "number",
    description:
      "Specifies the factor by which wait and backoff time are increased in case their activation conditions are repeatedly met.",
    defaultValue: 2,
  },
];

const dataSource = [
  {
    name: "schema-update",
    type: "select",
    description:
      "If automatic schema update should be applied, use one of [true, false, create, create-drop, drop-create]",
    options: ["true", "false", "create", "create-drop", "drop-create"],
    defaultValue: "true",
  },
  {
    name: "type",
    type: "select",
    description: "Type of the underlying database.",
    options: ["h2", "mysql", "mariadb", "oracle", "postgres", "mssql", "db2"],
  },
  {
    name: "table-prefix",
    type: "string",
    description:
      "Prefix of the camunda database tables. Attention: The table prefix will not be applied if you are using schema-update!",
  },
  {
    name: "schema-name",
    type: "string",
    description: "The database schema name",
  },
  {
    name: "jdbc-batch-processing",
    type: "boolean",
    description:
      "Controls if the engine executes the jdbc statements as Batch or not. It has to be disabled for some databases. See the user guide for further details.",
    defaultValue: true,
  },
];

const eventing = [
  {
    name: "execution",
    type: "boolean",
    description:
      "Enables eventing of delegate execution events. See the user guide for further details.",
    defaultValue: true,
  },
  {
    name: "history",
    type: "boolean",
    description:
      "Enables eventing of history events. See the user guide for further details.",
    defaultValue: true,
  },
  {
    name: "task",
    type: "boolean",
    description:
      "Enables eventing of task events. See the user guide for further details.",
    defaultValue: true,
  },
];

const jpa = [
  {
    name: "enabled",
    type: "boolean",
    description: "Enables JPA configuration",
    defaultValue: true,
  },
  {
    name: "persistence-unit-name",
    type: "string",
    description: "JPA persistence unit name",
  },
  {
    name: "close-entity-manager",
    type: "boolean",
    description: "Close JPA entity manager",
    defaultValue: true,
  },
  {
    name: "handle-transaction",
    type: "boolean",
    description: "JPA handle transaction",
    defaultValue: true,
  },
];

const management = [
  {
    name: "health-camunda-enabled",
    type: "boolean",
    description: "Enables default camunda health indicators",
    defaultValue: true,
  },
];

const metrics = [
  {
    name: "enabled",
    type: "boolean",
    description: "Enables metrics reporting",
  },
  {
    name: "db-reporter-activate",
    type: "boolean",
    description: "Enables DB metrics reporting",
  },
];

const webapp = [
  {
    name: "enabled",
    type: "boolean",
    description: "Switch to disable the Camunda Webapp auto-configuration.",
    defaultValue: true,
  },
  {
    name: "index-redirect-enabled",
    type: "boolean",
    description:
      "Registers a redirect from / to camunda's bundled index.html. If this property is set to false, the default Spring Boot behaviour is taken into account.",
    defaultValue: true,
  },
  {
    name: "application-path",
    type: "string",
    description:
      "Changes the application path of the webapp. When setting to /, the legacy behavior of Camunda Spring Boot Starter <= 3.4.x is restored.",
    defaultValue: "/camunda",
  },
];

const webappCsrf = [
  {
    name: "target-origin",
    type: "string",
    description:
      "Sets the application expected deployment domain. See the user guide for details.",
  },
  {
    name: "deny-status",
    type: "number",
    description:
      "Sets the HTTP response status code used for a denied request. See the user guide for details.",
    defaultValue: 403,
  },
  {
    name: "random-class",
    type: "string",
    description:
      "Sets the name of the class used to generate tokens. See the user guide for details.",
    defaultValue: "java.security.SecureRandom",
  },
  {
    name: "entry-points",
    type: "string",
    description:
      "Sets additional URLs that will not be tested for the presence of a valid token. See the user guide for details.",
  },
  {
    name: "enable-secure-cookie",
    type: "boolean",
    description: "If set to true, the cookie flag Secure is enabled.",
    defaultValue: false,
  },
  {
    name: "enable-same-site-cookie",
    type: "boolean",
    description:
      "If set to false, the cookie flag SameSite is disabled. The default value of the SameSite cookie is LAX and it can be changed via same-site-cookie-option configuration property.",
    defaultValue: true,
  },
  {
    name: "same-site-cookie-option",
    type: "string",
    description:
      "Can be configured either to STRICT or LAX. Note: Is ignored when enable-same-site-cookie is set to false. Cannot be set in conjunction with same-site-cookie-value",
  },
  {
    name: "same-site-cookie-value",
    type: "string",
    description:
      "A custom value for the cookie property. Note: Is ignored when enable-same-site-cookie is set to false. Cannot be set in conjunction with same-site-cookie-option",
  },
  {
    name: "cookie-name",
    type: "string",
    description:
      "A custom value to change the cookie name. Note: Please make sure to additionally change the cookie name for each webapp (e. g. Cockpit ) separately.",
    defaultValue: "XSRF-TOKEN",
  },
];

const webappHeaderSecurity = [
  {
    name: "xss-protection-disabled",
    type: "boolean",
    description: "The header can be entirely disabled if set to true.",
    defaultValue: false,
  },
  {
    name: "xss-protection-option",
    type: "select",
    description:
      "BLOCK: If the browser detects a cross-site scripting attack, the page is blocked completely. SANITIZE: If the browser detects a cross-site scripting attack, the page is sanitized from suspicious parts (value 0). Note: Is ignored when .xss-protection-disabled is set to true. Cannot be set in conjunction with .xss-protection-value",
    options: ["BLOCK", "SANITIZE"],
    defaultValue: "BLOCK",
  },
  {
    name: "xss-protection-value",
    type: "string",
    description:
      "A custom value for the header can be specified. Note: Is ignored when .xss-protection-disabled is set to true. Cannot be set in conjunction with .xss-protection-option",
    defaultValue: "1; mode=block",
  },
  {
    name: "content-security-policy-disabled",
    type: "boolean",
    description: "The header can be entirely disabled if set to true.",
    defaultValue: false,
  },
  {
    name: "content-security-policy-value",
    type: "string",
    description:
      "A custom value for the header can be specified. Note: Property is ignored when .content-security-policy-disabled is set to true",
    defaultValue: "base-uri 'self'",
  },
  {
    name: "content-type-options-disabled",
    type: "boolean",
    description: "The header can be entirely disabled if set to true.",
    defaultValue: false,
  },
  {
    name: "content-type-options-value",
    type: "string",
    description:
      "A custom value for the header can be specified. Note: Property is ignored when .content-security-policy-disabled is set to true",
    defaultValue: "nosniff",
  },
  {
    name: "hsts-disabled",
    type: "boolean",
    description:
      "Set to false to enable the header. The header is disabled by default.",
    defaultValue: true,
  },
  {
    name: "hsts-max-age",
    type: "number",
    description:
      "Amount of seconds, the browser should remember to access the webapp via HTTPS. Note: Corresponds by default to one year. Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsValue. Allows a maximum value of 2^31-1",
    defaultValue: 31536000,
  },
  {
    name: "hsts-include-subdomains-disabled",
    type: "boolean",
    description:
      "HSTS is additionally to the domain of the webapp enabled for all its subdomains. Note: Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsValue",
    defaultValue: true,
  },
  {
    name: "hsts-value",
    type: "string",
    description:
      "A custom value for the header can be specified. Note: Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsMaxAge or hstsIncludeSubdomainsDisabled",
    defaultValue: "max-age=31536000",
  },
];

const authorization = [
  {
    name: "enabled",
    type: "boolean",
    description: "Enables authorization",
  },
  {
    name: "enabled-for-custom-code",
    type: "boolean",
    description: "Enables authorization for custom code",
  },
  {
    name: "authorization-check-revokes",
    type: "boolean",
    description: "Configures authorization check revokes",
  },
  {
    name: "tenant-check-enabled",
    type: "boolean",
    description:
      "Performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants.",
    defaultValue: false,
  },
];

const adminUser = [
  {
    name: "id",
    type: "string",
    description: "The username (e.g., 'admin')",
  },
  {
    name: "password",
    type: "string",
    description: "The initial password",
    defaultValue: "=id",
  },
  {
    name: "firstName",
    type: "string",
    description: "Additional (optional) user attributes",
    defaultValue: "id",
  },
  {
    name: "lastName",
    type: "string",
    description: "Additional (optional) user attributes",
    defaultValue: "id",
  },
  {
    name: "email",
    type: "string",
    description: "Additional (optional) user attributes",
    defaultValue: "id",
  },
];

const filter = [
  {
    name: "create",
    type: "string",
    description:
      'Name of a "show all" filter. If set, a new filter is created on start that displays all tasks. Useful for testing on h2 db.',
  },
];

export default [
  {
    key: "camunda.bpm",
    label: "General",
    properties: general,
  },
  {
    key: "camunda.bpm.job-execution",
    label: "Job Execution",
    properties: jobExecution,
  },
  {
    key: "camunda.bpm.database",
    label: "Datasource",
    properties: dataSource,
  },
  {
    key: "camunda.bpm.eventing",
    label: "Eventing",
    properties: eventing,
  },
  {
    key: "camunda.bpm.jpa",
    label: "JPA",
    properties: jpa,
  },
  {
    key: "camunda.bpm.management",
    label: "Management",
    properties: management,
  },
  {
    key: "camunda.bpm.metrics",
    label: "Metrics",
    properties: metrics,
  },
  {
    key: "camunda.bpm.webapp",
    label: "Webapp",
    properties: webapp,
  },
  {
    key: "camunda.bpm.webapp.csrf",
    label: "Webapp CSRF",
    properties: webappCsrf,
  },
  {
    key: "camunda.bpm.webapp.header-security",
    label: "Webapp Header Security",
    properties: webappHeaderSecurity,
  },
  {
    key: "camunda.bpm.authorization",
    label: "Authorization",
    properties: authorization,
  },
  {
    key: "camunda.bpm.admin-user",
    label: "Admin User",
    properties: adminUser,
  },
  {
    key: "camunda.bpm.filter",
    label: "Filter",
    properties: filter,
  },
];
