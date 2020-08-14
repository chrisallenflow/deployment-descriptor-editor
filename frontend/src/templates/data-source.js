export default {
  prefix: "camunda.bpm.database",
  label: "Datasource",
  properties: [
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
  ],
};
