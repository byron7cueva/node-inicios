var mongoose = require('mongoose');

//Conectando a la base de datos
mongoose.connect('mongodb://localhost/' + 'node_inicios');

module.exports = mongoose;