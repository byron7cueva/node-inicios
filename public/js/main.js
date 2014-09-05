$(document).ready(function() {

	//Estableciendo la coneccion
	window.io = io.connect();

	//Calback que se ejecuta cuando se establece la coneccion
	io.on('connect', function(socket) {
		console.log('hi');

		//Enviar mensajes al servidor
		io.emit('hello?');
	});

	io.on('saludo', function(data) {
		console.log(data);
	});

	io.on('log-in', function(data) {
		$('#users').append('<li>' + data.username +'</li>');
	});

	io.on('log-out', function(data) {
		
		$('#users li').each(function (i, item) {
			if(item.innerText === data.username) {
				$(item).remove();
			}
		});

	});

	//Escuchando una accion llamada post
	io.on('post', function(data) {
		$('#post').append('<p>'+data.user.username+':'+data.content+'</p>');
	});

});