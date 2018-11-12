var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');
    
    
/* GET home page. */

router.get('/', function (req, res, next) {

    for (var count = 1; count <=443; count++) {
        
        var proponentes ='proponentes'+count+'.json';   
        json = JSON.parse(fs.readFileSync('./public/javascripts/' + proponentes, 'utf8'));      
        for(var i=0;i<json.quantidade;i++){
            session
                .run('CREATE(n:Nó_Proponentes{tipo_pessoa:{tipo_pessoa},uf:{uf},municipio:{municipio},nome:{nome}}) RETURN n.nome', {
                    tipo_pessoa:json.proponentes[i].tipo_pessoa,
                    uf: json.proponentes[i].UF,
                    municipio: json.proponentes[i].municipio,
                    nome: json.proponentes[i].nome
                });
            session
                
                console.log(json.proponentes[i].nome);
        }
    }
    res.send("vai funcionar caramba");

});


module.exports = router;
