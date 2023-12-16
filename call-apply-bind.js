"use strict";

function username() {
  return "my username";
}

// .call() e .apply() -> executam a função
console.log(username.call());
console.log(username.apply());
// .bind() cria uma nova referência da função (cópia)
console.log(username.bind() === username); // não são iguais

function User(name) {
  // função construtora
  this.name = name;
  return this;
}

User.prototype.getName = function () {
  return this.name;
};

// usando uma função construtora deve se passar a referencia do this quando chamado como função
// const teste1 = User('Rofran') // vai retorna um erro, porque o this dentro da função é undefined (tomar cuidado com strict mode se desativado o this pega referencia do escopo léxico)

// console.log(teste1)

const objetoQualquer = {
  name: "John doe",
};

// a função do .call() é chamar uma função qualquer alterando o this da função
const teste2 = User.call(objetoQualquer, "Rofran");
// a função do .apply() é a mesma coisa que o .call() mas como segundo argumento ele recebe um array para passar argumentos para função
const teste3 = User.apply(objetoQualquer, ["Rofran"]);

console.log(teste3);
