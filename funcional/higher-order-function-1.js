/* jshint esversion: 6 */

/* 
* Functions that operate on other functions,
* either by talking them as arguments or by
* returning them, are called higher-order functions
*/

function combinar(...fns) {
  return function(texto) {
    return fns.reduce((acc, fn) => fn(acc), texto);
  };
}

function gritar(texto) {
  return texto.toUpperCase();
}

function perguntar(texto) {
  return `${texto}???`;
}

function falarLento(texto) {
  return texto.split('').join(' ');
}

function intensivar(texto) {
  return `${texto}!!!!`;
}

let exagerar = combinar(gritar, perguntar, intensivar, falarLento);

console.log(exagerar('Ola, tudo bem'));