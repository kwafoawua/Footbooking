var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*** User Schema
 * @param { string } username - Nombre de usuario único requerido.
 * @param { string } password - Password requerida.
 * @param { string } rol - Rol que identifica el tipo de usuario.
 */

var userSchema = new Schema({
    username: { type: String, unique: true, required: true, index: true, lowercase: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    createdOn: { type: Date, default: Date.now, required: true },
    rol: String

});

module.exports = mongoose.model('User', userSchema);
