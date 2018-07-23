var mongoose = require('mongoose');

// Item object schema & model

var MaterialSchema = mongoose.Schema({
  name: String,
  dimensions: { width: Number, height: Number },
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('Material', MaterialSchema);
