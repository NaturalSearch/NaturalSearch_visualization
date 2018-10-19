var express = require('express');
var router = express.Router();
//const neo4j = require('neo4j-driver').v1;
//const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "eps"));
//const session = driver.session();

var fs = require('fs');
var json;



for (var i = 1; i <= 2; i++) {
  file_name = "projetos" + i + ".json";
  json = JSON.parse(fs.readFileSync('./projetos/' + file_name, 'utf8'));
  for (var j = 0; j < json.quantidade ; j++) {
    /*const resultPromise = session.run(
      'CREATE (a:Person {name: $name}) RETURN a',
      {name: personName}
    );*/
    console.log(json.projetos[j].nome);
  }
}



router.get('/', function(req, res, next) {
  res.send("fdp do cacete!!!!!");
});


/*
const personName = 'Alice';
const resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: personName}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});
*/
module.exports = router;
