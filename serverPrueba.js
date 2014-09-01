//Cargando la libreria express, la misma que debe estar agregada como dependencia en nuestro proyecto
var express = require('express');

//Inicializando una isntancia del Servidor
var server = express();

//Le decimos que debe hacer el servidor ante una solicitud get
// '/' Indicamos la ruta en esta caso la raiz
// La solicitud va ha ser atendida a travez de una funcion que recibe como parametros
// el request y el response
server.get('/', function(request, response) {

	console.log('Ha recibido una solicitud');

	//Le decimos que como respuesta envie una cadena 'Hola'
	response.send('Hola');

});

//Indicamos al servidor en que puerto va escuchar las solicitudes
server.listen(3000);

console.log('El Servidor se encuentra listo y escuchando desde el puerto 3000');