'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var token = require('../config/database');
var auth = require('../config/auth');
module.exports.checkState = function (req, res) {
    var content = {
        sucess: true,
        message: 'Logueado Correctamente'
    };
    res.send(content);
}
module.exports.login = function (req, res) {
    User.findOne({
        'username': req.body.username
    }, function (err, user) {
        if (err) {
            return res.json(err);
        }
        if (!user) {
            var content = {
                success: false
                , message: 'El usuario no existe'
            };
            return res.status(500).send(content);
        }
        if (!user.validPassword(req.body.password)) {
            var content = {
                success: false,
                message: 'Contrasenia Incorrecta'
            };
            return res.status(500).send(content);
        }
        
       var token = jwt.sign(user, config.secret, {
      expiresIn : 60*60*24
    }); 
        
        var content = {
            user: user,
            success: true,
            message: 'Te has logueado correctamente',
            token: token
        };
        
        res.status(200).send(content);
    })
};
module.exports.getUserById = function (req, res) {}