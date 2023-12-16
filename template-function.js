function template(strings, ...args) {
  for (const line in strings.raw) {
    const str = strings.raw[line].trim()
    if (str)
      console.log(`${str} ${args[line]}`)
  }
}

template`
  testando 1 + 5 = ${1 + 5}
  outra linha ${true ? 'verdadeiro' : 'falso'}
`

function templateCallback() {
  const [firstArgument, ...rest] = arguments
  let result;
  if (typeof firstArgument === "function") {
    return function (strings, ...args) {
      for (const line in strings.raw) {
        const str = strings.raw[line].trim();
        if (str)
          result += firstArgument(`${str} ${args[line]}\n`);
      }
      return result;
    }
  }

  for (const line in firstArgument.raw) {
    let str = firstArgument.raw[line].trim()
    if (str)
      result += `${str} ${rest[line]}\n`;
  }

  return result;
}

function Gritar(str) {
  return str.toUpperCase()
}

console.log(templateCallback(Gritar)`
  testando ${5 + 3}
  123 ${"echo echo"}
`)