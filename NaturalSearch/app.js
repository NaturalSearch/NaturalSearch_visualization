// Carregue o módulo http para criar um servidor HTTP.
var http = require('http');
//file sistem
var fs = require('fs');

//banco de dados
var express = require('express');
var path = require ('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j =require('neo4j-driver').v1;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
 
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','suaSenhaDoNeo4jAqui'));
var session = driver.session();

app.get('/', function(req,res){
  session
      .run('MATCH(n:Movie) RETURN n LIMIT 25')
      .then(function(result){
          var movieArr = [];
          result.records.forEach(function(record){
              movieArr.push({
                title: record._fields[0].properties.title,
                tagline: record._fields[0].properties.tagline
            });
          });

          session
              .run('MATCH(n:Person) RETURN n LIMIT 25')
              .then(function(result2){
                 var personArr = [];
                result2.records.forEach(function(record){
                    personArr.push({
                      born: record._fields[0].properties.born.low,
                      name: record._fields[0].properties.name
                });
              });

              res.render('index',{
                movies: movieArr,
                person: personArr

              });
            })

      .catch(function(err){
          console.log(err);

      });
    })

    .catch(function(err){
      console.log(err);
    });

});

// Configura nosso servidor HTTP para responder com Olá mundo
/*function onRequest(request, response) {
  // Define os parâmetros de cabeçalho de resposta
  response.writeHead(200, {"Content-Type": "text/html"});
  // fs.readFile('./search.html', null, function(error, data){
    if(error){
      response.writeHead(404);
      response.write('File not found!');
    } else {
      response.write(data);
    }
    // Envia uma resposta para o cliente com a mensagem Hello World
    response.end();
  };
//};*/

// Define a porta 3000 onde será executado, o ip padrão é 127.0.0.1 / localhost
app.listen(3000);
 
// Imprime uma mensagem no servidor
console.log("Server running at http://localhost:3000/");

module.exports =app;
// Open the full screen search box 
//function openSearch() {
//  document.getElementById("myOverlay").style.display = "block";
//}

// Close the full screen search box 
//function closeSearch() {
//  document.getElementById("myOverlay").style.display = "none";
//}