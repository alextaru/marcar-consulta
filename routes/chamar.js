module.exports = function(app) {
  const Chamar = app.controllers.chamar;

  app.get('/painel', Chamar.index);

}
