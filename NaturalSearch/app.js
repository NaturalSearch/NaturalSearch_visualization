// Carregue o módulo http para criar um servidor HTTP.
var http = require('http');
//file sistem
var fs = require('fs');
 
// Configura nosso servidor HTTP para responder com Olá mundo
function onRequest(request, response) {
  // Define os parâmetros de cabeçalho de resposta
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('./search.html', null, function(error, data){
    if(error){
      response.writeHead(404);
      response.write('File not found!');
    } else {
      response.write(data);
    }
    // Envia uma resposta para o cliente com a mensagem Hello World
    response.end();
  });
};
// Define a porta 3000 onde será executado, o ip padrão é 127.0.0.1 / localhost
http.createServer(onRequest).listen(3000);
 
// Imprime uma mensagem no servidor
console.log("Server running at http://localhost:3000/");

// Open the full screen search box 
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

// Close the full screen search box 
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}