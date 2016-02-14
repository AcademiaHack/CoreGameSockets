/*
 * Estoy usando readline-sync porque estoy interesado en frenar la ejecución del programa
 * desarrollando para backend con javascript esto sería mala idea,
 * como es un programa de consola este es un caso especial.
 */

var readLineSync = require('readline-sync');


var socket = require('socket.io-client')('http://localhost:3000');

var user = {
	name: "",
	isMe: function (user) {
		return this.name === user.name;
	}
};

socket.on('connect', function () {
	console.log('connected');

	user.name = readLineSync.question('Name: ');

	socket.emit('join', user);

});

socket.on('joined', function (userJoined) {

	if (user.isMe(userJoined)) {
		console.log('you have joined');
	} else {
		console.log('user ' + userJoined.name + ' has joined');
	}

});

socket.on('turn', function (userTurn) {

	if (user.isMe(userTurn)) {

		var move = readLineSync.question('Play: ', {defaultInput: 'a1'});
		socket.emit('played', {name: user.name, move: move});

	} else {
		console.log('user '+ userTurn.name + ' is playing');
	}

});


socket.on('none', function () {
	// channel didactico, acá pueden ver que se puede transmitir solo a un cliente.
	console.log('none');
});





