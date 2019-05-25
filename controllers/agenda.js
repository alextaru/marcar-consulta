module.exports = function(app) {
const Agenda = app.models.agenda;
const moment = require('moment');

  const AgendaController = {
    cadastrar: function (req,res) {
        const agenda = req.body;
        const data = moment(agenda.data).format('YYYY-MM-DD '+agenda.horario);

        const salvar = {
          "id_medico" : agenda.id_medico,
          "nome_medico" : agenda.nome_medico,
          "data" : data,
          "quantidade" : agenda.quantidade
        };

        Agenda.create(salvar, function (erro, dados) {
          if(erro){
            res.status(500);
            res.json({
              "messagem":"erro ou cadastrar"
            });
          }else{
            res.status(200);
            res.json({
              "messagem":"cadastrado com sucesso"
            });
          }
        });
    },

    medico: function (req, res) {
      const id = req.params.id;
      const dataConsul = moment(new Date()).format('YYYY-MM-DD');

      Agenda.find({data:{$lt:dataConsul}}).exec(function (erro,del) {
        if(erro){
          res.status(500).json({
            "messagem": "erro ao remover"
          });
        }
        if(del){
           del.forEach(function (item) {
             Agenda.findByIdAndRemove(item._id,function (erro,removido) {
               if (erro){
                 res.status(500).json({
                   "messagem": "erro ao remover"
                 });
               }
             });
           });
         }

         Agenda.find({$and:[{id_medico:id},{quantidade:{$ne:0}}]}).exec(function (erro, agenda) {
           if(erro){
             res.status(500);
             res.json({
               "messagem":"erro ao consultar"
             });
           }else if(agenda == ""){
             res.status(404);
             res.json({
               "messagem":"não a agenda marcada"
             });
           }else{
             res.json(agenda);
           }
         });
      });
    },

    listar: function (req, res) {
      const dataConsul = moment(new Date()).format('YYYY-MM-DD');

      Agenda.find({data:{$lt:dataConsul}}).exec(function (erro,removido) {
        if(erro){
          res.status(500).json({
            "messagem": "erro ao remover"
          });
        }
        if(removido){
          removido.forEach(function (item) {
            Agenda.findByIdAndRemove(item._id,function (erro,del) {
              if (erro){
                res.status(500).json({
                  "messagem": "erro ao remover"
                });
              }
            });
          });
          Agenda.find().exec(function (erro, agendas) {
            if(erro){
              res.status(500).json({
                "messagem": "erro ao listar a agenda"
              });
            }
            if(agendas){
              res.json(agendas);
            }
          });
        }
      });
    }
  };
  return AgendaController;
};
