import { Observable } from 'rxjs'

function between(min, max) {
  if (min > max) [min, max] = [max, min];
  return new Observable(subscriber => {
    Array(max - min + 1).fill().forEach((_, i) => {
      subscriber.next(min + i);
    })
    subscriber.complete();
  })
}

between(4, 10)
  .subscribe(value => console.log(`value = ${value}`))