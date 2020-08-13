import React, { useEffect, useState, useRef, useContext } from "react";
import { parse, restify, updateDependencies } from "../utils/schema-converter";
import FormHeader from "./FormHeader";
import withAlert from "../hocs/with-alert";
import Property from "./Property";
import { SettingsContext } from "../contexts/SettingsContext";
import metadata from "../metadata";
import "./Form.css";

function Form({ onAlert }) {
  const rawCategories = useRef();
  const { layout } = useContext(SettingsContext);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("camunda.bpm");
  const [buttonText, setButtonText] = useState("Save changes");

  useEffect(() => {
    fetch("/getConfig")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(
          `Could not connect to the server (${response.status} - ${response.statusText}). The default values will be displayed and you might not be able to update them.`
        );
      })
      .then((json) => {
        const categories = parse(json, metadata);

        rawCategories.current = categories;
        setCategories(categories);
      })
      .catch((error) => {
        onAlert(error.message);
        setCategories(metadata);
        rawCategories.current = metadata;
      });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setButtonText("Saving...");

    const data = new FormData(evt.target);

    const json = {
      "spring.datasource": {
        url: "jdbc:h2:./camunda-db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
        username: "sa",
        password: "sa",
      },
      "spring.h2.console.enabled": true,
      "camunda.bpm": restify(data),
      "server.port": 8080,
    };

    fetch("/setConfig", {
      method: "POST",
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Could not update your setttings. (${response.status} - ${response.statusText}). Make sure that the server is running.`
          );
        }
        setButtonText("Save changes");

        onAlert(
          `Successfully updated your settings. If you changed the process engine name, you need to restart the server.`,
          "success"
        );
      })
      .catch((error) => {
        setButtonText("Save changes");
        onAlert(error.message);
      });
  };

  const handleSearch = (evt) => {
    const search = evt.target.value.toLowerCase().trim();

    const filtered = rawCategories.current.map((category) => {
      const properties = category.properties.map((property) => {
        const match =
          property.name.toLowerCase().includes(search) ||
          property.description.toLowerCase().includes(search);

        return { ...property, hidden: !match };
      });

      return { ...category, properties };
    });

    setCategories(filtered);
  };

  const handleClick = (evt) => {
    setActive(evt.target.dataset.tabKey);
  };

  const handleChange = (changed) => {
    if (changed.dependency) {
      setCategories(updateDependencies(categories, changed));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeader buttonText={buttonText} onSearch={handleSearch} />

      {layout === "tabs" ? (
        <React.Fragment>
          <div className="tabs">
            {categories.map((category) => (
              <button
                className={
                  "selector" + (active === category.key ? " is-active" : "")
                }
                key={category.key}
                onClick={handleClick}
                type="button"
                data-tab-key={category.key}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {categories.map((category) => (
              <section
                className={
                  "tab" + (active === category.key ? " is-active" : "")
                }
                key={category.key}
              >
                {category.properties.map((property) => (
                  <Property
                    key={property.name}
                    namespace={category.key}
                    property={property}
                    onChange={handleChange}
                  />
                ))}
              </section>
            ))}
          </div>
        </React.Fragment>
      ) : (
        categories.map((category) => (
          <fieldset key={category.key}>
            <legend>{category.label}</legend>
            {category.properties.map((property) => (
              <Property
                key={property.name}
                namespace={category.key}
                property={property}
                onChange={handleChange}
              />
            ))}
          </fieldset>
        ))
      )}
    </form>
  );
}

export default withAlert(Form);
