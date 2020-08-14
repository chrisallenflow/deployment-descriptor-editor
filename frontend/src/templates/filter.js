export default {
  prefix: "camunda.bpm.filter",
  label: "Filter",
  properties: [
    {
      name: "create",
      type: "string",
      description:
        'Name of a "show all" filter. If set, a new filter is created on start that displays all tasks. Useful for testing on h2 db.',
    },
  ],
};
