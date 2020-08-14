export default {
  prefix: "camunda.bpm.jpa",
  label: "JPA",
  properties: [
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
  ],
};
