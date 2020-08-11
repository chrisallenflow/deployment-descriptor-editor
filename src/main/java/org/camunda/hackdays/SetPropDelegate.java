package org.camunda.hackdays;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.hackdays.snakeyaml.ApplicationYamlUtil;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component("setProp")
public class SetPropDelegate implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        Map<String, Object> yamlAsMap = ApplicationYamlUtil.getApplicationYaml();
        System.out.println(yamlAsMap);

        // add a property
        yamlAsMap = ApplicationYamlUtil.addCamundaBpmProperty(
                yamlAsMap, "camunda.bpm", "process-engine-name", "someEngine");
        yamlAsMap = ApplicationYamlUtil.addCamundaBpmProperty(
                yamlAsMap, "camunda.bpm", "auto-deployment-enabled", false);
        yamlAsMap = ApplicationYamlUtil.addCamundaBpmProperty(
                yamlAsMap, "camunda.bpm.job-execution", "max-jobs-per-acquisition", 4);
        yamlAsMap = ApplicationYamlUtil.addCamundaBpmProperty(
                yamlAsMap, "camunda.bpm.job-execution", "max-pool-size", 11);

        // write to the file system
        ApplicationYamlUtil.writeApplicationYaml(yamlAsMap);

    }
}
