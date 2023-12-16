class MeuArray {
  #items;
  teste = 'opa';
  constructor(items) {
    this.#items = items;

    Object.defineProperties(this, {
      [Symbol.toPrimitive]: {
        value: (hint) => {
          // console.log(hint);
          switch (hint) {
            case 'string':
              return this.#items.join(' ');
            case 'number':
              return this.#items.length
            default:
              return true
          }
        },
        enumerable: false,
      },
      [Symbol.iterator]: {
        value: function* () {
          for (const item of this.#items) {
            yield item;
          }
        },
        enumerable: false,
      }
    })
  }
}

const meuArray = new MeuArray([1,2,3,4,5]);
console.log(`${meuArray}`); // 1 2 3 4 5
console.log(+meuArray); // 5
console.log(meuArray + meuArray); // 2
console.log([...meuArray]); // [1, 2, 3, 4, 5]
console.log({ ...meuArray }); // { teste: 'opa' }
console.log(meuArray); // MeuArray { teste: 'opa' }