import { timer, Subscription } from 'rxjs'

const obs = timer(3000, 500)

const sub1 = obs.subscribe(num => console.log(`#1 Gerou o numero: ${num}`))
const sub2 = obs.subscribe(num => console.log(`#2 Gerou o numero: ${num}`))
// sub1.add(sub2);

const sub = new Subscription()
sub.add(sub1)
sub.add(sub2)

setTimeout(() => {
  sub.unsubscribe()
}, 10000)