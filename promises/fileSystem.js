const fs = require('fs');
const path = require('path');

function exibirConteudo(caminho) {
  return new Promise((resolve, reject) => fs.readFile(caminho, { encoding: 'utf-8' }, (err, data) => {
    if(err) {
      reject(err)
    } else {
      resolve(data)
    }
  }))
}

const arquivo = path.join(__dirname, '..', 'funcional', 'dados.txt')

exibirConteudo(arquivo)
  .then(console.log)
  .catch(console.log)