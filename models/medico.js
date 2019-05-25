module.exports = function(app) {
  const Schema = require('mongoose').Schema;

  const medico = Schema({
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
    crm: {
      type: Number
    },
    estadoCrm: {
      type: String
    },
    especialidade: {
      type: String
    }
  });

  return db.model('medicos', medico);
};
