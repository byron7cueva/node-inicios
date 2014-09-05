//Cargando los modulos necesarios
var _ = require('underscore');

//Creando un modulo
var homeController = function(server, users) {
	console.log('homeController esta cargado');

	var isLoggedIn = function (req, res, next) {
	
		if(req.session.passport.user) {
			res.redirect('/app');
			return;
		}

		next();
	};


	server.get('/', isLoggedIn,function(req, res) {

		//Le indicamos que vista vamos a renderizar
		res.render('homeTwitter');

	});

	server.post('/log-in', function(req, res) {
		//Obteniendo el request del formulario el valor de username
		//Guardando ese valor en session dentro de user
		req.session.user = req.body.username;


		//Envio a todos los usuarios disponibles
		server.io.broadcast('log-in',{
			username: req.body.username
		});

		users.push(req.session.user);

		//Redireccionando a otra url
		res.redirect('/app');
	});

	server.get('/log-out', function (req, res) {

		//Eliminando un elemento del array users
		users = _.without(users, req.session.user);

		//Eniviando al cliente por sockwts que usuario se a deslogeado
		server.io.broadcast('log-out', {
			username: req.session.user
		});

		//Destruyendo la session
		req.session.destroy();

		//Redireccionando a Home
		res.redirect('/');
	});
};

//module es como el document.window de un navegador, permite contener las variables globales
//Con exports podemos indicar que es lo que se va ha devolver al momento de hacer un require
module.exports = homeController;