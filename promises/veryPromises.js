function GenerateRandomNumber(min, max, ms) {
  if (min > max) [min, max] = [max, min]

  return new Promise(resolve => {
    setTimeout(() => {
      const fator = max - min + 1
      const random = parseInt(Math.random() * fator) + min
      resolve({
        aleatorio: random,
        ms
      })
    }, ms)
  })
}

function generateSeveralRandomNumbers (quantity) {
  return Promise.all(Array.from({ length: quantity }, () => GenerateRandomNumber(1, 60, parseInt(Math.random() * 10000))))
}

generateSeveralRandomNumbers(10)
  .then(console.log)