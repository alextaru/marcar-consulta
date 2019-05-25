module.exports = function (app) {
  const medico = app.controllers.medico;

  app.get('/server/medico', medico.lista)
     .post('/server/medico', medico.cadastrar);
  app.get('/server/medico/:id', medico.busca);
};
