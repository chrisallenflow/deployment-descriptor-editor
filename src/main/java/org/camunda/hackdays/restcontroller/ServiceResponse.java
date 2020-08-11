package org.camunda.hackdays.restcontroller;

/**
 * Bean to wrap each web service response.  Renders as a JSON Object via Spring Web.
 */
public class ServiceResponse {

    private String status;
    private String description;

    public ServiceResponse(String status, String description) {
        this.status = status;
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }
}
