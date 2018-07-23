// MongoDB configuration file
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.test.dbpath);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connection to database established");
});

module.exports = db;
