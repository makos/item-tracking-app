var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Item.findAll().then((items) => {
    res.render('index', {
      items: items
    });
  });
});

router.post('/', (req, res) => {
  // models.Item.update({
  //   Amount: req.body.amount,
  //   Price: req.body.price
  // }, {
  //   where: {
  //     id: parseInt(req.body.id)
  //   }
  // }).then(() => {});
  models.Item.update({
    Amount: req.body.amount,
    Price: req.body.price
  }, {
    where: {
      id: req.body.id
    }
  });
  console.log(req.body);
  res.redirect('back');
});

module.exports = router;
