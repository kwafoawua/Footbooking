'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://footbooking:footbooking01@ds119302.mlab.com:19302/footbooking-db', function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error)
    }
    app.listen(port, function() {
        console.log('Example app listening on port 3000!');
    });

});

//HANDLERS

/*Registro*/
app.post('/newRegister', (req, res) => {
    console.log(req.body);

    var newUser = new User({
    		username: req.body.username,
    		password: req.body.password,
    		email: req.body.email,
    		rol: 'Jugador'
    	});
  
    var newPlayer = new Player({
    	name: req.body.name,
    	lastName: req.body.lastName,
    	user: newUser
    });
    newPlayer.save(function (err) {
  		if (err) return console.log(err);

    	 newUser.save(function (err) {
    		if (err) return console.log(err);
    		// thats it!
  		});
    	 console.log('saved');
  	});

  	res.redirect('/');
});
