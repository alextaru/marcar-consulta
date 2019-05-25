module.exports = function(app) {
  const Fila = app.models.fila;
  const moment = require('moment');
  const timezone = require('moment-timezone');
  const request = require('request');

  const FilaController = {
    lista: function(req, res) {
      const dataAgora = moment(new Date).format('YYYY-MM-DD');

      Fila.find({data:{$lt:dataAgora}}).exec(function (erro,del) {
        if(erro){
          res.status(500).json({
            "messagem": "erro ao remover"
          });
        }else if(del){
           del.forEach(function (item) {
             Fila.findByIdAndRemove(item._id,function (erro,removido) {
               if (erro){
                 res.status(500).json({
                   "messagem": "erro ao remover"
                 });
               }
             });
           });
         }

         Fila.find().exec(function(erro, fila) {
           if (fila == "") {
             res.status(404);
             res.json({
               "messagem": "não a fila de pacientes"
             });
           } else {
             res.json(fila);
           }
         });

      });
    },

    chamar: function(req, res) {
      //buscando o primeiro da fila
      Fila.find({chamando:{$ne:true}}).sort({data:1}).limit(1).exec(function(erro, fila) {
        if (erro) {
          res.json({
            "messagem": "fila nao encontrada"
          });
        } else {
          Fila.findById(fila[0]._id).exec(function (erro, retorno) {
            if(erro){
              res.status(500);
              res.json({
                "messagem": "fila nao encontrada"
              });
            }else{
              retorno.chamando = true;
              retorno.save(function() {

                //chamando nome no painel de chamadas
                const endereco = "http://localhost:3000/api/notificar?notificacao="+fila[0].paciente_nome;
                request(endereco, function (error, response, body) {
                    if(error){
                      res.status(500);
                      res.json({
                        "messagem": "erro ao chamar no painel"
                      });
                    }
                });

                //retornando a fila compreta atualizada
                Fila.find().exec(function(erro, objeto) {
                  if (objeto == "") {
                    res.status(404);
                    res.json({
                      "messagem": "não a fila de pacientes"
                    });
                  } else {
                    res.json(objeto);
                  }
                });
              });
            }
          });
        }

        //remove da fila depois de um tempo
        setTimeout(function () {
          Fila.findByIdAndRemove(fila[0]._id,function (erro) {
            if(erro){
              res.status(500);
              res.json({
                "messagem": "erro ao remover"
              });
            }
          });
        },30000);
      });
    }
  };
  return FilaController;
};
