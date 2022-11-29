function template(strings, ...args) {
  for (const line in strings.raw) {
    if (strings.raw[line].replace(' ', ''))
      console.log(strings.raw[line] + args[line])
  }
}

// template`
//   testando 1 + 5 = ${1 + 5}
//   outra linha ${true ? 'verdadeiro' : 'falso'}
// `

function templateCallback() {
  const [firstArgument, ...rest] = arguments
  let result;
  if (typeof firstArgument === "function") {
    return function (strings, ...args) {
      for (const line in strings.raw) {
        let str = strings.raw[line].replace(' ', '')
        console.dir({str});
        if (str)
          result += firstArgument(str)
      }
      return result;
    }
  }

  for (const line in firstArgument.raw) {
    let str = firstArgument.raw[line].replace(' ', '')
    if (firstArgument.raw[line] && str)
      result += firstArgument.raw[line] + rest[line]
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