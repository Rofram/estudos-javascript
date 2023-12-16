/**
 * @fileOverview Maybe monad.
 * @module monad/maybe.monad
 * @description
 * O Maybe Monad é usado para lidar com valores que podem ser nulos ou indefinidos.
 */

class Maybe {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  get isNothing() {
    return this.value === null || this.value === undefined;
  }

  map(fn) {
    if (this.isNothing) {
      return Maybe.of(null);
    }
    return Maybe.of(fn(this.value));
  }

  inspect() {
    const isObject = (obj) => obj && typeof obj === "object";
    const isArray = (arr) => Array.isArray(arr);
    const isFunction = (fn) => typeof fn === "function";
    const isNullOrUndefined = (value) => value === null || value === undefined;
    switch (true) {
      case isObject(this.value):
        return `Just(${JSON.stringify(this.value)})`;
      case isArray(this.value):
        return `Just(${JSON.stringify(this.value)})`;
      case isFunction(this.value):
        return `Just(${this.value.toString()})`;
      case isNullOrUndefined(this.value):
        return `is Nothing...`;
      default:
        return `Just(${this.value})`;
    }
  }
}

// Exemplo de uso
const user = {
  name: "Rofran",
  age: 28,
  address: {
    street: "Rua 1",
    number: 123,
  },
};

const maybeUser = Maybe.of(user);
const maybeStreet = maybeUser.map((user) => user.address);
console.log(maybeStreet.inspect());
const maybeNumber = maybeStreet.map((address) => address.number);
console.log(maybeNumber.inspect());

// Exemplo de uso com null
const maybeNull = Maybe.of(null);
const maybeNullStreet = maybeNull.map((user) => user.address);
console.log(maybeNullStreet.inspect());
const maybeNullNumber = maybeNullStreet.map((address) => address.number);
console.log(maybeNullNumber.inspect());
