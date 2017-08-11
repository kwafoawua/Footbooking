/**
file where the routes are defined
*/
var express = require('express');
var jwt = require('express-jwt');
var path = require('path');
var auth = jwt({
  secret: 'footbookingsecretcode',//Again, don’t keep the secret in the code!
  userProperty: 'payload'
});

var route = express.Router();
var clubController = require('../controllers/clubController.js');
var userController = require('../controllers/userController.js');

/*route.route('*').
get(function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));});*/
    
route.route('/complejos')  
  .get(clubController.findAllClubs);

route.route('/register-club')
  .post(clubController.addClub);

route.route('/complejo/:id')  
  .get(clubController.findById)
  .put(clubController.updateClub)
  .delete(clubController.deleteClub);

route.route('/login')  
  .post(userController.login);

route.route('/check-state', auth.verifyToken)
.get(userController.checkState);

route.get('/').get(function (req, res) {
	console.log('Pagina principal');
});
module.exports = route;

