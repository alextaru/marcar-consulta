module.exports = function(app) {
  const Schema = require('mongoose').Schema;

  const agenda = Schema({
    id_medico:{
      type: String
    },
    nome_medico:{
      type: String
    },
    data:{
      type:Date
    },
    quantidade:{
      type:Number
    }
  });
  return db.model('agendas', agenda);
}
