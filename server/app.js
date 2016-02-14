var io = require('socket.io')();
var Game = require('./game');

var game = new Game();

io.on('connection', function (socket) {

	console.log('User connected');

	socket.on('join', function (user) {
		/*
			aca paso io como argumento porque cuando haga emit quiero que se transmita a todos los conectados
			se puede hacer socket.emit tambien y solo se transmitirá al cliente que se acaba de conectar

		 */

		game.onJoin(io, user);
	});

	socket.on('played', function (move) {

		/*
			aca paso socket también para que vean la diferencía.
		 */
		game.onPlayed(io, socket, move);
	});

	socket.on('disconnect', function () {

	});
});

io.listen(3000);

