var express = require('express'), //Framework de desarrollo
swig = require('swig'), //Manejo de Plantillas
morgan = require('morgan'), //Manejo de Logs
bodyParser = require('body-parser'), //Para el manejo solicitudes Post
cookieParser = require('cookie-parser'), //Para el manejo de cookies
session = require('express-session'),
_ = require('underscore'); //Funcionalidades

//var RedisStore = require('connect-redis')(express.session); //Manejo de sessiones con redis

var server = express();
var users = [];

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

//Permite ver todos los logs por consola, cuado el usuario realiza request
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

//Inicializando la session
server.use(session({
	saveUninitialized: false,
	resave: true,
    //store: new RedisStore({}), //Si queremos que el estore de sessiones sea redis
    secret: 'keyboard cat' //Es una palabra unica para el manejo de sessiones, esta puede ser lo que quiera
}));

//Ejemplos de middleware basicos
var isntLoggerIn = function (req, res, next) {

	if(!req.session.user) {
		res.redirect('/');
		return; //Le rompo para que no se ejecute el codigo que sigue
	}

	next(); //Indica que se ejecuta la funcion siguiente
}

var inLoggedIn = function (req, res, next) {
	if(req.session.user) {
		res.redirect('/app');
		return;
	}

	next();
}

//Aplicando un middleware de forma basica
server.get('/', inLoggedIn,function(req, res) {

	//Le indicamos que vista vamos a renderizar
	res.render('home');

});

//Los redirect por defecto son de tipo get
server.get('/app', isntLoggerIn,function(req, res) {
	//Enviando parametros a pa vista
	res.render('app', {
		user: req.session.user,
		users: users
	});
});

server.get('/log-out', function (req, res) {

	//Eliminando un elemento del array users
	users = _.without(users, req.session.user);

	//Destruyendo la session
	req.session.destroy();

	//Redireccionando a Home
	res.redirect('/');
});

server.post('/log-in', function(req, res) {

	users.push(req.body.username);

	//Obteniendo el request del formulario el valor de username
	//Guardando ese valor en session dentro de user
	req.session.user = req.body.username;

	//Redireccionando a otra url
	res.redirect('/app');
});

server.listen(3000);

//Buscar consolidate node.js en google