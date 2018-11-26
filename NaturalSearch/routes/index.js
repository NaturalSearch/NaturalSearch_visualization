var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://kunze-vista-teal-jess.graphstory.services/", neo4j.auth.basic("kunze_vista_teal_jess", "MPSbPSW1AuQX5B49eQOPnKPD8Q"));
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
  search_result = req.query.q;
  if(search_result!=null){
    search_result=titleize(search_result);
    console.log(search_result);
  }
  
 res.render('index', { title: 'Express' });
});

module.exports = router;
