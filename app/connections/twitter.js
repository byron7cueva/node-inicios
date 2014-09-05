var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');

var twitterConnection = function(server) {

	console.log('twitterConnection ready');

	//Indicarle una estrategia de connecion
	//En Twitter se llaman TwitterStrategy
	//Todas las estrategias de coneccion requieren de dos parametros 1=objeto JSON, 2=Una Funcion
	passport.use(new TwitterStrategy({
		consumerKey: 'HfkNjpXzpfrPuKGFqCU2jiLDt',
		consumerSecret: 'lCSTZNn6YTRCF3jaU8wZS16ex1Ydh4WVKWzH6CZDjjZKiqbQ3p',
		callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
	}, function(token, tokenSecret, profile, done) {
		
		var user = new User({
			username: profile.username,
			twitter: profile
		});

		//Guardando en la base de datos
		user.save(function(err) {
			debugger;

			if(err) {
				done(err, null);
				return;
			}

			done(null, profile); //Indico que todo esta bien y que me guarde a la session el perfil del usuario
		});

	}));

	//Url para el inicio del logeo de un usuario, o autorizacion -- OAUTH estrategia para logearce con servicos estrangeros
	server.get('/auth/twitter', passport.authenticate('twitter'));

	//Una vez que el servidor termine de logear al usuario le indicamos que debe hacer
	server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/?error=algo-fallo'}),
			function(req, res) { //Ingresa aca cuando todo esta correcto y se ha logeado el usuario
				res.redirect('/app');
			}
	);
};

module.exports = twitterConnection;