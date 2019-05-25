module.exports = function (app) {
    const Medicos = app.models.medico;

    const MedicoController = {
      lista: function (req,res) {
        Medicos.find().exec(function (erro, medicos) {
          if (medicos == "") {
            res.status(404);
            res.json({
              "messagem":"não a medicos cadastrados"
            });
          }else{
            res.json(medicos);
          }
        });
      },
      cadastrar: function (req, res) {
        const medico = req.body;

        Medicos.create(medico, function (erro, retorno) {
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
      busca: function (req,res) {
        const id = req.params.id;

        Medicos.findById(id, function (erro, medico) {
          if(erro){
            res.status(404);
            res.json({
              "messagem":"medico não cadastrado"
            });
          }else{
            res.json([medico]);
          }
        });
      }
    };

    return MedicoController;
};
