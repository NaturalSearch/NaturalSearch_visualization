var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();

/* GET users listing. */
router.get('/', function(req, res, next) {
  session
  .run('MATCH (n:Project) RETURN n LIMIT 25')
  .then(function(result){
    result.records.forEach(function(record){
      console.log(record._fields[0].properties);
    });
  })
  .catch(function(err){
    console.log(err);
  });
console.log(req.query.q);
search_result = req.query.q;

  res.send('respond with a resource');
});

module.exports = router;
