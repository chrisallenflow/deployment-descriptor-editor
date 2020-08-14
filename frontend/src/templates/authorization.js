export default {
  prefix: "camunda.bpm.authorization",
  label: "Authorization",
  properties: [
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
  ],
};
