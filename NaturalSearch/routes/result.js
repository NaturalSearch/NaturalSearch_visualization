var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://kunze-vista-teal-jess.graphstory.services/", neo4j.auth.basic("kunze_vista_teal_jess", "MPSbPSW1AuQX5B49eQOPnKPD8Q"));
var session = driver.session();

/* GET users listing. */
router.get('/', function(req, res, next) {
search_result = req.query.q;

 session
    .run("match (project:Nó_Projeto) where (any(prop in keys(project) where tostring(project[prop]) =~ '(?i).*"
    + search_result + ".*' )) RETURN project ")
 .then(function(result){
  var list_result = [];
  result.records.forEach(function(record){   
    list_result.push({pronac: record._fields[0].properties.PRONAC,
                     nome: record._fields[0].properties.nome,
                     segmento: record._fields[0].properties.segmento,
                     proponente: record._fields[0].properties.proponente
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