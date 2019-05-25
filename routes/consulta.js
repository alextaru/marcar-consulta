module.exports = function (app) {
  const consulta = app.controllers.consulta;

  app.get('/server/consulta',consulta.lista);
  app.get('/server/consulta/data',consulta.data);
  app.get('/server/consulta/confirma/:id',consulta.confirmar);
  app.post('/server/consulta',consulta.marcar);
};
