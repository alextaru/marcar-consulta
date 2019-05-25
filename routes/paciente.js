module.exports = function (app) {
  var paciente = app.controllers.paciente;

  app.get('/server/paciente',paciente.lista);
  app.post('/server/paciente',paciente.cadastra);
  app.get('/server/paciente/:id',paciente.busca);

};
