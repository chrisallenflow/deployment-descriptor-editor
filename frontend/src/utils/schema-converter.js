export function parse(json, metadata) {
  const fromServer = new Map(Object.entries(json["camunda.bpm"]));
  const scheduled = [];

  const categories = metadata.map((category) => {
    const namespace = category.prefix.replace("camunda.bpm.", "");

    if (namespace === "camunda.bpm") {
      const properties = category.properties.map((property, index) => {
        if (property.depends) {
          scheduled.push([property, index]);
        }

        if (fromServer.has(property.name)) {
          const defaultValue = fromServer.get(property.name);

          return { ...property, defaultValue };
        }

        return property;
      });

      return { ...category, properties };
    }

    if (fromServer.has(namespace)) {
      const properties = category.properties.map((property, index) => {
        if (property.depends) {
          scheduled.push([property, index]);
        }

        const defaultValue = fromServer.get(namespace)[property.name];

        if (fromServer.get(namespace)[property.name]) {
          return { ...property, defaultValue };
        }

        return property;
      });

      return { ...category, properties };
    }

    return category;
  });

  scheduled.forEach((slave) => {
    categories.forEach((category) => {
      const master = category.properties.find(
        (property) => property.name === slave[0].depends[0]
      );
      if (
        master &&
        master.dependency.condition({ value: slave[0].defaultValue })
      ) {
        category.properties[slave[1]].disabled = true;
        category.properties[slave[1]].warning = master.dependency.description;
      }
    });
  });

  return categories;
}

export function convertDataType(value) {
  if (value === "on") {
    return true;
  } else if (value === "off") {
    return false;
  }

  if (Number(value) && typeof value != "boolean") {
    return Number(value);
  }

  return value;
}

export function restify(formData) {
  let json = {};

  for (let [key, value] of formData.entries()) {
    value = convertDataType(value);

    const [property, namespace] = key.substr(12).split(".").reverse();

    if (!namespace) {
      json[property] = value;
    } else {
      if (!json[namespace]) {
        json[namespace] = {};
      }

      json[namespace][property] = value;
    }
  }

  return json;
}

export function findProperty(categories, name) {
  let match = [];

  categories.forEach((category, categoryIndex) => {
    const propertyIndex = category.properties.findIndex(
      (property) => property.name === name
    );

    if (propertyIndex !== -1) {
      match = [categoryIndex, propertyIndex];
    }
  });

  return match;
}

export function updateDependencies(categories, changed) {
  return categories.map((category) => {
    const properties = category.properties.map((property) => {
      if (property.name === changed.dependency.name) {
        const disabled = changed.dependency.condition(changed.target);

        return {
          ...property,
          warning: disabled ? changed.dependency.description : null,
          disabled,
        };
      }

      return property;
    });

    return { ...category, properties };
  });
}
