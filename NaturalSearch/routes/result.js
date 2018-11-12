var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();

/* GET users listing. */
router.get('/', function(req, res, next) {
search_result = req.query.q;

 session
    .run('match (project:Project) where (any(prop in keys(project) where tostring(project[prop]) CONTAINS {title})) RETURN project ',
    {'title':  search_result }
    )
 .then(function(result){
  var list_result = [];
  result.records.forEach(function(record){   
    list_result.push({pronac: record._fields[0].properties.PRONAC,
                     nome: record._fields[0].properties.nome,
                     segmento: record._fields[0].properties.segmento
    });
    //console.log(list_result); 
  });
  res.render('result', { list_result: list_result , 
      title: 'Express' });
 })
 .catch(function(err){
   console.log(err);
 });

  
});

module.exports = router;
