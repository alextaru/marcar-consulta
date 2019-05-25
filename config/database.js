const mongoose = require('mongoose');

//caminho do banco
var uri = "mongodb://localhost/marcar";
//var uri = "mongodb://alexandre:mo586358@ds121906.mlab.com:21906/genconsulta"

//coneccao com o banco de dados
global.db = mongoose.connect(uri, {
  useMongoClient: true,
  /* other options */
});

mongoose.connection.on('connected', function() {
  console.log('Banco de dados conectado em '+uri);
});
mongoose.connection.on('error', function (erro) {
  console.log('Banco de dados erro na conexao '+erro);
});
