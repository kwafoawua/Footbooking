var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
     * Complejo Schema
     * @param {string} nombre - Nombre del complejo.
     * @param {string} domicilio - Array de domicilios del Complejo.
     * @param {string} telefono - Telefono del complejo.
     * @param {string} canchas - Array de Canchas del complejo.
     * @param {string} servicios - Serivicios que ofrece el Complejo.
     * @param {string} usuario - Usuario al cual pertenece el complejo.
     */

var complejoSchema = new Schema({
	nombre: {type: String, required: true, index: true},
	domicilio: [{
		calle: {type: String, required: true},
		location : {type: [Number], required: true} //[Lat, Long]
	}],
	telefono: [{
		fijo: String,
		whatsapp: String
	}],
	canchas: [{type: ObjectId, ref: 'Cancha'}],
	servicios: [{
		nombre:{type: String, required: true},
		descripcion: String 
	}],
	usuario: {type: ObjectId, ref: 'Usuario', required: true}
});

module.exports = mongoose.model('Complejo', complejoSchema);