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
  },
  {
    name: "generate-unique-process-engine-name",
    type: "boolean",
    description:
      "Generate a unique name for the process engine (format: 'processEngine' + 10 random alphanumeric characters)",
    defaultValue: false,
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
    type: "string",
    description: "Camunda history level",
    defaultValue: "FULL",
  },
  {
    name: "history-level-default",
    type: "string",
    description:
      "Camunda history level to use when history-level is auto, but the level can not determined automatically",
    defaultValue: "FULL",
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
      "Provides a URL to your Camunda license file and is automatically inserted into the DB when the application starts (but only if no valid license key is found in the DB). Note: This property is only available when using the camunda-bpm-spring-boot-starter-webapp-ee",
  },
  {
    name: "id-generator",
    type: "select",
    description:
      "Configure idGenerator. Allowed values: simple, strong, prefixed. prefixed id generator is like strong, but uses a Spring application name (spring.application.name) as the prefix for each id.",
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
];

const dataSource = [
  {
    name: "schema-update",
    type: "select",
    description:
      "If automatic schema update should be applied, use one of [true, false, create, create-drop, drop-create]",
    options: ["true", "false", "create", "create-drop", "drop-create"],
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
