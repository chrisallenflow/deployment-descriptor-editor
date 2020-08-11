package org.camunda.hackdays.restcontroller;

import org.camunda.hackdays.snakeyaml.ApplicationYamlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class EditorController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EditorController.class);

    /**
     * Say Hello.
     *
     * @param username The user's name (i.e. the person to say hello to)
     * @return response JSON Object.
     */
    @RequestMapping(value = "/sayHello", method = RequestMethod.GET)
    public ServiceResponse sayHello(@RequestParam("username") String username) {

        LOGGER.debug("*** about to say hello...");
        try {
            return new ServiceResponse("SUCCESS", "Hello, " + username + "!  You have successfully connected to the REST API endpoint!");
        } catch (Exception e) {
            LOGGER.error("*** something went wrong...");
            return new ServiceResponse("ERROR", "Could not say hello for some reason..." + e.getMessage());
        }

    }

    /**
     * Get Config.
     *
     * @return response JSON Object.
     */

    @RequestMapping(value = "/getConfig", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    String getConfig() {

        LOGGER.debug("*** about to get yaml config contents...");
        try {
            return ApplicationYamlUtil.yamlToJson(ApplicationYamlUtil.getApplicationYaml());
        } catch (Exception e) {
            LOGGER.error("*** something went wrong...");
        }
        return "{\"status\":\"ERROR\",\"description\":\"Could not retrieve JSON from application.yaml!!\"}";

    }

    @PostMapping("/setConfig")
    public void setConfig(@RequestBody String json) {

        try {
            Map<String, Object> yamlMap = ApplicationYamlUtil.jsonToYamlMap(json);
            ApplicationYamlUtil.writeApplicationYaml(yamlMap);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

    }

}
