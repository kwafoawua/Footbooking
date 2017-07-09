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
exports.create = function(req, res) {
	var newUser = new User({
    		username: req.body.user.username,
    		password: req.body.user.password,
    		email: req.body.user.email,
    		rol: 'Club'
    	});
	
	var newClub = new Club({
		name: req.body.club.name,
		address : req.body.club.address,
		phoneNumber: req.body.club.phoneNumber,
		fields: req.body.club.fields || null,
		services: req.body.club.services || null,
		user: newUser,
		socialMedia: req.body.club.socialMedia || null
	})


    newClub.save(function (err) {
  		if (err) return console.log(err);

    	 newUser.save(function (err) {
    		if (err) return console.log(err);
    		// thats it!
  		});
    	 console.log('Se ha guardado');
  	});

};

/**
 * Show the current Club
 */
exports.read = function(req, res) {

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