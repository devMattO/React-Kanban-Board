'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title : String,
  priority: String,
  status: String,
  createdBy: String,
  assignedTo: String
});

module.exports = mongoose.model('cards', cardSchema);