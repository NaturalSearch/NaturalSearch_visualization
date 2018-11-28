var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://pat-dorris-springs-black.graphstory.services:7687", neo4j.auth.basic("pat_dorris_springs_black", "sfbzr75A1wvkMnGBWpdn8X5bCPi4q"));
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