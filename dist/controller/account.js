"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _account = require("../model/account");

var _account2 = _interopRequireDefault(_account);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _authMiddleware = require("../middleware/authMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // route pour créer un compte
  api.post('/register', function (req, res) {
    _account2.default.register(new _account2.default({ username: req.body.email }), req.body.password, function (err, account) {
      if (err) {
        return res.status(500).send('An error occured: ' + err);
      }
      _passport2.default.authenticate('local', {
        session: false
      })(req, res, function () {
        res.status(200).send('Successfully created new account');
      });
    });
  });

  // '/account/login'
  api.post('/login', _passport2.default.authenticate('local', {
    session: false,
    scope: []
  }), _authMiddleware.generateAccessToken, _authMiddleware.respond);
};
//# sourceMappingURL=account.js.map