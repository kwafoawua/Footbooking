var config = require('./database');
var jwt = require('jsonwebtoken');

module.exports = {

    verifyToken: ( function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if( token ) {

            jwt.verify(token, config.secret, function (err, decoded) {
   
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // all good, continue
                    req.decoded = decoded; 
                    next();
                }
            });

        }  else {

            res.send({ success: false, message: 'No token exists.' });
            
        }
    })

}