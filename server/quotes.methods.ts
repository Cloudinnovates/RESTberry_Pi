import { Meteor }     from 'meteor/meteor';
import { SimpleRest } from 'meteor/simple:rest';
import { Quotes }     from '../collections/quotes';

// Response Options for managing Put Request
SimpleRest.setMethodOptions('put-quote',
{ httpMethod: 'put',
  getArgsFromRequest: function(req) {
    return [req.body._id, req.body.author, req.body.quote];
  }
});

// Response Options for managing Delete Request
SimpleRest.setMethodOptions('del-quote',
{
  httpMethod: 'delete',
  getArgsFromRequest: function(req) {
    return [req.body._id];
  }
})

// Methods handling Post, Put, Delete Responses - from --> client/crud.compo
Meteor.methods({
  'post-quote'(post) {
    let insert = Quotes.insert(post);
    let data = {
                _id: insert,
                author: post.author,
                quote: post.quote
               };

    return data;
  },
  'put-quote'(id, author, quote) {
    let data = { author: author,
                 quote: quote
               };

    Quotes.update({_id: id}, {$set: data });

    data['_id'] = id;
    return data;
  },
  'del-quote'(id) {
    Quotes.remove({_id: id});
    return 'deleted from database API';
  }
});
