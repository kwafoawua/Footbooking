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

module.exports.addClub = function(req, res) {
    User.findOne({$or:[ {'username': req.body.username}, {'email': req.body.email}]},
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

/**
 * Show the current Club
 */
module.exports.findById = function(req, res) {
    Club.findById(req.params.ClubId, function(err, clubs){
        if(err)
            return res.send(500. err.message);
        console.log('GET /Club/' + req.params.id);
        res.status(200).json(clubs);
    });
};


/**
* Show all Clubs
*/
module.exports.findAllClubs = function(req, res) {
    Club.find(function(err, clubs) {
        if(err) 
            res.send(500, err.message);
        console.log('GET /clubController');
        res.status(200).json(clubs);
    });
};

/**
 * Update a Club
 */
module.exports.updateClub = function(req, res) {
    Club.findById(req.params.ClubId, function (err, todo) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description;
        todo.price = req.body.price || todo.price;
        todo.completed = req.body.completed || todo.completed;

        // Save the updated document back to the database
        todo.save(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(todo);
        });
    }
});
};

/**
 * Delete an Club
 */
module.exports.delete = function(req, res) {

};

/**
 * List of Club
 */
module.exports.list = function(req, res) {

};
