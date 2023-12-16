// função construtora
function Produto(nome, preco, desc = 0.15) {
  this.nome = nome
  this.preco = preco
  this._desc = desc

  this.precoFinal = () => {
    return this.preco * (1 - this._desc)
  }

  let privado = "isso esta no escopo da função"
}

Produto.prototype.log = function() {
  console.log(`Nome: ${this.nome}, Preço: R$ ${this.preco}`);
}

Object.defineProperty(Produto.prototype, 'desc', {
  get: function() {
    return this._desc
  },
  set: function(novoDesc) {
    if(novoDesc >= 0 && novoDesc <= 1) {
      this._desc = novoDesc
    }
  }
})

Object.defineProperty(Produto.prototype, 'descString', {
  get: function() {
    return `${this._desc * 100}% de desconto`
  },
})

const prod1 = new Produto('Caneta', 8.5)
console.log(prod1.nome);
prod1.log()

const prod2 = new Produto('Geladeira', 2359)
console.log(prod2.preco);
prod2.log()
console.log(prod2.precoFinal());
prod2.desc = 0.99
console.log(prod2.desc);
console.log(prod2.descString);
console.log(prod2.privado);