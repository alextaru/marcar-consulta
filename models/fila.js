module.exports = function(app) {
  const Schema = require('mongoose').Schema;

  const fila = Schema({
    paciente_id:{
      type: String
    },
    paciente_nome:{
      type: String
    },
    medico_id:{
      type: String
    },
    medico_nome:{
      type: String
    },
    data:{
      type: Date
    },
    chamando:{
      type: Boolean
    }
  });

  return db.model('filas', fila);
};
