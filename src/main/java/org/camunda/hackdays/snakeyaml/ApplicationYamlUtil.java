package org.camunda.hackdays.snakeyaml;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public final class ApplicationYamlUtil {

    public ApplicationYamlUtil() {
    }

    public static Map<String, Object> getApplicationYaml() {
        InputStream configurationFile = null;
        try {
            Yaml yaml = new Yaml();
            configurationFile = new ClassPathResource("application.yaml").getInputStream();
            return yaml.load(configurationFile);
        } catch (IOException e) {
            return null;
        } finally {
            IOUtils.closeQuietly(configurationFile);
        }
    }

    public static String yamlToJson(Map<String, Object> obj) {
        if (obj == null) return "";
        try {
            return new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return "";
        }
    }

    public static Map<String, Object> jsonToYamlMap(String json) throws Exception {
        try {
            JsonNode jsonNodeTree = new ObjectMapper().readTree(json);
            String yamlString = new YAMLMapper().writeValueAsString(jsonNodeTree);
            Yaml yaml = new Yaml();
            return yaml.load(yamlString);
        } catch (Exception e) {
            throw new Exception("Trouble converting JSON to YAML map", e);
        }
    }

    public static void writeApplicationYaml(Map<String, Object> yamlAsMap) throws IOException {
        DumperOptions options = new DumperOptions();
        Writer writer = null;
        try {
            options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
            options.setPrettyFlow(true);
            Yaml yaml2 = new Yaml(options);
            File yamlfile = null;
            yamlfile = new ClassPathResource("application.yaml").getFile();
            writer = new BufferedWriter(new FileWriter(yamlfile));
            yaml2.dump(yamlAsMap, writer);
        } finally {
            IOUtils.closeQuietly(writer);
        }
    }

    public static Map<String, Object> addCamundaBpmProperty(Map<String, Object> yamlAsMap,
                                                            String prefix, String propertyName, Object propertyValue) {

        Map<String, Object> prefixMap = null;
        prefixMap = (Map<String, Object>) yamlAsMap.get(prefix);
        if (prefixMap == null) prefixMap = new HashMap<String, Object>();
        prefixMap.put(propertyName, propertyValue);
        yamlAsMap.put(prefix, prefixMap);
        return yamlAsMap;
    }

    // TODO: massage Yml structure to make keys top level
    public static Map<String, Object> massageYaml(Map<String, Object> yamlAsMap) {

//        Map<String, Object> prefixMap = null;
//        prefixMap = (Map<String, Object>) yamlAsMap.get("camunda.bpm");
//        if (prefixMap != null) {
//            // create prefixes and move them
//
//
//        }
//
//        prefixMap.put(propertyName, propertyValue);
//        yamlAsMap.put(prefix, prefixMap);
        return yamlAsMap;
    }

}
