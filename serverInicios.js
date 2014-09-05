var express = require('express');

var server = express();

var messages = []; //Variable para almacenar los parametrso message enviados por el cliente
var responses = []; //Variable para guardar todas las respuestas del servidor

server.get('/', function(request, response) {

	//Agregando un punto de debug en node
	debugger;

	response.send('Hola Mundo');
	
	//Deteniendo la respuesta por 2 segundos
	/*setTimeout(function() {
		//Enviando la respuesta al usuario
		response.send('Hola Mundo');
	}, 2000);*/
});

// /messages Esta url es diferente a la que sigue
//Ya que si que agregamos /messages/alguna_cosa tomaria el segundo como parametro
server.get('/messages', function(req, res) {

	//Enviando la respuesta del array
	//res.send(messages);

	//Hace un reenvio o recarga de la pagina al momento de retornar la respuesta al cliente
	//res.send(messages + '<script>setTimeout(function(){window.location.reload()},1000)</script>');

	responses.push(res);
});

//Esta direccion /messages, va recibir un parametro llamado message
//A su ves vamos a enviar una respuesta agregando el valor enviado en el paramatro message
//Para el envio en el browser es http://localhost:3000/messages/hola
//Respuesta de la solicitud va ser: tu mensaje es hola
server.get('/messages/:message', function(req, res) {

	messages.push(req.params.message);

	responses.forEach(function(res) {

		res.send(messages + '<script>window.location.reload()</script>');

	});

	res.send('tu mensaje es ' + req.params.message);
});

server.get('/supervisor', function(req, resp) {
	resp.send('Es chido Supervisor funciona');
});

server.listen(3000);


//Correr supervuisor
// supervisor server.js

//Buscar la ubicacion de node-inspector
//which node-inspector

//Correr node inspector, indicandole el puerto sobre el cual queremos que corra
// forever /usr/local/bin/node-inspector --web-port=9999 --debug-port=5859

//Habilitando el debuggin a node
// supervisor --debug=5859 server.js