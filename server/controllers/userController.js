'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
	/*
	Buscar si existe el usuario
	Si existe return null y ver q mirda se hace en el frontend
	no no existe Tomar los datos del jugador o club y los del usuario
	crear un club o jugador
	crear un usuario
	referenciar el usuario al jugador o club
	y luego guardar el club o jugador y dentro de este guardar el usuario
	
	*/
    User.findOne({ 
    	'username': req.body.username },
    	 function(err, user) {
        if (user) {
            res.json(null);
            return;
        } else {

            var newUser = new User({
                username: req.body.username.toLowerCase(),
                email: req.body.email,
                rol: req.body.rol
                provider: 'local'
            });

            newUser.setPassword(req.body.password);

            newUser.save(function(err, user) {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            });
        }

    });

};

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
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
