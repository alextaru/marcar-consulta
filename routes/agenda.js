module.exports = function (app) {
  const agenda = app.controllers.agenda;

  app.post('/server/agenda', agenda.cadastrar);
  app.get('/server/agenda/medico/:id', agenda.medico);
  app.get('/server/agenda', agenda.listar);

};
