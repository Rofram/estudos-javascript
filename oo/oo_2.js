class Produto {

  constructor(nome, preco, desc = 0.15) {
    this._nome = nome
    this.preco = preco
    this.desc = desc
  }

  get nome() {
    return `Produto: ${this._nome}`
  }

  set nome(novoNome) {
    this._nome = novoNome.toUpperCase()
  }

  get precoFinal() {
    return this.preco * (1 - this.desc)
  }
}

const produto1 = new Produto('Caneta', 8.5)
console.log(produto1.nome);

const produto2 = new Produto('Geladeira', 2359)
console.log(produto2.preco);
console.log(produto2.privado);
console.log(produto2.precoFinal);