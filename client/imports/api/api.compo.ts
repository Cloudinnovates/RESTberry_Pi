import { Component, OnInit }  from '@angular/core';
import { NgForm }             from '@angular/forms';
import { HTTP }               from 'meteor/http';
import { Meteor }             from 'meteor/meteor';

import { CRUDCompo }          from './crud.compo';

@Component({
  selector: 'api-compo',
  templateUrl: 'client/imports/api/api.compo.html',
  directives: [CRUDCompo]
})
export class APICompo implements OnInit {
  token: string;
  loggedIn: boolean = false;
  register: boolean = false;
  tabs: Object;
  user: Object = {};

  // Init the Login & Register Tabs
  ngOnInit() {
    this.tabs = {tLog: 'active', tReg: ''};
  }

  // Get Request to Access the API - Subscription
  submit(form: any, regORlog: string) {
    let url     = `/users/${regORlog}`;
    let options = { data: { username: form.username, password: form.password }};

    HTTP.post(url, options, (err, res) => {
      if (err)
        throw new Meteor.Error(`>> ERROR ${regORlog}:`, err);

      this.token    = res.data.token,
      this.loggedIn = true,
      this.user     = {};
      console.log('>> RESULT:', res.data);
    });
  }
}
