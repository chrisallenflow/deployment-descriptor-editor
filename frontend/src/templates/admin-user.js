export default {
  prefix: "camunda.bpm.admin-user",
  label: "Admin User",
  properties: [
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
  ],
};
