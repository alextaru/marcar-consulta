module.exports = function(io){
  io.sockets.on("connection", function(client){
    client.on('send-server',function(data){

      const nome = data;

      client.emit('send-client', nome);
    });
  });

}
