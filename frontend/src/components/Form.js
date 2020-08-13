import React, { useEffect, useState, useRef, useContext } from "react";
import { parse, restify } from "../utils/schema-converter";
import metadata from "../metadata";
import FormHeader from "./FormHeader";
import Button from "./Button";
import Property from "./Property";
import { ReactComponent as IconClose } from "../icons/close.svg";
import { SettingsContext } from "../contexts/SettingsContext";
import "./Form.css";

function Form() {
  const rawCategories = useRef();
  const { layout } = useContext(SettingsContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
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
        setError(error.message);
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
    }).then((response) => {
      if (response.ok) {
        setButtonText("Saved!");

        setTimeout(() => {
          setButtonText("Save changes");
        }, 2000);
      }
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
              />
            ))}
          </fieldset>
        ))
      )}

      {Boolean(error) && (
        <div role="alert" className="error-alert">
          <Button
            aria-label="Close alert"
            variant="transparent"
            onClick={() => setError("")}
          >
            <IconClose />
          </Button>
          {error}
        </div>
      )}
    </form>
  );
}

export default Form;
