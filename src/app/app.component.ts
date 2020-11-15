import { Component } from '@angular/core';
import {Service1} from './service1.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-angular-app';
  constructor(private service1:Service1){

  }
  sayHello(){
    console.log("hello");
    this.service1.rxObs().subscribe();
  }
}
