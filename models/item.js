var mongoose = require('mongoose');

// Item object schema & model

var ItemSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);
