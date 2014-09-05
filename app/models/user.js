//Recargando el modulo models
var models = require('./models'),
	Schema = models.Schema; //Esta libreria permite crear Schemas

//Creando el Schema user
var userSchema = Schema({
	username: 'string',
	twitter: Schema.Types.Mixed
});

//La siguiente linea indica como esta la collection en la base de datos
var User = models.model('user',userSchema);

module.exports = User;
