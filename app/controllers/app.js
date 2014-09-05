var User = require('../models/user'),
	Post = require('../models/post')
	_ = require('underscore');

var appController = function(server, users) {

	console.log('appController esta cargado');

	//Ejemplos de middleware basicos
	var isntLoggerIn = function (req, res, next) {
		
		//Va utilizar la credencial o uuario de passport
		if(!req.session.passport.user) {
			res.redirect('/');
			return; //Le rompo para que no se ejecute el codigo que sigue
		}

		next(); //Indica que se ejecuta la funcion siguiente
	};

	var getUser = function(req, res, next) {

		//Realizando la busqueda de un usuario en la base de datos que tenga como username = byron7cueva
		// err Objeto que contiene si se a producido un error
		//user es el resultado
		User.findOne({username:req.session.passport.user.username}, function(err, user) {
			//guardo el objeto user en req
			req.user = user;

			//Llamo al siguiente middelware
			next();
		});
	};

	//Los redirect por defecto son de tipo get
	server.get('/app', isntLoggerIn,function(req, res) {

		//Haciendo una consulta de los post, para ello se debe crear un objeto query
		Post.find({})
		.populate('user') //Permite traer el objeto user que esta relacionado al post
		.exec(function(err, posts) {

			//Convertiendo a JSON a cada uno de los post
			var postsAsJson = _.map(posts, function(post) {
				return post.toJSON();
			});

			//Enviando parametros a la vista
			res.render('appTwitter', {
				user: req.session.passport.user,
				users: users,
				posts : postsAsJson
			});
		});
	});

	//Primer middelware verifica si el usario se ha logeado y puede ingresar a la pagina
	//Segundo middelware permite obtener el usuario de la base de datos
	server.post('/app/create-post', isntLoggerIn, getUser, function(req, res) {

		//Creo un nuevo Objeto del Modelo Post
		var post = new Post({
			content : req.body.content,
			user : req.user
		});

		//Almaceno en la base de datos
		post.save(function(err){

			//Verificamos si no existe un error
			if(err) {

				//Enviando un error de 500
				res.send(500, err);
			}

			//Eniando un post cuando alguien a ingresado un nuevo post
			server.io.broadcast('post', {
				content: post.content,
				user: req.user.toJSON()
			});

			res.redirect('/app');
		});

	});
};

module.exports = appController;