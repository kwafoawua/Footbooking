var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Service Schema
 * @param {string} nombre - Nombre del complejo.
 * @param {string} domicilio - Array de domicilios del Complejo.
 * @param {string} telefono - Telefono del complejo.
 * @param {string} canchas - Array de Canchas del complejo.
 * @param {string} servicios - Serivicios que ofrece el Complejo.
 * @param {string} usuario - Usuario al cual pertenece el complejo.
 */

var serviceSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    type: String,

});

module.exports = mongoose.model('Service', serviceSchema);
