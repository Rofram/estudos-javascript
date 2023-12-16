function capitalizeOnlyEveryOtherLetter(str, memo = []) {
  if (!str || !str.length) return ''

  let letter = str.charAt(0).toLowerCase()
  if (!memo.some(i => i.toLowerCase() === letter)) {
    memo.push(letter)
    letter = letter.toUpperCase()
  }

  return letter + capitalizeOnlyEveryOtherLetter(str.slice(1), memo);
}

console.log(capitalizeOnlyEveryOtherLetter('aaaaaaaaaaaaaaaaa'));

function capitalizeOnlyEveryOtherLetter(str, loopIndex = 0) {
  if (!str || !str.length) return ''

  let char = str.charAt(0).toLowerCase()
  if (loopIndex % 2 === 0) {
    char = char.toUpperCase()
  }

  return char + capitalizeOnlyEveryOtherLetter(str.slice(1), ++loopIndex)
}

console.log(capitalizeOnlyEveryOtherLetter('aaaaaaaaaaaaaaaaa'));
