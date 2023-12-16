/*jshint esversion: 6 */

function range(...args) {
  let newArray = [];

  switch (args.length) {
    case 3:
      if (args[0] > args[1]) {
        for (let i = args[0]; i >= args[1]; i -= Math.abs(args[2])) {
          newArray.push(i);
        }
      } else {
        for (let i = args[0]; i <= args[1]; i += Math.abs(args[2])) {
          newArray.push(i);
        }
      }
      return newArray;
    case 2:
      if (args[0] > args[1]) {
        for (let i = args[0]; i >= args[1]; i--) {
          newArray.push(i);
        }
      } else {
        for (let i = args[0]; i <= args[1]; i++) {
          newArray.push(i);
        }
      }
      return newArray;
    case 1:
      for (let i = 0; i <= args[0]; i++) {
        newArray.push(i);
      }
      return newArray;
    default:
      // throw new Error('Número de parâmetros inválido');
      return [{
        error: 'Parâmetro inválido'
      }];
  }
}

console.log(range(5));
console.log(range(6, 11));
console.log(range(10, 19, 2));
console.log(range(6, 2));
console.log(range(8, -3, 4));
console.log(range());