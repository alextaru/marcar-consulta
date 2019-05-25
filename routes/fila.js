module.exports = function (app) {
  const fila = app.controllers.fila;

  app.get('/server/fila', fila.lista);
  app.get('/server/fila/chamar', fila.chamar);
};
