module.exports = function(app) {
  const Consultas = app.models.consulta;
  const FiLas = app.models.fila;
  const Agenda = app.models.agenda;
  const moment = require('moment');

  const ConsultaController = {

    //busca as consultas marcadas
    lista: function(req, res) {

      Consultas.find().exec(function(erro, consultas) {
        if (consultas == "") {
          res.status(404);
          res.json({
            "messagem": "não a consultas marcadas"
          });
        } else {
          res.json(consultas);
        }
      });
    },

    data: function(req, res) {
      const dataAgora = moment(new Date).format('YYYY-MM-DD');

      Consultas.find({data:{$lt:dataAgora}}).exec(function (erro,del) {
        if(erro){
          res.status(500).json({
            "messagem": "erro ao remover"
          });
        }
        if(del){
           del.forEach(function (item) {
             Consultas.findByIdAndRemove(item._id,function (erro,removido) {
               if (erro){
                 res.status(500).json({
                   "messagem": "erro ao remover"
                 });
               }
             });
           });
         }

        Consultas.find({$or:[{data:dataAgora+" 15:00:00.000Z"},{data:dataAgora+" 09:00:00.000Z"}]}).exec(function(erro, consultas) {
          if (consultas == "") {
            res.status(404);
            res.json({
              "messagem": "não a consultas marcadas"
            });
          } else {
            res.json(consultas);
          }
        });
      });
    },

    confirmar: function(req, res) {
      const id = req.params.id;
      const dataAgora = moment(new Date).tz("America/Sao_Paulo").format('YYYY-MM-DD');

      Consultas.findByIdAndRemove(id, function(erro, consulta) {
        if (erro) {
          res.status(404).json({
            "messagem": "consulta não cadastrado"
          });
        } else {
          const pacienteFila = {
            paciente_id: consulta.paciente_id,
            paciente_nome: consulta.paciente_nome,
            medico_id: consulta.medico_id,
            medico_nome: consulta.medico_nome,
            data: new Date(),
            chamando:false
          };

          FiLas.create(pacienteFila, function(erro, retorno) {
            if (erro) {
              res.status(500);
              res.json({
                "messagem": "erro ou adicionar na fila"
              });
            }
          });

          const dataAgora = moment(new Date).format('YYYY-MM-DD');

          Consultas.find({$or:[{data:dataAgora+" 15:00:00.000Z"},{data:dataAgora+" 09:00:00.000Z"}]}).exec(function(erro, consultas) {
            if (consultas == "") {
              res.status(404);
              res.json({
                "messagem": "não a consultas marcadas"
              });
            } else {
              res.json(consultas);
            }
          });
        }
      });
    },

    marcar: function(req, res) {
      const consulta = req.body;
      const gravar = {
        "paciente_id": consulta.paciente_id,
        "paciente_nome": consulta.paciente_nome,
        "medico_id": consulta.medico_id,
        "medico_nome": consulta.medico_nome,
        "data": consulta.data
      };

      Consultas.create(gravar, function(erro, retorno) {
        if (erro) {
          res.status(500);
          res.json({
            "messagem": "erro ou marcar"
          });
        } else {
          Agenda.findById(consulta.consulta_id, function(erro, agenda) {
            if (erro) {
              res.status(404);
              res.json({
                "messagem": "agenda não cadastrado"
              });
            } else {
              agenda.quantidade--;
              agenda.save(function () {
                res.status(200);
                res.json({
                  "messagem": "marcado com sucesso"
                });
              });
            }
          });
        }
      });
    }
  };
  return ConsultaController;
};
