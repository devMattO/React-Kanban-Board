const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kanban');
const db = mongoose.connection;
const Promise = require('mpromise');

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log("Hi mongoose!");
});

var cardSchema = mongoose.Schema({
  Title: String,
  Priority: String,
  Created_By: String,
  Assigned_To: String
});

// kittySchema.methods.speak = function() {
//   var greeting = "Hi I'm " + this.name;
//   console.log(greeting);
// };
var Card = mongoose.model('cards', cardSchema);

var newCard = new Card();
newCard.Title = 'card title';
newCard.Priority = 'somehting about Priority';
newCard.Created_By = 'matt';
newCard.Assigned_To = 'dat boi';

// var silence = new Kitten({ name: "Silence" });
// console.log(silence.name);


// // var Kitten = mongoose.model('Kitten', kittySchema);

// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak();

newCard.save((err) => {
  if(err) return console.error(err);
});

// Kitten.find({name: /^Fluff/ }, ()=>{});

app.use(express.static('public'));

 app.listen(3000, () => {
  console.log("We did it Reddit!");
});