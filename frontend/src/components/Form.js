import React, { useEffect, useState, useRef } from "react";
import { parse, restify } from "../utils/schema-converter";
import Button from "./Button";
import Property from "./Property";
import "./Form.css";

function Form() {
  const rawCategories = useRef();
  const [categories, setCategories] = useState([]);
  const [buttonText, setButtonText] = useState("Save changes");

  useEffect(() => {
    fetch("/getConfig")
      .then((response) => response.json())
      .then((json) => {
        const categories = parse(json);

        rawCategories.current = categories;
        setCategories(categories);
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

  const handleChange = (evt) => {
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-header">
        <input
          onChange={handleChange}
          type="search"
          className="search-input"
          placeholder="Search for properties..."
        />
        <Button disabled={buttonText !== "Save changes"} type="submit">
          {buttonText}
        </Button>
      </div>

      {categories.map((category) => (
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
      ))}
    </form>
  );
}

export default Form;
