export default {
  prefix: "camunda.bpm.webapp.csrf",
  label: "Webapp CSRF",
  properties: [
    {
      name: "target-origin",
      type: "string",
      description:
        "Sets the application expected deployment domain. See the user guide for details.",
    },
    {
      name: "deny-status",
      type: "number",
      description:
        "Sets the HTTP response status code used for a denied request. See the user guide for details.",
      defaultValue: 403,
    },
    {
      name: "random-class",
      type: "string",
      description:
        "Sets the name of the class used to generate tokens. See the user guide for details.",
      defaultValue: "java.security.SecureRandom",
    },
    {
      name: "entry-points",
      type: "string",
      description:
        "Sets additional URLs that will not be tested for the presence of a valid token. See the user guide for details.",
    },
    {
      name: "enable-secure-cookie",
      type: "boolean",
      description: "If set to true, the cookie flag Secure is enabled.",
      defaultValue: false,
    },
    {
      name: "enable-same-site-cookie",
      type: "boolean",
      description:
        "If set to false, the cookie flag SameSite is disabled. The default value of the SameSite cookie is LAX and it can be changed via same-site-cookie-option configuration property.",
      defaultValue: true,
    },
    {
      name: "same-site-cookie-option",
      type: "string",
      description:
        "Can be configured either to STRICT or LAX. Note: Is ignored when enable-same-site-cookie is set to false. Cannot be set in conjunction with same-site-cookie-value",
    },
    {
      name: "same-site-cookie-value",
      type: "string",
      description:
        "A custom value for the cookie property. Note: Is ignored when enable-same-site-cookie is set to false. Cannot be set in conjunction with same-site-cookie-option",
    },
    {
      name: "cookie-name",
      type: "string",
      description:
        "A custom value to change the cookie name. Note: Please make sure to additionally change the cookie name for each webapp (e. g. Cockpit ) separately.",
      defaultValue: "XSRF-TOKEN",
    },
  ],
};
