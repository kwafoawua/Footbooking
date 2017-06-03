var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
     * Cancha Schema
     * @param {string} nombre - Nombre del complejo.
     * @param {string} domicilio - Array de domicilios del Complejo.
     * @param {string} telefono - Telefono del complejo.
     * @param {string} canchas - Array de Canchas del complejo.
     * @param {string} servicios - Serivicios que ofrece el Complejo.
     * @param {string} usuario - Usuario al cual pertenece el complejo.
     */

var canchaSchema = new Schema({

});

module.exports = mongoose.model('Cancha', canchaSchema);