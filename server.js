const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes/home_crud');

/*----------  MONGOOSE ORM SETUP   ----------*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kanban');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connect error:"));
db.once('open', () => {
  console.log("Mongo reporting for duty!");
});

/*----------  SERVER MIDDLEWARE  ----------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/test', Router);

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Our port of call: ${port}`);
});