export default {
  prefix: "camunda.bpm.webapp",
  label: "Webapp",
  properties: [
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
  ],
};
