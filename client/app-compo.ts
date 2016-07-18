import { Component }  from '@angular/core';

@Component({
  selector: 'app',
  template: `<h2>Hello World</h2>
             {{info}}`
})
export class AppComponent {
  info = 'from Raspberry Pi and Angular2 - Meteor';
}
