var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
     * Torneo Schema
     * @param {string} username - Required username.
     * @param {string} password - Required password.
     * @param {string} role - A role that identifies the type of user.
     */

var torneoSchema = new Schema({
	nombre: {type: String, required: true},
	fechaInicio: {type: Date, required: true},
	fechaFin: {type: Date, required: true},
	estado: {type: String, default: 'Creado', required: true},
	tipoTorneo: {type: String, required: true},
	complejo: { type: Schema.Types.ObjectId, ref: 'Complejo' },
	//fase: [{}]

});

module.exports = mongoose.model('Torneo', torneoSchema);