var express = require('express.io'), //Permite cargar tambien express
swig = require('swig'), //Manejo de Plantillas
morgan = require('morgan'), //Manejo de Logs
bodyParser = require('body-parser'), //Para el manejo solicitudes Post
cookieParser = require('cookie-parser'), //Para el manejo de cookies
passport = require('passport');

var server = express();
server.http().io(); //Permite correr socket.io con express
//Para verificar si se agregado socket.io en el server obserbo desde la url http://localhost:3000/socket.io/socket.io.js

var RedisStore = require('connect-redis')(express.session); //Manejo de sessiones con redis

var users = [];

swig.setDefaults({
	cache: false
});

//Configuracion para renderear vistas
//Asignando el rendedor de vistas
server.engine('html',swig.renderFile);
//Tipo
server.set('view engine', 'html');
//Indicando donde estan las vistas
server.set('views','./app/views');

//Cargar archivos estaticos
server.use(express.static('./public'));


//Usando Plugins
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
server.use(express.session({
	store: new RedisStore({}),
	saveUninitialized: true,
	resave: true,
    secret: 'lolcatz' //Es una palabra unica para el manejo de sessiones, esta puede ser lo que quiera
}));

//Agregando passport a express como un plugin externo
server.use(passport.initialize());

//Agregando instancias de passport a las sessiones
//La siguiente linea siempre debe ir despues de express.session
server.use(passport.session());

//passport requiere de las dos siguientes funciones
//Serializa usuarios
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

//Cargando Controladores
var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');

//Inicializando el Controlador y enviando la instancia server
homeController(server, users);
appController(server, users);

//Connections
var twitterConnection = require('./app/connections/twitter');

twitterConnection(server);

server.listen(3000);
console.log('El servidor esta escuchando en el puerto 3000');

//Buscar consolidate node.js en google