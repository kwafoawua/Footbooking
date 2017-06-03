var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
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
	estado: {type: String, default: 'Creado', required: true, enum: ['Creado', 'Vigente']},
	tipoTorneo: {type: String, required: true},
	complejo: { type: ObjectId, ref: 'Complejo' },
	fase: [{
		cant:{type:Number, required: true},
		nombre: {type: String, required: true},
		fechaInicio: {type: Date, default: Date.now, required: true},
		fechaFin: {type: Date, default:Date.now, required: true},
		partido: {type: ObjectId, ref: 'Partido'}

	}]

});

module.exports = mongoose.model('Torneo', torneoSchema);