const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const load = require('express-load');
const port = process.env.PORT || 3000;
const http = require('http').Server(app);
const server = require('http').createServer(app).listen(4555)
const io = require('socket.io').listen(server)
const router = express.Router();



//configuracao do banco de dados
require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


load('models').then('controllers').then('routes').into(app);
//load('sockets').into(io);


const emitir = function (req, res, next) {
  const notificar = req.query.notificacao || '';
  if(notificar != ''){
    io.emit('notificacao', notificar);
    next();
  }else{
    next();
  }
}
app.use(emitir);
app.use('/api',router);
router.route('/notificar')
  .get(function(req,res){
    res.json({message: "testando essa rota"})
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

http.listen(port, function () {
  console.log('Servidor rodando na porta: '+port);
});
