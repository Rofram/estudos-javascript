function Pessoa(data) {
  Object.assign(this, { _name: data.name, _age: data.age });
  Object.defineProperties(this, {
    get name() {
      return this._name;
    },
    set name(value) {
      this._name = value.toUpperCase();
    },
    get age() {
      return this._age;
    },
    set age(value) {
      this._age = value;
    }
  });
}

const pessoa = new Pessoa({ name: 'Luiz' });
console.log(pessoa);