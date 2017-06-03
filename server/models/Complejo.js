var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
     * Complejo Schema
     * @param {string} username - Required username.
     * @param {string} password - Required password.
     * @param {string} role - A role that identifies the type of user.
     */

var complejoSchema = new Schema({
	nombre: {type: String, required: true},
	domicilio: {
		calle: {type: String, required: true},
		location : {type: [Number], required: true} //[Lat, Long]
	},
	telefono: String,
	//canchas


});

module.exports = mongoose.model('Complejo', complejoSchema);