'use strict';
//Express
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var path = require('path');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var fs = require('fs');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var configDB = require('./server/config/database');
var routesApi = require('./server/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'dist')));
// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions

//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', routesApi);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/*app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/


mongoose.connect(configDB.url, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error)
    }
    app.listen(port, function() {
        console.log('Example app listening on port: ' + port);
    });

});
