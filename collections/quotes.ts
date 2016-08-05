import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';

// Declare the Mongo.Collection
export const Quotes = new Mongo.Collection('quotes');

// Deny the client direct access to the Collection
Quotes.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})
