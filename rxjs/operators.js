// Os dois tipos...

// 1. operadores de Criação
import { Observable, of, from } from 'rxjs';

// 2. operadores de Encadeamento (Pipeable Op.)
import { last, map } from 'rxjs/operators';

of('Hello World!', 'testando', 'qualquer coisa', 'Ultimo')
  .pipe(
    map(v => `valor gerado foi: ${v}`),
    last()
  )
  // .subscribe(console.log);

function myOf(...elements) {
  return new Observable(subscriber => {
    elements.forEach(element => {
      subscriber.next(element);
    })
    subscriber.complete();
  })
}

function myFirst() {
  return (obsSource) => {
    return new Observable(subscriber => {
      obsSource.subscribe({
        next(v) {
          subscriber.next(v);
          subscriber.complete();
        }
      })
    })
  }
}

function myLast() {
  return (obsSource) => {
    return new Observable(subscriber => {
      let lastValue;
      obsSource.subscribe({
        next(v) {
          lastValue = v;
        },
        complete() {
          if (lastValue !== undefined) {
            subscriber.next(lastValue)
          }
          subscriber.complete()
        }
      })
    })
  }
}

from([1,2,3,4,5])
  .pipe(myLast())
  // .subscribe(console.log)


function endsWith(content) {
  return createPipeableOperator(subscriber => ({
    next(value) {
      if (Array.isArray(value)) {
        subscriber.next(value.filter(el => el.endsWith(content)))
      }else if (value.endsWith(content)) {
        subscriber.next(value);
      }
    },
  }))
}

of(['Ana Silva', 'Maria Silva', 'Pedro Rocha'])
  .pipe(
    endsWith('Silva')
  )
  .subscribe(console.log)

function createPipeableOperator(operatorFn) {
  return (sourceObs) => new Observable(subscriber => {
    const defaultOperatorOptions = {
      next: (value) => {
        subscriber.next(value)
      },
      error(error) {
        subscriber.error(error);
      },
      complete() {
        subscriber.complete();
      }
    }
    const operatorOptions = {
      ...defaultOperatorOptions,
      ...operatorFn(subscriber)
    }
    sourceObs.subscribe(operatorOptions)
  })
}