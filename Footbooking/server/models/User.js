'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
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
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    createdOn: { type: Date, default: Date.now},
    rol: String

});

userSchema.methods.setPassword = function (password) {
   // this.salt = crypto.randomBytes(16).toString('hex');
   // this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

userSchema.methods.validPassword = function (password) {
   //var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
   //return this.hash = hash; 
    return bcrypt.compareSync(password, this.password);

};

/*userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000)}, secret
        );
};*/


module.exports = mongoose.model('User', userSchema);
