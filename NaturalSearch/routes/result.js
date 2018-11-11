var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();

/* GET users listing. */
router.get('/', function(req, res, next) {
  search_result = req.query.q;
 
 var drinks = [
  { name: 'Bloody Mary', drunkness: 3 },
  { name: 'Martini', drunkness: 5 },
  { name: 'Scotch', drunkness: 10 }
  ];
 session
 .run('MATCH (n:Project) RETURN n LIMIT 25')
 .then(function(result){
  var list_result = [];
  result.records.forEach(function(record){   
    list_result.push({pronac: record._fields[0].properties.PRONAC,
                     nome: record._fields[0].properties.nome,
                     segmento: record._fields[0].properties.segmento
    });
    console.log(list_result);  
  });
  res.render('result', { list_result: list_result , 
      title: 'Express', drinks: drinks });
 })
 .catch(function(err){
   console.log(err);
 });

  
});

module.exports = router;
