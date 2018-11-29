var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var fs = require('fs');

link = fs.readFileSync('./NEO4J_LINK.txt', 'utf8');
user_name = fs.readFileSync('./USER_NAME.txt', 'utf8');
password = fs.readFileSync('./PASSWORD.txt', 'utf8');

var driver = neo4j.driver(link, neo4j.auth.basic(user_name, password));
var session = driver.session();

/* GET users listing. */
router.get('/', function(req, res, next) {
search_result = req.query.q;

 session
    .run("match (project:Projeto) \
          where (any(prop in keys(project) \
          where tostring(project[prop]) =~ '(?i).*"
    + search_result + ".*' )) RETURN project ")
 .then(function(result){
  var list_result = [];
  result.records.forEach(function(record){   
    list_result.push({nome: record._fields[0].properties.nome,
                     proponente: record._fields[0].properties.proponente,
                     segmento: record._fields[0].properties.segmento
    });
    console.log(list_result); 
  });
  res.render('result', { list_result: list_result , 
      title: 'Express' });
 })
 .catch(function(err){
   console.log(err);
 });

  
});

module.exports = router;