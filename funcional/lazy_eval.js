function eager(a, b) {
  // heavy process
  const future = Date.now() + 2500;
  while (Date.now() < future) {}

  const value = Math.pow(a, 3);
  return value + b;
}

function lazy(a) {
  // heavy process
  const future = Date.now() + 2500;
  while (Date.now() < future) {}

  const value = Math.pow(a, 3);
  return (b) => value + b;
}

console.time('eager function');
console.log(eager(3, 100));
console.log(eager(3, 200));
console.log(eager(3, 300));
console.timeEnd('eager function');

console.time('lazy function');
const lazyEval = lazy(3);
console.log(lazyEval(100));
console.log(lazyEval(200));
console.log(lazyEval(300));
console.timeEnd('lazy function');