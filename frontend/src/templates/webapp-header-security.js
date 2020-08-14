export default {
  prefix: "camunda.bpm.webapp.header-security",
  label: "Webapp Header Security",
  properties: [
    {
      name: "xss-protection-disabled",
      type: "boolean",
      description: "The header can be entirely disabled if set to true.",
      defaultValue: false,
    },
    {
      name: "xss-protection-option",
      type: "select",
      description:
        "BLOCK: If the browser detects a cross-site scripting attack, the page is blocked completely. SANITIZE: If the browser detects a cross-site scripting attack, the page is sanitized from suspicious parts (value 0). Note: Is ignored when .xss-protection-disabled is set to true. Cannot be set in conjunction with .xss-protection-value",
      options: ["BLOCK", "SANITIZE"],
      defaultValue: "BLOCK",
    },
    {
      name: "xss-protection-value",
      type: "string",
      description:
        "A custom value for the header can be specified. Note: Is ignored when .xss-protection-disabled is set to true. Cannot be set in conjunction with .xss-protection-option",
      defaultValue: "1; mode=block",
    },
    {
      name: "content-security-policy-disabled",
      type: "boolean",
      description: "The header can be entirely disabled if set to true.",
      defaultValue: false,
    },
    {
      name: "content-security-policy-value",
      type: "string",
      description:
        "A custom value for the header can be specified. Note: Property is ignored when .content-security-policy-disabled is set to true",
      defaultValue: "base-uri 'self'",
    },
    {
      name: "content-type-options-disabled",
      type: "boolean",
      description: "The header can be entirely disabled if set to true.",
      defaultValue: false,
    },
    {
      name: "content-type-options-value",
      type: "string",
      description:
        "A custom value for the header can be specified. Note: Property is ignored when .content-security-policy-disabled is set to true",
      defaultValue: "nosniff",
    },
    {
      name: "hsts-disabled",
      type: "boolean",
      description:
        "Set to false to enable the header. The header is disabled by default.",
      defaultValue: true,
    },
    {
      name: "hsts-max-age",
      type: "number",
      description:
        "Amount of seconds, the browser should remember to access the webapp via HTTPS. Note: Corresponds by default to one year. Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsValue. Allows a maximum value of 2^31-1",
      defaultValue: 31536000,
    },
    {
      name: "hsts-include-subdomains-disabled",
      type: "boolean",
      description:
        "HSTS is additionally to the domain of the webapp enabled for all its subdomains. Note: Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsValue",
      defaultValue: true,
    },
    {
      name: "hsts-value",
      type: "string",
      description:
        "A custom value for the header can be specified. Note: Is ignored when hstsDisabled is true. Cannot be set in conjunction with hstsMaxAge or hstsIncludeSubdomainsDisabled",
      defaultValue: "max-age=31536000",
    },
  ],
};
