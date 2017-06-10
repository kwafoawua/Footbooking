var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Player Schema
 * @param {Date} date - Nombre del complejo.
 * @param {Field} field - Array de domicilios del Complejo.
 * @param {Date} bookingDate - Telefono del complejo.
 * @param {String} status - Array de Canchas del complejo.
 * @param {String} payment - Serivicios que ofrece el Complejo.
 * @param {} usuario - Usuario al cual pertenece el complejo.
 */

var playerSchema = new Schema({
	name: {type: String, required: true},
	lastName: {type: String, required: true},
	birthDate: Date,
	phoneNumber: String,
	user: {type: ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Player', playerSchema);
