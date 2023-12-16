import { from } from 'rxjs';

function* generateOdd(qtde) {
  let num = 0;
  while (num <= qtde) {
    if (num % 2 === 0) yield num
    num++
  }
}

from(generateOdd(50))
  .subscribe(console.log)