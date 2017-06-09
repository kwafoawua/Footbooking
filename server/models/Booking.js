var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Booking Schema
 * @param {string} nombre - Nombre del complejo.
 * @param {string} domicilio - Array de domicilios del Complejo.
 * @param {string} telefono - Telefono del complejo.
 * @param {string} canchas - Array de Canchas del complejo.
 * @param {string} servicios - Serivicios que ofrece el Complejo.
 * @param {string} usuario - Usuario al cual pertenece el complejo.
 */

var bookingSchema = new Schema({
    date: { type: Date, default: Date.now },
    field: { type: ObjectId, ref: 'Field', required: true },
    bookingDate: { type: Date, required: true },
    status: { type: String, default: 'Creado', required: true, enum: ['Creado', 'Vigente'] }, //modificar con los estados verdaderos
    payment: Pago
    player: {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: Number, required: true },
        phoneNumber: String,
        birthDate: Date
    },
    regularBooking: { type: Boolean, required: true },
    endingDateRegularBooking: Date

});

module.exports = mongoose.model('Booking', bookingSchema);
