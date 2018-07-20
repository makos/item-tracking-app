var express = require('express');
var router = express.Router();
var models = require('../models');

// Add new record page

router.get('/', function(req, res, next) {
  res.render('add');
});

router.post('/', (req, res, next) => {
  var newItem;
  if(req.body.itemName && req.body.amount && req.body.price) {
    newItem = models.Item.build({
      Name: req.body.itemName,
      Amount: req.body.amount,
      Price: req.body.price
    });
  } else {
    res.status(400).render('bad_req');
  }
  newItem.save();

  res.render('success');
});

module.exports = router;
