'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Club = mongoose.model('Club');
var User = mongoose.model('User');

/**
 * Create a Club
 */

exports.addClub = function(req, res) {
    User.findOne({
            'username': req.body.username
        },
        function(err, user) {
            if (user) {
                res.json(null);
                return;
            } else {

                var newUser = new User({
                    username: req.body.username.toLowerCase(),
                    email: req.body.email,
                    rol: 'Club'
                    provider: 'local'
                });

                newUser.setPassword(req.body.password);

                var newClub = new Club({
                    name: req.body.club.name,
                    address: req.body.club.address,
                    phoneNumber: req.body.club.phoneNumber,
                    fields: req.body.club.fields || null,
                    services: req.body.club.services || null,
                    user: newUser,
                    socialMedia: req.body.club.socialMedia || null
                });


                newClub.save(function(err) {
                    if (err) return console.log(err);
                    newUser.save(function(err, user) {
                        var token;
                        token = user.generateJwt();
                        res.status(200);
                        res.json({
                            "token": token
                        });
                    });

                    console.log('Se ha guardado');
                });
            }

        });
};
/*exports.addClub = function(req, res) {
    var newUser = new User({
        username: req.body.user.username,
        password: req.body.user.password,
        email: req.body.user.email,
        rol: 'Club'
    });

    var newClub = new Club({
        name: req.body.club.name,
        address: req.body.club.address,
        phoneNumber: req.body.club.phoneNumber,
        fields: req.body.club.fields || null,
        services: req.body.club.services || null,
        user: req.body.club.userObjectId,
        socialMedia: req.body.club.socialMedia || null
    })


    newClub.save(function(err) {
        if (err) return console.log(err);

        newUser.save(function(err) {
            if (err) return console.log(err);
            // thats it!
        });
        console.log('Se ha guardado');
    });

};*/

/**
 * Show the current Club
 */
exports.findById = function(req, res) {

};

/**
 * Update a Club
 */
exports.update = function(req, res) {

};

/**
 * Delete an Club
 */
exports.delete = function(req, res) {

};

/**
 * List of Club
 */
exports.list = function(req, res) {

};
