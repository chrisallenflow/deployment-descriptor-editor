export default {
  prefix: "camunda.bpm.metrics",
  label: "Metrics",
  properties: [
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
  ],
};
