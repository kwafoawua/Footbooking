var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Club Schema
 * @param {string} name - Club's name.
 * @param {array} address - Array of Club's addresses.
 * @param {array} phoneNumber - Club's phone number and Whatsapp.
 * @param {Fields} fields - Array of Club's soccer fields.
 * @param {array} services - Club's services.
 * @param {Usuario} user - Club's user.
 */

var clubSchema = new Schema({
    name: { type: String, required: true, index: true },
    address: [{
        street: { type: String, required: true },
        location: { type: [Number], required: true } //[Lat, Long]
    }],
    phoneNumber: [{
        phone: String,
        whatsapp: String
    }],
    fields: [{ type: ObjectId, ref: 'Cancha' }],
    services: [{
        name: { type: String, required: true },
        description: String
    }],
    user: { type: ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Club', clubSchema);
