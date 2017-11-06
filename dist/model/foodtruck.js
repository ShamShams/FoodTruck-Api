'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var FoodtruckSchema = new Schema({
  name: String,
  typeOfFood: String,
  price: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // ref se réfère à la collection

});

module.exports = _mongoose2.default.model('Foodtruck', FoodtruckSchema);
//# sourceMappingURL=foodtruck.js.map