function numberInFull(number) {
  const numberString = typeof number === "string" ? number : number.toString();

  if (isNaN(numberString)) throw new Error("parameter is not a number");

  const numbersFull = [
    ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'],
    ['deis', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
    ['vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    ['cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
    ['mil', 'milhão', 'bilhão', 'trilhão', 'quadrilhão', 'quintilhão', 'sextilhão', 'septilhão', 'opilião'],
  ]

  return numberString.trim().replace(/\d/g, (match, index, fullNumber) => {
    switch (fullNumber.length) {
      case 1:
        return numbersFull[0][+match];
      case 2:
        if (Number(fullNumber) < 20)
          return index === 1 ? numbersFull[1][+match] : '';
        return index === 0 ? numbersFull[2][+match - 2] : match !== '0' ? ` e ${numbersFull[0][+match]}` : '';
      case 3:
        if (Number(fullNumber) === 100)
          return index === 0 ? "cem" : ""
        if (index === 0)
          return numbersFull[3][+match - 1]
        if (Number(fullNumber.slice(1)) >= 10 && Number(fullNumber.slice(1)) < 20)
          return index === 2 ? ` e ${numbersFull[1][+match]}` : '';
        return index === 0 ? numbersFull[0][+match] : index === 1 && match !== '0' ? ` e ${numbersFull[2][+match - 2]}` : match !== '0' ? ` e ${numbersFull[0][+match]}` : '';
      case 4:
        return ''
      default:
        return ''
    }
  })
}

for (let index = 0; index <= 999; index++) {
  console.log(numberInFull(index));
}

function ordinalNumberInFull(number) {
  const numberString = typeof number === "string" ? number : number.toString();

  const ordinalNumberFull = [
    ['']
  ]
}