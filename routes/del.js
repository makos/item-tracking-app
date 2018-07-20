var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', (req, res) => {
  res.redirect('back');
});

router.get('/:id', (req, res) => {
  if(req.params.id.match(/^[0-9]{1,}$/g)) {
    models.Item.destroy({
      where: {
        id: req.params.id
      }
    });
  }
  res.redirect('back');
})

module.exports = router;
