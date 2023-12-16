/* jshint esversion: 6 */

function getTax(tax) {
  return function(price) {
    return price * (1 + tax);
  };
}

// curring
const taxRJ = getTax(0.0875);
const taxSP = getTax(0.0953);

console.log(taxRJ(25));
console.log(taxSP(25));
console.log(taxRJ(100));
console.log(taxSP(100));

