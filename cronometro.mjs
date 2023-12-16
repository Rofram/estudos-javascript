import { createInterface } from 'node:readline/promises'

const rl = createInterface({ input: process.stdin, output: process.stdout });

const minutes = +(await rl.question('quantos minutos: ')) * 60;

const now = Date.now();

console.log(now + minutes);

const countTime = new Date(now + minutes);

function contador(interval) {
  const now = new Date()
  const distance = new Date(countTime - now);

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