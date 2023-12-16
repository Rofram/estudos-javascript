/**
 * @fileOverview IO monad.
 * @module monad/io.monad
 * @description
 * O IO Monad é usado para representar operações de entrada/saída de forma pura.
 * linguagens de programação funcional não tem efeitos colaterais, então é usado o IO Monad
 * para representar operações de entrada/saída.
 * Exemplos de linguagens que usam IO Monad: Haskell, PureScript, etc.
 */

class IO {
  constructor(fn) {
    this.effect = fn;
  }

  static of(a) {
    return new IO(() => a);
  }

  static from(fn) {
    return new IO(fn);
  }

  map(fn) {
    return new IO(async () => {
      const value = this.effect();
      if (value instanceof Promise) {
        return fn(await value);
      }
      return fn(value);
    });
  }

  chain(fn) {
    return fn(this.effect());
  }

  run() {
    return this.effect();
  }
}

// Exemplo de uso
import readline from "readline/promises";

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const io = new IO(() => prompt.question("What is your name? "));
io.map((name) => `Hello ${name}!`)
  .map(console.log)
  .map(() => prompt.close())
  .run();
