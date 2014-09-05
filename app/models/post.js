//Es necesario contar con lo siguiente para poder crear un schema
//Models
//Schema
var models = require('./models'),
	Schema = models.Schema;

//Creando el Schema de la collection
//Generar el eschema con la definicion
var PostSchema = Schema({
	content : 'string',
	user : { //Creando un campo con referencia a otro modelo
		type : Schema.Types.ObjectId,
		ref : 'user'
	}
});

//Creando el modelo
var Post = models.model('post', PostSchema);

module.exports = Post;