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
        session//1
            .run('CREATE(n:NomeProjeto{nome:{nome}}) RETURN n.nome', {
                nome: json.projetos[i].nome,
            });
            console.log(json.projetos[i].nome);
        session//2
            .run('CREATE(n:ProponenteProjeto{proponente:{proponente}}) RETURN n.proponente', {
                proponente:json.projetos[i].proponente,
            });
        session//3
            .run('CREATE(n:SegmentoProjeto{segmento:{segmento}}) RETURN n.segmento', {
                segmento: json.projetos[i].segmento,
            });
        session//4
            .run('CREATE(n:AreaProjeto{area:{area}}) RETURN n.area', {
                area: json.projetos[i].area,
            });
        session//5
            .run('CREATE(n:UFProjeto{UF:{UF}}) RETURN n.UF', {
                UF: json.projetos[i].UF,
            });
        session//6
            .run('CREATE(n:ANOProjeto{ano_projeto:{ano_projeto}}) RETURN n.ano_projeto', {
                ano_projeto: json.projetos[i].ano_projeto,
            });
        session//7
            .run('CREATE(n:VPROJProjeto{valor_projeto:{valor_projeto}}) RETURN n.valor_projeto', {
                valor_projeto: json.projetos[i].valor_projeto,
            });
        session//8
            .run('CREATE(n:VSOLProjeto{valor_solicitado:{valor_solicitado}}) RETURN n.valor_solicitado', {
                valor_solicitado: json.projetos[i].valor_solicitado,
            });
        session//9
            .run('CREATE(n:VCAPProjeto{valor_captado:{valor_captado}}) RETURN n.valor_captado', {
                valor_captado: json.projetos[i].valor_captado,
            });  
        session//10
            .run('CREATE(n:VAProjeto{valor_aprovado:{valor_aprovado}}) RETURN n.valor_aprovado', {
                valor_aprovado: json.projetos[i].valor_aprovado,
            });  
        session//11
            .run('CREATE(n:VPROProjeto{valor_proposta:{valor_proposta}}) RETURN n.valor_proposta', {
                valor_proposta: json.projetos[i].valor_proposta,
            });  
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
        session
            .run('MATCH(e:UFProjeto{UF:{UF}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(e)-[r:UF]-(a) RETURN e,a', {
                nomeParam: json.projetos[i].nome,
                UF: json.projetos[i].UF,
            });
        session
            .run('MATCH(f:ANOProjeto{ano_projeto:{ano_projeto}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(f)-[r:ANO_PROJETO]-(a) RETURN f,a', {
                nomeParam: json.projetos[i].nome,
                ano_projeto: json.projetos[i].ano_projeto,
            });
        session
            .run('MATCH(g:VPROJProjeto{valor_projeto:{valor_projeto}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(g)-[r:VALOR_PROJETO]-(a) RETURN g,a', {
                nomeParam: json.projetos[i].nome,
                valor_projeto: json.projetos[i].valor_projeto,
            });
        session
            .run('MATCH(h:VSOLProjeto{valor_solicitado:{valor_solicitado}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(h)-[r:VALOR_SOLICITADO]-(a) RETURN h,a', {
                nomeParam: json.projetos[i].nome,
                valor_solicitado: json.projetos[i].valor_solicitado,
            });
        session
            .run('MATCH(i:VCAPProjeto{valor_captado:{valor_captado}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(i)-[r:VALOR_CAPTADO]-(a) RETURN i,a', {
                nomeParam: json.projetos[i].nome,
                valor_captado: json.projetos[i].valor_captado,
            });
        session
            .run('MATCH(j:VAProjeto{valor_aprovado:{valor_aprovado}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(j)-[r:VALOR_APROVADO]-(a) RETURN j,a', {
                nomeParam: json.projetos[i].nome,
                valor_aprovado: json.projetos[i].valor_aprovado,
            });
        session
            .run('MATCH(k:VPROProjeto{valor_proposta:{valor_proposta}}), (a:NomeProjeto{nome: {nomeParam}}) MERGE(k)-[r:VALOR_PROPOSTA]-(a) RETURN k,a', {
                nomeParam: json.projetos[i].nome,
                valor_proposta: json.projetos[i].valor_proposta,
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
