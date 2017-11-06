import mongoose from 'mongoose';
import Review from './review';

const Schema = mongoose.Schema;
let FoodtruckSchema = new Schema({
  name: String,
  typeOfFood: String,
  price: Number,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}] // ref se réfère à la collection

});

module.exports = mongoose.model('Foodtruck', FoodtruckSchema);
