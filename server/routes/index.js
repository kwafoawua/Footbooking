/**
file where the routes are defined
*/
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'footbookingsecretcode',//Again, don’t keep the secret in the code!
  userProperty: 'payload'
});
