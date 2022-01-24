/* jshint esversion: 6 */

const carrinho = [
  { nome: 'Caneta', qtde: 10, preco: 7.99, fragil: true },
  { nome: 'Impressora', qtde: 0, preco: 649.5, fragil: true },
  { nome: 'Caderno', qtde: 4, preco: 27.1, fragil: false },
  { nome: 'Lapis', qtde: 3, preco: 5.82, fragil: false },
  { nome: 'Tesoura', qtde: 1, preco: 19.2, fragil: true },
];


// fácil de implementar a função map, reduce e filter ------------------------------------------------------------------

function meuMap(array, callback) {
  const newArray = [];

  for (let i in array) {
    newArray.push(callback(array[i], i));
  }

  return newArray;
}

function meuReduce(array, callback, initialValue) {
  let accumulator = initialValue;

  for (let i in array) {
    accumulator = callback(accumulator, array[i], i);
  }

  return accumulator;
}

function meuFilter(array, callback) {
  const newArray = [];

  for (let i in array) {
    if (callback(array[i], i, array)) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

// jeito avançado de implementar a função map, reduce e filter ---------------------------------------------------------

Array.prototype.meuMap = function(callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, array));
  }

  return newArray;
};

Array.prototype.meuReduce = function(callback, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

Array.prototype.meuFilter = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

// jeito mais avançado de implementar a função map, reduce e filter ----------------------------------------------------

Object.defineProperties(Array.prototype, {
  meuFilter: {
    value: function(callback) {
        const newArray = [];

        for (let i in this) {
          if (callback(this[i], i, this)) {
            newArray.push(this[i]);
          }
        }

        return newArray;
      },
      enumerable: false,
      writable: true,
    },
    meuReduce: {
      value: function(callback, initialValue) {
        let accumulator = initialValue ?? this[0];

        for (let i in this) {
          accumulator = callback(accumulator, this[i], i, this);
        }

        return accumulator;
      },
      enumerable: false,
      writable: true,
    },
    meuMap: {
      value: function(callback) {
        const newArray = [];

        for (let i in this) {
          newArray.push(callback(this[i], i, array));
        }

        return newArray;
      },
      enumerable: false,
      writable: true,
    }
  }
);

const PegarProdutos = produto => produto.qtde > 0;
const calcularTotal = (total, produto) => total + (produto.preco * produto.qtde);

let total = carrinho.meuFilter(PegarProdutos).meuReduce(calcularTotal, 0);

console.log(`total da sua compra foi: R$ ${total}`);
