const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "dados.txt");

function exibirDados(_, data) {
  console.log(data);
}

fs.readFile(filePath, { encoding: 'utf-8' }, exibirDados)