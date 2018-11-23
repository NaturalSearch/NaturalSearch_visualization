var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://kunze-vista-teal-jess.graphstory.services/", neo4j.auth.basic("kunze_vista_teal_jess", "MPSbPSW1AuQX5B49eQOPnKPD8Q"));
var session = driver.session();
var fs = require("fs");

/* GET home page. */
router.get('/:proponente', function(req, res, next) {
    /*fetch('http://localhost:7474/db/data/transaction/1/commit')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
    });*/
    var proponente = req.params.proponente;
    console.log(proponente);

    var result = session
        .run( 
           'MATCH (p:Nó_Proponentes), (pr:Nó_Projeto) WHERE p.nome="'+ proponente +'" AND pr.proponente="'+proponente+'"CREATE (p)-[f:LIGADOS]->(pr) RETURN p,f,pr')
            
            //'MATCH p=()-[r:LIGADOS]->() RETURN p LIMIT 25')

        .then(function(result){
            //console.log(result.records._fields);
            /*result.records.forEach(function(record){
                console.log(record._fields);
                var resultado = record._fields
                console.log(resultado)
            });*/ 
            //console.log(result.records[0]._fields.labels);
            fs.writeFile("./object.json", JSON.stringify(result), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });
            console.log(result);
        });
    session

    console.log(result); 
        
    var result = session
    .run(
        'MATCH (:Nó_Proponentes)-[f:LIGADOS]-(:Nó_Projeto)\
        DELETE f'
    )
    session       
    res.send("funcionou");
    res.render('example', { title: 'Express' });
});

module.exports = router;