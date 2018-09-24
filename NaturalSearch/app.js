// Carregue o módulo http para criar um servidor HTTP.
var http = require('http');
 
// Configura nosso servidor HTTP para responder com Olá mundo
var server = http.createServer(function (request, response) {
  // Define os parâmetros de cabeçalho de resposta
  response.writeHead(200, {"Content-Type": "text/plain"});
  // Envia uma resposta para o cliente com a mensagem Hello World
  response.end("Hello World\n");
});
 
// Define a porta 8000 onde será executado, o ip padrão é 127.0.0.1 / localhost
server.listen(3000);
 
// Imprime uma mensagem no servidor
console.log("Server running at http://localhost:3000/");
