package org.camunda.hackdays;

import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.camunda.hackdays.restcontroller.EditorController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableProcessApplication("deployment-descriptor-editor")
public class CamundaApplication extends SpringBootServletInitializer {

    public static void main(String... args) {
        SpringApplication.run(CamundaApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(EditorController.class);
    }
}
