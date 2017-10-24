var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(2000);

function handler (req, res) {
  fs.readFile(__dirname + '/socket-client.html',
  function (err, data) {
    
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
    var mensagem = '\nSERVER - Mandando para o cliente;'
    console.log(mensagem);
    socket.emit('evento_1', mensagem);

    socket.on('evento_2', function (mensagemCliente) {
        console.log(mensagemCliente.toString() + ' SERVER - Recebi a resposta do cliente!!! EVENTO_2');
    });

    socket.on('evento_3', function (mensagemCliente) {
        console.log(mensagemCliente.toString() + ' SERVER - Recebi a resposta do cliente!!! EVENTO_3');
    });
});
