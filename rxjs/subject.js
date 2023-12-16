import { Observable, Subject } from 'rxjs'

function getObservable() {
  return new Observable(subs => {
    setTimeout(() => {
      console.log('Example #1 Observable...');
      subs.next(Math.random())
      subs.complete()
    }, 1000)
  })
}

const obs = getObservable()

obs.subscribe(console.log)
obs.subscribe(console.log)

function getSubject() {
  const sub = new Subject()
  setTimeout(() => {
    console.log('Example #2 Subject...');
    sub.next(Math.random())
  }, 1000);
  return sub;
}

const subj = getSubject()

subj.subscribe(console.log)
subj.subscribe(console.log)