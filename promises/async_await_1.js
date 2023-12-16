function waitFor(ms, text) {
  return new Promise(resolve => setTimeout(() => {
    console.log(text);
    resolve()
  }, ms));
}


async function executar() {
  console.time('Async/Await')

  await waitFor(1000, '1 seconds')
  console.timeLog('Async/Await')

  await waitFor(2000, '2 seconds')
  console.timeLog('Async/Await')

  await waitFor(3000, '3 seconds')
  console.timeEnd('Async/Await')
}

executar()
