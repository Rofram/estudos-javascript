const obj = {
  level1: { 
    level2: {
      level3: {
        message: "Hello world",
        levelQualquer: "teste"
      }
    }
  }
}

function checkNested(obj, key) {
  function getKeys(obj) {
    const keys = new Set(Object.entries(obj).map(([key, value]) => {
      const valueKeys = typeof value === "object" ? getKeys(value) : [];
      return [key, ...valueKeys];
    }).flat())

    return [...keys];
  }
  const keys = getKeys(obj)

  if (key instanceof RegExp) 
    return keys.some(item => key.test(item))

  return keys.includes(key)
}

console.log(checkNested(obj, 'level3'));