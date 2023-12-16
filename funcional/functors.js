function SecureType(value) {
  return {
    value,
    invalidType() {
      return this.value === null || this.value === undefined
    },
    map(fn) {
      if (this.invalidType()) return SecureType(null);
      return SecureType(fn(this.value));
    },
    flatMap(fn) {
      return this.map(fn).value;
    }
  }
}

const originalText = 'Esse é um texto'
const resultText = SecureType(originalText)
  .map(text => text.toUpperCase())
  .map(text => `${text}!!`)
  .flatMap(text => text.split('').join(' '))

console.log(originalText);
console.log(resultText);