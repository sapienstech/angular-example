import { Component } from '@angular/core';
import {DummyService} from "./dummy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-angular-app';

  myDummyString: string;

  constructor(public dummyService: DummyService) {
  }

  onButtonClick() {
    this.dummyService.dummyCall().subscribe((dummyString) => {
      this.setDummyString(dummyString);
    });
  }

  setDummyString(dummyString) {
    this.myDummyString = dummyString;
  }
}
