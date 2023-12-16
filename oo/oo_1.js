// função construtora
function Produto(nome, preco, desc = 0.15) {
  // colocar this torna variável publica
  this.nome = nome
  this.preco = preco
  this.desc = desc

  this.precoFinal = () => {
    return this.preco * (1 - this.desc)
  }

  let privado = "isso esta no escopo da função"
}

const p1 = new Produto('Caneta', 8.5)
console.log(p1.nome);

const p2 = new Produto('Geladeira', 2359)
console.log(p2.preco);
console.log(p2.privado);
console.log(p2.precoFinal());