// class MyPromise {

//   constructor(cb) {
//     const resolve = value => {
//       setImmediate(() => this._then?.call(undefined,value));
//     }

//     const reject = value => {
//       setImmediate(() => this._catch?.call(undefined,value));
//     }

//     cb(resolve, reject);
//   }

//   _wrap(cb, resolve, reject) {
//     return value => {
//       try {
//         const output = cb(value);
//         resolve(output);
//       } catch (err) {
//         reject(err);
//       }
//     }
//   }

//   then(cb) {
//     return new MyPromise((resolve, reject) => {
//       this._then = this._wrap(cb, resolve, reject)
//     })
//   }

//   catch(cb) {
//     return new MyPromise((resolve, reject) => {
//       this._catch = this._wrap(cb, resolve, reject)
//     })
//   }
// }

class MyPromisse {
  callbacks = {
    then: [],
    catch: []
  }

  initialCallback;

  resolve = (value) => {
    setImmediate(() => this._then.call(undefined,value));
  }

  reject = (value) => {
    setImmediate(() => this._catch.call(undefined,value));
  }

  constructor(cb) {
    this.initialCallback = cb;
  }

  _wrap(cb, resolve, reject) {
    return value => {
      try {
        const output = cb(value);
        resolve(output);
      } catch (err) {
        reject(err);
      }
    }
  }

  then = (cb) => {
    this.callbacks.then.push(cb)
    return this
  }

  catch = (cb) => {
    this.callbacks.catch.push(cb)
    return this
  }

  run = () => {
    try {
      this.initialCallback(this.resolve, this.reject)
    } catch(err) {
      
    }
  }
}

const testPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw 'erro na promise'
      resolve('Opá')
    } catch (err) {
      reject(err)
    }
  }, 1000)
})

testPromise
  .then(result => {
    console.log(result, 'deu certo')
    return result
  })
  .catch(result => {
    console.log(result, 'deu errado')
  })
