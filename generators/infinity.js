function* infinityAndBeyond() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

function* take(n, iterable) {
  for (let item of iterable) {
    if (n <= 0) return;
    n--;
    yield item;
  }
}

const taken = [...take(5, infinityAndBeyond())];

console.log("taken", taken);

function* map(iterable, mapFn) {
  for (let item of iterable) {
    yield mapFn(item);
  }
}

const squares = [
  ...take(
    9,
    map(infinityAndBeyond(), (x) => x * x)
  ),
];

console.log("squares", squares);
