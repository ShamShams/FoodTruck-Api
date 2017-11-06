'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passeportLocalMongoose = require('passeport-local-mongoose');

var _passeportLocalMongoose2 = _interopRequireDefault(_passeportLocalMongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Account = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }

});

Account.plugin(_passeportLocalMongoose2.default);
module.exports = _mongoose2.default.model('Account', account);
//# sourceMappingURL=Account.js.map