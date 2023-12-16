const readline = require('readline')

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const textoMenu = `
Ola, seja bem vindo ao sistema de media
Digite 1 para o menu inicial
Digite 2 para o menu de heróis
Digite 3 para o menu de Guerreiros
Digite 0 para sair
`

const questoes = {
  menuInicial: {
    texto: textoMenu,
    fn: menuInicial
  },
  opcao1: {
    texto: 'submenu! Pressione enter para selecionar mais opcoes...',
    fn: opcao1
  }
}

function opcao1(msg) {
  console.log('Nao ha mais opções');
  terminal.close();
}

function menuInicial(msg) {
  const opcao = Number(msg)
  if(isNaN(opcao)) {
    throw "Nao e um numero"
  }
  switch(opcao) {
    case 0:
      console.log('Saindo...')
      terminal.close()
      break
    case 1:
      console.log('menu inicial')
      terminal.question(
        questoes.opcao1.texto,
        questoes.opcao1.fn
      )
      break
    default:
      console.log('opção invalida!')
      terminal.close()
      break
  }
}

terminal.question(
  questoes.menuInicial.texto, 
  questoes.menuInicial.fn
)