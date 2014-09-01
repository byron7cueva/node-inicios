var express = require('express'), //Framework de desarrollo
swig = require('swig'), //Manejo de Plantillas
morgan = require('morgan'), //Manejo de Logs
bodyParser = require('body-parser'), //Para el manejo solicitudes Post
cookieParser = require('cookie-parser'); //Para el manejo de cookies

var server = express();

//Configuracion para renderear vistas
//Asignando el rendedor de vistas
server.engine('html',swig.renderFile);
//Tipo
server.set('view engine', 'html');
//Indicando donde estan las vistas
server.set('views','./app/views');

//Lineas no usadas
/*var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   	
}*/

//VER PARA QUE SIRVE LA LINEA
//server.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users

//Permite ver todos los logs por consola
server.use(morgan('dev')); 					

//Habilitando las solicitudes post
//Permite obtener las solicitudes post, en los formatos indicados
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
// parse application/vnd.api+json as json
server.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Permite Habilitar las cookies
server.use(cookieParser());

//

server.get('/', function(req, res) {

	//Le indicamos que vista vamos a renderizar
	res.render('home');

});

server.post('/log-in', function(req, res) {

	res.render('Quien es?');
});

server.listen(3000);

//Buscar consolidate node.js en google