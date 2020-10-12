import {Injectable} from "@angular/core";
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class Service1 {
  hey() {
    console.log('say hey');
  }

  rxObs() {
    return of({}).pipe(
      tap(()=>console.log("cccc"))
    );
  }
}
