'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var oAuthTypes = [
  'facebook',
  'google',
];
var secret='footbookingsecretcode';
/*** User Schema
 * @param { string } username - Nombre de usuario único requerido.
 * @param { string } password - Password requerida.
 * @param { string } rol - Rol que identifica el tipo de usuario.
 */

var userSchema = new Schema({
    username: { type: String, unique: true, required: true, index: true, lowercase: true },
    //password: { type: String, required: true },
    hash: String,
    //In cryptography, a salt is random data that is used as an additional input to a one-way function that "hashes" a password or passphrase.
    salt: String,
    provider: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    createdOn: { type: Date, default: Date.now},
    rol: String

});
/*
userSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'El campo Email es requerido.');

userSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'El Email ya existe');

userSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, 'El campo Nombre de Usuario es requerido.');

userSchema.path('hash').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, 'La contraseña es requerida.');
*/

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
};

userSchema.methods.validPassword = function (password) {
   var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
   return this.hash = hash; 
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000)}, secret
        );
};


module.exports = mongoose.model('User', userSchema);
