import { from, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

console.log('antes');

from([1,2,3,4,5,6,7,8,9])
  .pipe(observeOn(asyncScheduler))
  .subscribe(console.log)

console.log('depois');

