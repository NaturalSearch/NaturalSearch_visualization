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

/*
router.get('/', function (req, res, next) {
        
        var proponentes ='proponentes1.json';   
        json = JSON.parse(fs.readFileSync('./public/proponents/' + proponentes, 'utf8'));      
        for(var i=0;i<json.quantidade;i++){
            session
                .run('CREATE(n:NomeProponente{nome:{nome}}) RETURN n.nome', {
                    nome: json.proponentes[i].nome
                });
                console.log(json.proponentes[i].nome);
            session
                .run('CREATE(n:TipoProponente{tipo_pessoa:{tipo_pessoa}}) RETURN n.tipo_pessoa', {
                    tipo_pessoa:json.proponentes[i].tipo_pessoa,
                });
            session
                .run('CREATE(n:UFProponente{uf:{uf}}) RETURN n.uf', {
                    uf: json.proponentes[i].UF,
                });
            session
                .run('CREATE(n:MunicipioProponente{municipio:{municipio}}) RETURN n.municipio', {
                    municipio: json.proponentes[i].municipio,
                });
            session
                .run('MATCH(a:NomeProponente{nome:{nome}}), (b:TipoProponente{tipo_pessoa:{tipo_pessoa}}) MERGE(b)-[r:TIPO_PROPONENTE]-(a) RETURN b,a', {
                    nome: json.proponentes[i].nome,
                    tipo_pessoa:json.proponentes[i].tipo_pessoa,
                });
            session
                .run('MATCH(a:NomeProponente{nome:{nome}}), (c:UFProponente{uf:{uf}}) MERGE(c)-[r:UF_PROPONENTE]-(a) RETURN c,a', {
                    nome: json.proponentes[i].nome,
                    uf: json.proponentes[i].UF,
                });
            session
                .run('MATCH(a:NomeProponente{nome:{nome}}), (d:MunicipioProponente{municipio:{municipio}}) MERGE(d)-[r:MUNI_PROPONENTE]-(a) RETURN d,a', {
                    nome: json.proponentes[i].nome,
                    municipio: json.proponentes[i].municipio,
                });


        }
    res.send("teste proponente");

});
**/
