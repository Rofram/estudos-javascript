import { ajax } from 'rxjs/ajax';
import { map, concatAll } from 'rxjs/operators';
import XMLHttpRequest from 'xhr2';

ajax({
  createXHR: () => new XMLHttpRequest(),
  url: 'https://api.github.com/users/rofram/repos',
  responseType: 'json',
})
  .pipe(
    map(v => v.xhr.response),
    concatAll(),
    map(repo => repo.full_name)
  )
  .subscribe(console.log)