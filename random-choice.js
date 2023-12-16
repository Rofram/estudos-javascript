function choice(...args) {
  return args.flat()[~~(Math.random() * args.flat().length)];
}

const fruits = [
  'banana',
  'morango',
  'uva'
]

console.log(choice(fruits))