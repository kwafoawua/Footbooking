var mongoose = require('mongoose');
var Player = mongoose.model('Player');

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
	console.log('POST');
	console.log(req.body);

	var player = new Player({
		name: req.body.name;
		lastName: req.body.lastName, 
		birthDay: req.body.birthDay,
		phoneNumber: req.body.phoneNumber,
		user: req.body.user
	});

	player.save(function(error, player){
		if(error)
			return res.status(500).send(error.message);
		res.status(200).jsonp(player);
	});
};

//PUT - Update a register already exists
exports.updatePlayer = function(req, res){
	Player.findById(req.params.id, function(err, player){
		player.name = req.body.name;
		player.lastName = req.body.lastName;
		player.birthDay = req.body.birthDay;
		player.phoneNumber = req.body.phoneNumber;
		player.user = req.body.user;

		player.save(function(err){
			if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(player);
		});
	});
};

//DELETE - Delete a Player with specified ID
exports.deletePlayer = function(req, res){
	Player.findById(req.params.id, function(err, player){
		player.remove(function(err){
			if(err)
				return res.status(500).send(err.message);
			res.status(200).send();
		}):
	});
};