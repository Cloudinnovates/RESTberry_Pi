import { JsonRoutes } from 'meteor/simple:json-routes';
import { Quotes }     from '../collections/quotes';

// Optional Route methods. handling Error & Authentification
JsonRoutes.Middleware
          .use(JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware
          .use(JsonRoutes.Middleware.authenticateMeteorUserByToken);
JsonRoutes.ErrorMiddleware
          .use(RestMiddleware.handleErrorAsJson);

// Protected Route for displaying single Data (_id, author, quote) added
JsonRoutes.add('get', '/publications/quotes/:id', function(req, res, next) {
  if (req.authToken) {
    let idRaw = req.params.id,
        id    = idRaw.slice(1),
        query = Quotes.findOne({_id: id});

    JsonRoutes.sendResult(res, { data: query });
  }

  throw new Meteor.Error('ERROR not allowed');
});
