'use strict';

const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Card = require('../models/Card');

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


/*=============================================
=                 CRUD ROUTES                 =
=============================================*/
Router.route('/')
  .get( ( req, res ) => {
    Card.find( ( err, cards ) => {
      if (err) res.send(err);
      res.json(cards);
    });
  })
  .post( ( req, res ) => {
    var card = new Card();
    card.title = req.body.title;
    card.priority = req.body.priority;
    card.status = req.body.status;
    card.createdBy = req.body.createdBy;
    card.assignedTo = req.body.assignedTo;
    console.log(req.body.priority,'<----');
    card.save( ( err ) => {
      if (err) res.send(err);
      res.json({ message: 'Card created!' });
    });
  });

Router.route('/:card_id')
  .put( ( req, res ) => {
    Card.findById(req.params.card_id, ( err, card ) => {
      if (err) res.send(err);

      card.title = req.body.title;
      card.priority = req.body.priority;
      card.status = req.body.status;
      card.createdBy = req.body.createdBy;
      card.assignedTo = req.body.assignedTo;

      card.save((err) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: true });
      });
    });
  })
  .delete( ( req, res ) => {
    Card.remove({ _id: req.params.card_id }, ( err, card ) => {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

/*=====  End of CRUD ROUTES  ======*/


  module.exports = Router;