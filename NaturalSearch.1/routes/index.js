var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();

function titleize(text) {
  // change the first letter to upper.
  text = text.charAt(0).toUpperCase() + text.slice(1);

  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) ===" ") {
        var charToUper = text.charAt(i+1).toUpperCase();
        var sliceBegin = text.slice(0, (i+1));
        var sliceEnd = text.slice(i + 2);
        text = sliceBegin + charToUper + sliceEnd;
    }
  }
  return text;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    
  console.log(req.query.q);
  search_result = req.query.q;
  
  if(search_result!=null){
    search_result=titleize(search_result);
    console.log(search_result);
  }
  
  //uppercase the first letter of some words
  /*
  session
  .run("MATCH (p:Person) WHERE ANY(prop in keys(p) where TOSTRING(p[prop]) CONTAINS '"+ search_result+ "')RETURN p;")
  .then(function(result){
    result.records.forEach(function(record){
      list_result = [];
      list_result.push(record._fields[0].properties.name,
                       record._fields[0].properties.born.low);
      console.log(list_result);  
    });
  })
  .catch(function(err){
    console.log(err);
  });
  */
  res.render('index', { title: 'Express' });
});

module.exports = router;
