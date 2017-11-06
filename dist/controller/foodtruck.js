"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _foodtruck = require("../model/foodtruck");

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require("../model/review");

var _review2 = _interopRequireDefault(_review);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  // On met les routes et méthodes

  // 'v1/foodtruck/add' Create a foodtruck
  api.post("/add", function (req, res) {
    var newFoodtruck = new _foodtruck2.default();
    newFoodtruck.name = req.body.name;
    newFoodtruck.typeOfFood = req.body.typeOfFood;
    newFoodtruck.price = req.body.price;

    newFoodtruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Foodtruck saved successfully"
      });
    });
  });

  // 'v1/foodtruck/reviews/add/:id' Add a review by id
  api.post('/reviews/add/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Foodtruck review saved' });
        });
      });
    });
  });
  // 'v1/foodtruck' Get All Foodtrucks
  api.get("/", function (req, res) {
    _foodtruck2.default.find({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });
  //'v1/foodtruck/:id' Get a foodtruck by id
  api.get("/:id", function (req, res) {
    _foodtruck2.default.findById({ _id: req.params.id }, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // 'v1/foodtruck/reviews/:id'  Get review by Id

  api.get("/reviews/:id", function (req, res) {
    _review2.default.findById({ foodtruck: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // 'v1/foodtruck/delete/:id'
  api.delete('/:id', function (req, res) {
    _foodtruck2.default.remove({ _id: req.params.id }, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      _review2.default.remove({ foodtruck: req.params.id }, function (err, review) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Foodtruck and Reviews Successfully Removed" });
      });
    });
  });
  return api;
};
//# sourceMappingURL=foodtruck.js.map