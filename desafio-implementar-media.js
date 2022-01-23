/* jshint esversion: 6 */

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const media = (accumulator, element, index, array) => {
  if (index == array.length - 1) {
    return (accumulator + element) / array.length;
  } else {
    return accumulator + element;
  }

  // index == array.length - 1 ? (accumulator + element) / array.length : accumulator + element; // ternário para retornar o resultado da média
};

const resultado = numeros.reduce(media);
console.log(resultado);
