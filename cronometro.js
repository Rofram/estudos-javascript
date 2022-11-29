const countTime = new Date()

function contador(interval) {
  const now = new Date()
  const distance = new Date(countTime - now)

  const hour = String(distance.getHours()).padStart(2,"0")
  const minutes = String(distance.getMinutes()).padStart(2,"0")
  const seconds = String(distance.getSeconds()).padStart(2,"0")

  console.log(`${hour}:${minutes}:${seconds}`)

  if (hour == '00' && minutes == '00' && seconds == '00') {
    clearInterval(interval)
  }
}

const meuInterval = setInterval(() => {
  contador(meuInterval)
}, 1000)