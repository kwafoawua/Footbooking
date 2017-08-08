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
    address: {
        street: { type: String, required: true },
        location: { type: [Number], required: true } //[Lat, Long]
    },
    phoneNumber: {
        phone: String,
        whatsapp: String
    },
    fields: [{ type: ObjectId, ref: 'Cancha' }],
    services: [{
        name: { type: String, required: true },
        description: String
    }],
    user: { type: ObjectId, ref: 'User', required: true },
    socialMedia: {
        facebookId: String,
        twitterId: String,
        instagramId: String,
        snapchatId: String,
        googleId: String
    }
});

clubSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    console.log('Se tiene que borrar el usuario');
    this.model('User').remove({ user: this._id }, next);
    //this.model('Field').remove({ fields: this._id });
    console.log('Se supone que se borra ._.');
});

module.exports = mongoose.model('Club', clubSchema);
