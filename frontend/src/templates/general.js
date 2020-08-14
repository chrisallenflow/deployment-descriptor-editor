export default {
  prefix: "camunda.bpm",
  label: "General",
  properties: [
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
      depends: ["generate-unique-process-engine-name"],
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
      defaultValue: "AUTO",
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
      depends: ["history-level"],
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
  ],
};
