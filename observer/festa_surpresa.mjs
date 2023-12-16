import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function getAnswer(question) {
  return rl.question(question);
}

function namorada() {
  console.log('N: Apagar as Luzes');
  console.log('N: Pedir silêncio');
  console.log('N: Surpresa!!!');
}

function sindico() {
  console.log('S: Monitorando o barulho!');
}

async function porteiro(...interessados) {
  while (true) {
    const answer = await getAnswer('O namorado chegou? (s/N/q) ')
    if (answer.toLowerCase() === 's') {
      interessados.forEach(obs => obs({ answer }))
    } else if (answer.toLowerCase() === 'q') {
      break;
    }
  }
}

await porteiro(namorada, sindico);
rl.close();