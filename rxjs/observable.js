import { Observable, noop } from 'rxjs'

const promise = new Promise(resolve => {
  resolve('Promise é bem legal!');
})

// promise.then(console.log)

const observable = new Observable(subscriber => {
  subscriber.next('Observer')
  subscriber.next('é')
  subscriber.next('bem')
  subscriber.next('legal!')
  subscriber.complete()
})

// observable.subscribe(console.log);

const obs = new Observable(subs => {
  subs.next('RxJS')
  subs.next('é')
  subs.next('bem')
  subs.next('poderoso!')

  if (Math.random() > 0.5) {
    subs.complete();
  } else {
    subs.error('Que problema!?!?!')
  }
})

obs.subscribe({
  next: (value) => console.log(`value: ${value}`),
  error: noop, // `noop` função que ignora a chamada (não faz nenhuma operação)
  complete() {
    console.log(`completed at: ${performance.now()}`);
  }
})