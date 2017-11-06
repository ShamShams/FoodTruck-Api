import mongoose from 'mongoose';
import Foodtruck from './foodtruck';

let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
  title: String,
  text: String,
  foodtruck: {type: Schema.Types.ObjectId, ref: 'Foodtruck'}

});

module.exports = mongoose.model('Review', ReviewSchema);
