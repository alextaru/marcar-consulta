module.exports = function(app) {
  const Schema = require('mongoose').Schema;

  var paciente = Schema({
    nome: {
      type: String
    },
    sobrenome: {
      type: String
    },
    dataNascimento: {
      type: Date
    },
    telefone: {
      type: Number
    },
    email: {
      type: String
    },
    estado: {
      type: String
    },
    cidade: {
      type: String
    },
    bairro: {
      type: String

    },
    endereco: {
      type: String
    },
    cartaosus: {
      type: Number
    },
    cpf: {
      type: Number
    }
  });

  return db.model('pacientes', paciente);
};
