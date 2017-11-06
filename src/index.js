import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;


let app = express();
app.server = http.createServer(app);

// middlewares

// parse application to json

// app.use(bodyParser.json( {
//   limit : config.bodyLimit //pour sécuriser en surchargeant le champs
// }));
app.use(bodyParser.urlencoded({ extended: true }));

// passport config

app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
Account.authenticate()
));

// pour alléger et passer les objets, pour la performance
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// API routes v1
app.use('/v1', routes);

app.server.listen(config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;
