import { Meteor }     from 'meteor/meteor';
import { Mongo }      from 'meteor/mongo';
import { SimpleRest } from 'meteor/simple:rest';

import { Quotes }     from '../collections/quotes';

// Publication filtering the Quotes Collection (collections/quotes) access
Meteor.publish('quotes', function() {
  if (this.userId)
    return Quotes.find({}, {sort: {author: 1} });

  throw new Meteor.Error('Error: you have to be logged in');
});
