export default {
  prefix: "camunda.bpm.job-execution",
  label: "Job Execution",
  properties: [
    {
      name: "enabled",
      type: "boolean",
      description:
        "If set to false, no JobExecutor bean is created at all. Maybe used for testing.",
      defaultValue: true,
    },
    {
      name: "deployment-aware",
      type: "boolean",
      description: "If job executor is deployment aware",
      defaultValue: false,
    },
    {
      name: "core-pool-size",
      type: "number",
      description: "Set to value > 1 to activate parallel job execution.",
      defaultValue: 3,
    },
    {
      name: "keep-alive-seconds",
      type: "number",
      description:
        "Specifies the time, in milliseconds, for which threads are kept alive when there are no more tasks present. When the time expires, threads are terminated so that the core pool size is reached.",
      defaultValue: 0,
    },
    {
      name: "lock-time-in-millis",
      type: "number",
      description:
        "Specifies the time in milliseconds an acquired job is locked for execution. During that time, no other job executor can acquire the job.",
      defaultValue: 300000,
    },
    {
      name: "max-jobs-per-acquisition",
      type: "number",
      description: "Sets the maximal number of jobs to be acquired at once.",
      defaultValue: 3,
    },
    {
      name: "max-pool-size",
      type: "number",
      description: "Maximum number of parallel threads executing jobs.",
      defaultValue: 10,
    },
    {
      name: "queue-capacity",
      type: "number",
      description:
        "Sets the size of the queue which is used for holding tasks to be executed.",
      defaultValue: 3,
    },
    {
      name: "wait-time-in-millis",
      type: "number",
      description:
        "Specifies the wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition. If this is repeatedly the case, the wait time is increased exponentially by the factor waitIncreaseFactor. The wait time is capped by maxWait.",
      defaultValue: 5000,
    },
    {
      name: "max-wait",
      type: "number",
      description:
        "Specifies the maximum wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition.",
      defaultValue: 60000,
    },
    {
      name: "backoff-time-in-millis",
      type: "number",
      description:
        "Specifies the wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked. This condition indicates that there are other job acquisition threads acquiring jobs in parallel. If this is repeatedly the case, the backoff time is increased exponentially by the factor waitIncreaseFactor. The time is capped by maxBackoff. With every increase in backoff time, the number of jobs acquired increases by waitIncreaseFactor as well.",
      defaultValue: 0,
    },
    {
      name: "max-backoff",
      type: "number",
      description:
        "Specifies the maximum wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked.",
      defaultValue: 0,
    },
    {
      name: "backoff-decrease-threshold",
      type: "number",
      description:
        "Specifies the number of successful job acquisition cycles without a job locking failure before the backoff time is decreased again. In that case, the backoff time is reduced by waitIncreaseFactor.",
      defaultValue: 100,
    },
    {
      name: "wait-increase-factor",
      type: "number",
      description:
        "Specifies the factor by which wait and backoff time are increased in case their activation conditions are repeatedly met.",
      defaultValue: 2,
    },
  ],
};
