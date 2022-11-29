function decorator(propertyClass) {
  const fns = Reflect.ownKeys(propertyClass).filter(fn => fn !== "constructor")
  for (const fn of fns) {
    propertyClass[fn] = new Proxy(propertyClass[fn], {
      __proto__: null,
      apply(fn, thisArg, argList) {
        console.log(`[${fn.name}] was called with: ${JSON.stringify(argList)} args`)
        console.time('apply')
        const result = fn.apply(thisArg, argList)
        console.timeEnd('apply')
        return result;
      }
    })
  }
}


class Database {
  person = new Proxy({ name: ''}, {
    set: (currentContext, propertyKey, newValue) => {
      // console.log({
      //   currentContext,
      //   propertyKey,
      //   newValue
      // })
      currentContext[propertyKey] = newValue
      return true
    }
  })

  constructor() {
    decorator(Database.prototype)
  }

  delete() {

  }

  create() {
    // console.log('creating...')
    let counter = 1e5
    for (let i; i <= counter; i++);
    this.person.name = 'test'
    return 'created!'
  }
}

const database = new Database()
console.log('create response', database.create({ user: 'rodrigo' }))
console.log('person', database.person)