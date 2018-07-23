var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var mongoose = require('mongoose');

function createResource (req, res) {
  var newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  });
  newItem.save(function (err, newItem) {
    if (err) res.status(500).json(err);
    res.status(201).json({"url": "/items/" + newItem._id, newItem})
  });
}

function createResourceWithId (req, res, id) {
  var newItem = new Item({
    _id: id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  });
  newItem.save(function (err, newItem) {
    if (err) res.status(500).json(err);
    res.status(201).json({"url": "/items/" + newItem._id, newItem})
  });
}

function isValidId (req, res) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return id;
  } else {
    res.status(400).json({
      message: "400 Bad Request",
      body: "ID given is not a valid ObjectID (12-character alphanumeric string)"
    });
    return null;
  }
}

function validateInput (req) {
  if (req.body.quantity)
    req.body.quantity = req.body.quantity.replace(",", ".");
  if (req.body.price)
    req.body.price = req.body.price.replace(",", ".");
}

//---- REST methods. ------------------------------------------------------------
router.get('/', function(req, res, next) {
  Item.find(function (err, allItems) {
    if (err) res.status(500).json(err);
    res.json(allItems);
  });
});

router.get('/:id', function(req, res, next) {
  var id = isValidId(req, res);
  Item.findById(id, function(err, result) {
    if (err) res.status(500).json(err);
    if (result == null) {
      res.status(404).json({message: "404 Not Found"});
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res, next) => {
  validateInput(req);
  createResource(req, res);
});

router.put('/:id', (req, res, next) => {
  var id = isValidId(req, res); //check ID
  if (id == null) {
    return;
  }
  validateInput(req);

  Item.update({_id: id}, req.body, {upsert: true}, (err, rawResponse) => {
    if (err) res.status(500).json(err).end();

    console.log(rawResponse);
  });

  // Item.findById(id, (err, result) => {
  //   console.log(!req.body.name);
  //   if (result != null && !req.body.name && !req.body.quantity && !req.body.price) {
  //     res.status(200).json(result).end();
  //   } else {
  //     result.update(req.body, function(err, writeResult) {
  //       // Try to update the resource
  //       if (err) res.status(500).json(err);
  //       console.log(writeResult);
  //       if (writeResult.n == 0) {
  //         if(req.body.name && req.body.quantity && req.body.price) {
  //           createResourceWithId(req, res, id);
  //         } else {
  //           res.status(400).json({
  //             message: "400 Bad Request",
  //             body: "Insufficient request body parameters."
  //           }).end();
  //         }
  //       }
  //     });
  //   }
  // });
});

router.delete('/:id', (req, res, next) => {
  var id = isValidId(req, res);

  Item.findById(id, (err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    result.remove((err, result) => {
      if (err) res.status(500).json(err);
      res.status(200).json({message: "Record ID " + id + " removed."});
    });
  });
});

module.exports = router;
