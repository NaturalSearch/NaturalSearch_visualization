var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    /*fetch('http://localhost:7474/db/data/transaction/1/commit')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
    });*/
    var result = session
        .run(
            "MATCH (n:Person {name: 'Joel Silver'})-[r]-()\
            RETURN n")
        .then(function(result){
            //console.log(result.records._fields);
            /*result.records.forEach(function(record){
                console.log(record._fields);
                var resultado = record._fields
                console.log(resultado)
            });*/ 
            console.log(result.records[0]._fields.labels);
            fs.writeFile("./object.json", JSON.stringify(result), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });
            //console.log(result);
        });
    session

    console.log(result);         

    res.render('example', { title: 'Express' });
});

module.exports = router;