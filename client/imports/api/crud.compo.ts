import { Component, Input } from '@angular/core';
import { NgForm }           from '@angular/forms';
import { HTTP }             from 'meteor/http';
import { Meteor }           from 'meteor/meteor';

@Component({
  selector: 'crud-compo',
  templateUrl: 'client/imports/api/crud.compo.html'
})
export class CRUDCompo {
  @Input() token: string; // Receiving the token from Parent Component (api.compo)
  quoteEntered: boolean = false;
  addedToDB: Object = {};
  post: Object = {};
  updated: boolean = false;
  toCompare: string;

  // Post Request - manage by --> server/quotes.methods
  postQuote(form: any) {
    let text = `
    Add your favorite quote
    author: ${form.author}
    quote: ${form.quote}
    `;

    if (confirm(text)) {
      let url = 'methods/post-quote';
      let options = { data: { author: form.author, quote: form.quote }};

      HTTP.post(url, options, (err, res) => {
        if (err)
          throw new Meteor.Error('>> ERROR:', err);

        this.post = {};
        this.quoteEntered = true;
        this.addedToDB = { _id: res.data._id,
                           author: res.data.author,
                           quote: res.data.quote
                         };
        this.toCompare = { author: res.data.author, quote: res.data.quote };

        console.log('>> POST RESULT:', res);
      });
    }
  }

  // Put (update) Request - manage by --> server/quotes.methods
  putQuote(form: any) {
    let postInput   = this.toCompare.author + this.toCompare.quote;
    let updateInput = form.author + form.quote;

    // compare if the update "is not" = to the original input
    if (postInput == updateInput)
      return;

    if (confirm('Update Quote')) {
      let url = 'methods/put-quote';
      let options = { data: { _id: this.addedToDB._id,
                                  author: form.author,
                                  quote: form.quote
                            } };

      HTTP.put(url, options, (err, res) => {
        if (err)
          throw new Meteor.Error('>> ERROR:', err);

        this.updated = true;
        console.log('>> PUT RESULT:', res);
      });
    }
  }

  // Delete Request - manage by --> server/quotes.methods
  deleteQuote() {
    if (confirm('Delete Quote')) {
      let url = 'methods/del-quote';
      let options = { data: { _id: this.addedToDB._id }};

      HTTP.del(url, options, (err, res) => {
        if (err)
          throw new Meteor.Error('>> ERROR:', err);

        this.quoteEntered = false;
        console.log('>> DELETE RESULT:', res);
      });
    }
  }
}
