module.exports = function(app){

  const Pacientes = app.models.paciente;

  const PacienteController = {

    //busca todos os pacientes
    lista: function (req, res) {
      Pacientes.find().exec(function (erro,pacientes) {
        if(pacientes == ""){
          res.status(404);
          res.json({
            "messagem":"não a paciente cadastrado"
          });
        }else{
          res.json(pacientes);
        }
      });
    },

    //cadastra o paciente
    cadastra: function (req,res) {
      const paciente = req.body;
      
      Pacientes.create(paciente, function(erro,objeto) {
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

    //busca o paciente pelo id
    busca: function (req,res) {
        const id = req.params.id;

        Pacientes.findById(id, function (erro, paciente) {
          if(erro){
            res.status(404);
            res.json({
              "messagem":"paciente não cadastrado"
            });
          }else{
            res.json([paciente]);
          }
        });
    }
  };
  return PacienteController;
};
