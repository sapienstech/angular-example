import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {filter, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service1 {
  hey() {
    console.log('say hey');
  }

  rxObs() {
    return of([{id: 1}, {id: 2}]).pipe(
      mergeMap(v => v),
      filter((val) => val.id == 5),
      tap((vv) => console.log('cccc', vv))
    );
  }
}
