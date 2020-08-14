export default {
  prefix: "camunda.bpm.eventing",
  label: "Eventing",
  properties: [
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
  ],
};
