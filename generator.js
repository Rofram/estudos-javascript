// function* generator() {
//   console.log('inicio');
//   yield 10
//   yield 20
//   yield 30
//   yield 40
// }

// const g2 = generator()

// for (const i of g2) {
//   console.log('g2', i);
// }

const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

async function* generatorAsync() {
  console.log('inicio');
  for (let i = 0; i < 10; i++) {
      await sleep(1)
      yield 10
  }
  console.log('fim');
}

const run = async () => {
  const asyncGenerator = generatorAsync()
  // const result = await asyncG.next()
  // console.log(result);

  for await (const i of asyncGenerator) {
    console.log("asyncGenerator", i);
  }
}

run()