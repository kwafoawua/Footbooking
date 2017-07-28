'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');


module.exports.login = function(req, res) {
	var provider = req.body.provider;

  passport.authenticate(provider, function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200).json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
