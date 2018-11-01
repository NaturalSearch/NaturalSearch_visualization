var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');
    
    
/* GET home page. */
//Alterar quantidade por count

router.get('/', function (req, res, next) {
        
    var projetos ='projetos1.json';   
    json = JSON.parse(fs.readFileSync('./public/projects/' + projetos, 'utf8'));      
    for(var i=0;i<json.quantidade;i++){
        session
            .run('CREATE(n:NomeProjeto{nome:{nome}}) RETURN n.nome', {
                nome: json.projetos[i].nome,
            });
            console.log(json.projetos[i].nome);
        session
            .run('CREATE(n:ProponenteProjeto{proponente:{proponente}}) RETURN n.proponente', {
                proponente:json.projetos[i].proponente,
            });
        session
            .run('CREATE(n:SegmentoProjeto{segmento:{segmento}}) RETURN n.segmento', {
                segmento: json.projetos[i].segmento,
            });
        session
            .run('CREATE(n:AreaProjeto{area:{area}}) RETURN n.area', {
                area: json.projetos[i].area,
            });
        /* session
            .run('CREATE(n:UFProjeto{UF:{UF}}) RETURN n.UF', {
                UF: json.projetos[i].UF,
            }); */
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}), (b:ProponenteProjeto{proponente: {proponenteParam}}) MERGE(b)-[r:PROPONENTE]-(a) RETURN b,a', {
                nomeParam: json.projetos[i].nome,
                proponenteParam: json.projetos[i].proponente,
            });
        session
            .run('MATCH(c:SegmentoProjeto{segmento:{segmento}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(c)-[r:SEGMENTO]-(a) RETURN c,a', {
                nomeParam: json.projetos[i].nome,
                segmento: json.projetos[i].segmento,
            });
        session
            .run('MATCH(d:AreaProjeto{area:{area}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(d)-[r:AREA]-(a) RETURN d,a', {
                nomeParam: json.projetos[i].nome,
                area: json.projetos[i].area,
            });
        
    }
res.send("teste projeto");

});

/* router.get('/', function (req, res, next) {
        
        var projetos ='projetos1.json';   
        json = JSON.parse(fs.readFileSync('./public/projects/' + projetos, 'utf8'));      
        for(var i=0;i<json.quantidade;i++){
            session
                .run('CREATE(n:TesteProjeto{nome:{nome},proponente:{proponente},segmento:{segmento},area:{area},UF:{UF},ano_projeto:{ano_projeto},valor_projeto:{valor_projeto},valor_solicitado:{valor_solicitado},valor_captado:{valor_captado},valor_aprovado:{valor_aprovado},valor_proposta:{valor_proposta}}) RETURN n.nome', {
                    nome: json.projetos[i].nome,
                    proponente:json.projetos[i].proponente,
                    segmento: json.projetos[i].segmento,
                    area: json.projetos[i].area,
                    UF: json.projetos[i].UF,
                    ano_projeto: json.projetos[i].ano_projeto,
                    valor_projeto: json.projetos[i].valor_projeto,
                    valor_solicitado: json.projetos[i].valor_solicitado,
                    valor_captado: json.projetos[i].valor_captado,
                    valor_aprovado: json.projetos[i].valor_aprovado,
                    valor_proposta: json.projetos[i].valor_proposta,
                });
                console.log(json.projetos[i].nome);
        }
    res.send("teste projeto");

}); */

module.exports = router;
