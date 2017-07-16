/**
*	Modules dependencies
*/

var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var User = mongoose.model('User');

//GET - Return a player with specified ID
exports.findById = function(require, response){
	Player.findById(require.params.id, function(error, player){
		if(error)
			return response.send(500. error.message)
		console.log('GET /Player/' + require.params.id);
		response.status(200).jsonp(players);
	});
};

//GET - Return all players in the DB
exports.findAllPlayers = function(require, response) {
	Player.find(function(error, players) {
		if(error) 
			response.send(500, error.message);
		console.log('GET /playerController');
		response.status(200).jsonp(players);
	});
};

//POST - Insert a new Player in the DB
exports.addPlayer = function(req, res){
	User.findOne({
			'username': req.body.username
		},
		function(err, user) {
            if (user) {
            	res.json(null);
				console.log('No existe usuario');
            	return;
            } else {
            	var newUser = new User({
            		username: req.body.username.toLowerCase(),
            		email: req.body.email,
            		rol: 'Player'
            		provider: 'local'
            	});

            	newUser.setPassword(req.body.password);

            	var player = new Player({
            		name: req.body.player.name;
            		lastName: req.body.player.lastName, 
            		birthDay: req.body.player.birthDay,
            		phoneNumber: req.body.player.phoneNumber,
            		user: newUser
            	});

            	player.save(function(error, player){
            		if(error) return res.status(500).send(error.message);
            		newUser.save(function(err, user) {
                        var token;
                        token = user.generateJwt();
                        res.status(200);
                        res.json({
                            "token": token
                        });
            		res.status(200).jsonp(player);
            	});
            	console.log('Jugador guardado con exito');


            });
            }
        });
};

//PUT - Update a register already exists
exports.updatePlayer = function(req, res){

	User.findOne({
		'username': req.body.username
	},
	function(err, user) {
		if (!user) {
			res.json(null);
			console.log('No existe usuario');
			return;
		} else {
			Player.findById(req.params.id, function(err, player){
				player.name = req.body.player.name;
				player.lastName = req.body.player.lastName;
				player.birthDay = req.body.player.birthDay;
				player.phoneNumber = req.body.player.phoneNumber;
				player.user = req.body.player.userObjectId;

				player.save(function(err){
					if(err)
						return res.status(500).send(err.message);
					res.status(200).jsonp(player);
				});

				console.log('Jugador modificado con exito');
			};
		});
};

//DELETE - Delete a Player with specified ID
exports.deletePlayer = function(req, res){

	User.findOne({
		'username': req.body.username
	},

	function(err, user){
		if(user){
			res.json(null);
			console.log('No existe usuario');
			return;
		} else {
			Player.findById(req.params.id, function(err, player){
				player.remove(function(err){
					if(err){
						return res.status(500).send(err.message);
						console.log('Ha ocurrido un error, no se ha podido eliminar.')
					} else {
						console.log('Jugador eliminado con exito')
						res.status(200).send();
					}
				});
			});
		}
	};
};