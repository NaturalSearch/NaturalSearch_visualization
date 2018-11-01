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
    var seg = [];
    json = JSON.parse(fs.readFileSync('./public/projects/' + projetos, 'utf8'));      
    for(var i=0;i<json.quantidade;i++){
        session//1
            .run('CREATE(n:NomeProjeto{nome:{nome}}) RETURN n.nome', {
                nome: json.projetos[i].nome,
            });
            console.log(json.projetos[i].nome);
        session//1
            .run('CREATE(n:ProponenteProjeto{proponente: {proponenteParam}}) RETURN n.proponente', {
                proponenteParam: json.projetos[i].proponente,
            });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}), (b:ProponenteProjeto{proponente: {proponenteParam}}) MERGE(b)-[r:PROPONENTE]-(a) RETURN b,a', {
                nomeParam: json.projetos[i].nome,
                proponenteParam: json.projetos[i].proponente,
            });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (c:SegmentoProjeto{segmento:{segmento}})-[r:SEGMENTO]->(a) RETURN a,c', {
                nomeParam: json.projetos[i].nome,
                segmento: json.projetos[i].segmento,
            });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (d:AreaProjeto{area:{area}})-[r:AREA]->(a) RETURN a,d', {
                nomeParam: json.projetos[i].nome,
                area: json.projetos[i].area,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (e:UFProjeto{UF:{UF}})-[r:UF]->(a) RETURN a,e', {
                nomeParam: json.projetos[i].nome,
                UF: json.projetos[i].UF,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (f:ANOProjeto{ano_projeto:{ano_projeto}})-[r:ANO_PROJETO]->(a) RETURN a,f', {
                nomeParam: json.projetos[i].nome,
                ano_projeto: json.projetos[i].ano_projeto,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (g:VPROJProjeto{valor_projeto:{valor_projeto}})-[r:VALOR_PROJETO]->(a) RETURN a,g', {
                nomeParam: json.projetos[i].nome,
                valor_projeto: json.projetos[i].valor_projeto,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (h:VSOLProjeto{valor_solicitado:{valor_solicitado}})-[r:VALOR_SOLICITADO]->(a) RETURN a,h', {
                nomeParam: json.projetos[i].nome,
                valor_solicitado: json.projetos[i].valor_solicitado,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (i:VCAPProjeto{valor_captado:{valor_captado}})-[r:VALOR_CAPTADO]->(a) RETURN a,i', {
                nomeParam: json.projetos[i].nome,
                valor_captado: json.projetos[i].valor_captado,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (j:VAProjeto{valor_aprovado:{valor_aprovado}})-[r:VALOR_APROVADO]->(a) RETURN a,j', {
                nomeParam: json.projetos[i].nome,
                valor_aprovado: json.projetos[i].valor_aprovado,
        });
        session
            .run('MATCH(a:NomeProjeto{nome: {nomeParam}}) CREATE UNIQUE (k:VPROProjeto{valor_proposta:{valor_proposta}})-[r:VALOR_APROVADO]->(a) RETURN a,k', {
                nomeParam: json.projetos[i].nome,
                valor_proposta: json.projetos[i].valor_proposta,
        });
    
    } 
        res.send("teste projeto");
});

module.exports = router;
