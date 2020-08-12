# Camunda Hackdays - Summer 2020

## Project: Deployment Descriptor Editor

## Introduction

In Camunda BPM, in order to make a configuration change of some sort, you typically have to edit one of many "deployment descriptors". Two descriptors are listed specifically in our documentation:

- bpm-platform.xml
- processes.xml

Where confusion arises is determining the location of a setting for particular distribution. For instance, for bpm-platform.xml the documentation states that if you are using Wildfly then you need to add this info to standalone.xml or domain.xml instead. Similar confusion is true for Spring Boot setups, where some values of processes.xml are now settable/available in your application.yml configuration file (but some are not). In Spring Boot, you do not use bpm-platform.xml at all.

So for customization of your Camunda BPM distribution, you need to know two things.

1. What property/flag/attribute do I need to change to accomplish the desired effect?
2. In what configuration file does that property live for my distribution?

**The purpose of this hackdays project is to focus on making point #2 above obsolete.** We will attempt to simply display configuration possibilities in a UI. Once a user makes choices and saves them, that payload is sent to a custom API that does the proper deployment descriptor configuration. The UI will then remind the user to stop/start their Camunda server for changes to take effect.

## Scope

I doubt that we will be able to implement a fully functional prototype for this functionality in the time allotted for hackdays. Therefore we will narrow the scope of work to just updating a few key configuration properties to prove the concept. This should help at least get a visual for the concept, and get the ideas flowing.

## Team

Chris Allen - Field Ops: Consulting NA
Andreas Remdt - Product Team: Cawemo Engineer

## Definition of Done

A user interface that changes a camunda.bpm property, then asks the user to stop/start the server. After restart, prove that the property was set.

## Division of Duties

Chris and Andreas will work together on deciding what the UI should look like. Andreas will change this concept as needed and make the UI come to life. He will start with the properties listed in the documentation link below.

Chris will work on the back end magic of accepting the payload from the UI, then marshalling and unmarshalling the deployment descriptors with the new settings. He will concentrate on updating the application.yaml in a Spring Boot implementation using SnakeYaml.

Chris will create REST endpoints. One for getting the latest application.yaml payload to send to the UI on load in some predetermined format (probably just JSON), and then another endpoint for accepting the updated values from a form submission. Will probably use some YAML 2 JSON library like Jackson to marshall/unmarshall the existing application.yaml, as that seems to be the easiest path.

Other volunteers/participants that join the project will help either Andreas or Chris on the front end/back end work, respectively.

Focus will start with: https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/configuration/#camunda-engine-properties

## Prerequisites

- Java 11
- Maven

## JSON Payload Example

This is what the application.yaml looks like when parsed by Jackson libraries to be JSON. I see no reason why we cannot just use this as the payload back/forth from the UI.

```json
{
  "spring.datasource": {
    "url": "jdbc:h2:./camunda-db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "username": "sa",
    "password": "sa"
  },
  "spring.h2.console.enabled": true,
  "camunda.bpm": {
    "admin-user": {
      "id": "demo",
      "password": "demo",
      "firstName": "Demo",
      "lastName": "Demo"
    },
    "filter": {
      "create": "All Tasks"
    },
    "process-engine-name": "someEngine"
  },
  "server.port": 8080
}
```

In this example we have three prefix hierarchy examples.

1. **camunda.bpm**: setting the “process-engine-name” property.
2. **camunda.bpm.admin-user**: setting “id”, “password”, “firstName”, “lastName”
3. **camunda.bpm.filter**: setting the “create” property.

## REST Endpoints

You can see the added REST endpoints by loading the Swagger page once running.

http://localhost:8080/swagger-ui.html

Specifically:

GET http://localhost:8080/getConfig

This will return the application.yaml as a JSON file

POST http://localhost:8080/setConfig

POST payload is the application.yaml as a JSON file. The JSON will be returned to YAML and written to the application.yaml file.

To Test the REST Endpoints.

1. Start server with IDE or maven : mvn spring-boot:run

2. Use the Camunda REST API to get the engine name: http://localhost:8080/engine-rest/engine . You should get something like :

```json
[{ "name": "default" }]
```

3. Get JSON by calling http://localhost:8080/getConfig . You should get something like this:

```json
{
  "spring.datasource": {
    "url": "jdbc:h2:./camunda-db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "username": "sa",
    "password": "sa"
  },
  "spring.h2.console.enabled": true,
  "camunda.bpm": {
    "admin-user": {
      "id": "demo",
      "password": "demo",
      "firstName": "Demo",
      "lastName": "Demo"
    },
    "filter": {
      "create": "All Tasks"
    }
  },
  "server.port": 8080
}
```

4. Add reference in the JSON to a new process engine named "someEngine", like this:

```json
{
  "spring.datasource": {
    "url": "jdbc:h2:./camunda-db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "username": "sa",
    "password": "sa"
  },
  "spring.h2.console.enabled": true,
  "camunda.bpm": {
    "admin-user": {
      "id": "demo",
      "password": "demo",
      "firstName": "Demo",
      "lastName": "Demo"
    },
    "filter": {
      "create": "All Tasks"
    },
    "process-engine-name": "someEngine"
  },
  "server.port": 8080
}
```

5. Make a post call with Postman with the new JSON to http://localhost:8080/setConfig

6. Stop/Start Camunda Spring Boot server. When it is back up, call http://localhost:8080/engine-rest/engine . You should see your changed engine name.

```json
[{ "name": "someEngine" }]
```

## User Interface

We will now use a UI to interface with this REST API. It will retrieve the current settings, and display them as current values in the UI. It will then display choices available per the Camunda BPM documentation, then post the changes to the REST API to setConfig.

### Installation

> Before attempting to run the UI, make sure that [Node.js v12 or higher](https://nodejs.org/en/) is installed on your machine.

Just run the following three commands to start using the UI:

```
# go into the frontend directory
cd frontend/

# install all dependencies
npm install

# start the app
npm start
```

The UI will be available on [`localhost:3000`](http://localhost:3000).

## Future Updates

1. In order to be able to distribute properties in a flexible manner across multiple descriptor files depending on platform, we will require a single universal JSON format for this web app that represents all possible descriptor file combinations.  This will simply be a list of all properties currently set, excluding defaults not set.  Currently we are marshalling/unmarshalling the application.yaml in a Spring Boot application to prove the concept.
