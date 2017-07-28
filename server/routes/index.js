/**
file where the routes are defined
*/
var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'footbookingsecretcode',//Again, don’t keep the secret in the code!
  userProperty: 'payload'
});

var route = express.Router();
var clubController = require('../controllers/clubController.js');
var userController = require('../controllers/userController.js');


route.route('/complejos')  
  .get(clubController.findAllClubs)
  .post(clubController.addClub);

route.route('/complejo/:id')  
  .get(clubController.findById)
  .put(clubController.updateClub)
  .delete(clubController.deleteClub);

route.route('/login')  
  .post(userController.login);

route.get('/').get(function (req, res) {
	console.log('Pagina principal');
});
module.exports = route;

