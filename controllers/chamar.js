module.exports = function(app){

  const ChamarController = {

    index: function (req, res) {
      res.render("chamar");
    },
    teste: function (req,res) {
      const emitir = function(req, res, next){
      const notificar = req.query.notificacao || '';
        if(notificar != '')	 {
        io.emit('notificacao', notificar);
        next();
      } else {
          next();
        }
      }
    }
  };
  return ChamarController;
};
