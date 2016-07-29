const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
const Promise = require('mpromise');

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log("Hi mongoose!");
});

var kittySchema = mongoose.Schema({
  name: String
  // speak: function() {
  //   var greeting = "Hi I'm " + this.name;
  //   console.log(greeting);
  // }
});

kittySchema.methods.speak = function() {
  var greeting = "Hi I'm " + this.name;
  console.log(greeting);
};
var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: "Silence" });
console.log(silence.name);


// var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak();

fluffy.save((err, fluffy) => {
  if(err) return console.error(err);
  fluffy.speak();
});

Kitten.find({name: /^Fluff/ }, ()=>{});

app.use(express.static('public'));

 app.listen(3000, () => {
  console.log("We did it Reddit!");
});