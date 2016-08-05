import { Meteor }     from 'meteor/meteor';
import { Quotes }     from '../collections/quotes';
import quotesData     from './quotes.data';

// Init Data if (Quotes) Collection is empty
Meteor.startup(() => {
  if (Quotes.find().count() == 0)
    quotesData.forEach(quote => Quotes.insert(quote) );
});
