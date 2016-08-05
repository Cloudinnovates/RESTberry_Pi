import { Component }    from '@angular/core';
import { APICompo }     from './imports/api/api.compo.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.compo.html',
  directives: [APICompo]
})
export class AppCompo {}
