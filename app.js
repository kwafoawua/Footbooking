'use strict';
//Express
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var logger = require('morgan');

var mongoose = require('mongoose');

var passport = require('passport');

var configDB = require('./server/config/database');

var routesApi = require('./server/routes/index');

var session = require('express-session');

//Require Controllers

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(session({
    secret: "123byunhbsdah12ub",
    resave: false,
    saveUninitialized: false
}));

app.use('/', routesApi);

mongoose.connect(configDB.url, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error)
    }
    app.listen(port, function() {
        console.log('Example app listening on port: ' + port);
    });

});




//HANDLERS

var User = require ("./server/models/User"),
    Player = require("./server/models/Player");

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

/*Login*/
app.post('/signin', function(req, res){
    User.findOne({username:req.body.username, password:req.body.password},
        function(err, docs){
            res.send("Se encontro el usuario");
        });
});