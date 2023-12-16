/**
 * @fileOverview Either monad.
 * @module monad/either.monad
 * @description
 * O Either Monad é usado para representar computações que podem retornar um valor correto ou um erro.
 * linguagem de programação funcional não tem exceções, então é usado o Either para representar um erro
 * ou um valor correto.
 * Exemplos de linguagens que usam Either: Haskell, Scala, Rust, Go, Elm, PureScript, etc.
 */

class Either {
  constructor(value, error) {
    this.value = value;
    this.error = error;
  }

  static of(value) {
    return new Either(value, null);
  }

  static right(value) {
    return new Either(value, null);
  }

  static left(error) {
    return new Either(null, error);
  }

  map(fn) {
    if (this.error) {
      return this;
    }
    return Either.of(fn(this.value));
  }
}

// Exemplo de uso
function getUserName(user) {
  if (!user) {
    return Either.left("User not found");
  }
  return Either.right(user.name);
}

const user = {
  name: "Rofran",
  age: 28,
  address: {
    street: "Rua 1",
    number: 123,
  },
};

const maybeUser = getUserName(user);
console.log(
  `getUserName(user) value: ${maybeUser.value} error: ${maybeUser.error}`
);

const maybeUser2 = getUserName();
console.log(
  `getUserName() value: ${maybeUser2.value} error: ${maybeUser2.error}`
);
