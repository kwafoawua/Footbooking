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

//Require Controllers

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());

app.use('/', routesApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


mongoose.connect(configDB.url, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error)
    }
    app.listen(port, function() {
        console.log('Example app listening on port: ' + port);
    });

});
