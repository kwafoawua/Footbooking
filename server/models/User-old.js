'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var oAuthTypes = [
  'facebook',
  'google',
];
/*** User Schema
 * @param { string } username - Nombre de usuario único requerido.
 * @param { string } password - Password requerida.
 * @param { string } rol - Rol que identifica el tipo de usuario.
 */

var userSchema = new Schema({
    username: { type: String, unique: true, required: true, index: true, lowercase: true },
    //password: { type: String, required: true },
    hashed_password: { type: String, required: true },
    //In cryptography, a salt is random data that is used as an additional input to a one-way function that "hashes" a password or passphrase.
    salt: { type: String, default: '' },
    provider: { type: String, default: '' },
    authToken: { type: String, default: '' },
    email: { type: String, required: true, lowercase: true },
    createdOn: { type: Date, default: Date.now, required: true },
    facebook: {},
    google: {}
    rol: String

});

var validatePresenceOf = function(value){
	if(value && value.length) { 
		return value; } 
	else { return null; }
}

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

  /**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'El campo Email es requerido.');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'El Email ya existe');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, 'El campo Nombre de Usuario es requerido.');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, 'La contraseña es requerida.');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('La contraseña no es válida.'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'username';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

module.exports = mongoose.model('User', userSchema);
