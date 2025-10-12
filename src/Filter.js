import { XMLBuilder, XMLParser } from "fast-xml-parser";

export class Filter {
  /** @type {string[]} */
  #forbidden;
  /** @type {string[]} */
  #required;

  /**
   * @param {string} forbidden
   * @param {string} required
   */
  constructor(forbidden, required) {
    this.#forbidden = csv(forbidden.toLowerCase());
    this.#required = csv(required.toLowerCase());
  }

  /** @param {string} value */
  for(value) {
    const options = { ignoreAttributes: false };
    const xml = new XMLParser(options).parse(value);
    this.#filter(xml?.rss?.channel?.item);
    return new XMLBuilder(options).build(xml);
  }

  /** @param {any} values */
  #filter(values) {
    if (Array.isArray(values)) {
      for (let index = 0; index < values.length; index++) {
        if (!this.#isValid(values[index])) {
          values.splice(index, 1);
          index--;
        }
      }
    }
  }

  /**
   * @param {any} value
   * @param {string} search
   * @returns {boolean}
   */
  #includes(value, search) {
    if (Array.isArray(value)) {
      return value.some((item) => this.#includes(item, search));
    } else if (typeof value === "object" && value) {
      return Object.values(value).some((item) => this.#includes(item, search));
    } else if (typeof value === "string") {
      return value.toLowerCase().includes(search);
    } else {
      return false;
    }
  }

  /** @param {any} value */
  #isValid(value) {
    return (
      (this.#required.length === 0 ||
        this.#required.some((search) => this.#includes(value, search))) &&
      this.#forbidden.every((search) => !this.#includes(value, search))
    );
  }
}

/** @param {string} value */
function csv(value) {
  return value
    .split(",")
    .map((piece) => piece.trim())
    .filter(Boolean);
}
