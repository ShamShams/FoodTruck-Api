import mongoose from "mongoose";
import { Router } from "express";
import Foodtruck from "../model/foodtruck";
import Review from "../model/review";
import bodyParser from "body-parser";

export default ({ config, db }) => {
  let api = Router();
  // On met les routes et méthodes

  // 'v1/foodtruck/add' Create a foodtruck
  api.post("/add", (req, res) => {
    let newFoodtruck = new Foodtruck();
    newFoodtruck.name = req.body.name;
    newFoodtruck.typeOfFood = req.body.typeOfFood;
    newFoodtruck.price = req.body.price;

    newFoodtruck.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Foodtruck saved successfully"
      });
    });
  });

// 'v1/foodtruck/reviews/add/:id' Add a review by id
  api.post('/reviews/add/:id', (req, res) => {
     Foodtruck.findById(req.params.id, (err, foodtruck) => {
       if (err) {
         res.send(err);
       }
       let newReview = new Review();

       newReview.title = req.body.title;
       newReview.text = req.body.text;
       newReview.foodtruck = foodtruck._id;
       newReview.save((err, review) => {
         if (err) {
           res.send(err);
         }
         foodtruck.reviews.push(newReview);
         foodtruck.save(err => {
           if (err) {
             res.send(err);
           }
           res.json({ message: 'Foodtruck review saved' });
         });
       });
     });
   });
  // 'v1/foodtruck' Get All Foodtrucks
  api.get("/", (req, res) => {
    Foodtruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });
  //'v1/foodtruck/:id' Get a foodtruck by id
  api.get("/:id", (req, res) => {
    Foodtruck.findById({_id: req.params.id}, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });


// 'v1/foodtruck/reviews/:id'  Get review by Id

api.get("/reviews/:id", (req, res) => {
  Review.findById({ foodtruck: req.params.id}, (err, reviews) => {
    if(err) {
      res.send(err);
    }
    res.json(reviews);
  })
});


// 'v1/foodtruck/delete/:id'
api.delete('/:id', (req, res) => {
   Foodtruck.remove({_id: req.params.id}, (err, foodtruck) => {
     if (err) {
       res.send(err);
     }
     Review.remove({foodtruck: req.params.id}, (err, review) => {
       if (err) {
         res.send(err);
       }
       res.json({message: "Foodtruck and Reviews Successfully Removed"});
     });
   });
 });
  return api;
};
