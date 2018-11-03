var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');
    
    
/* GET home page. */
//Alterar quantidade por count

router.get('/', function (req, res, next) {
    
    for (var count = 1; count <=922; count++) {
        
        var proponentes ='projetos'+count+'.json'; 
    json = JSON.parse(fs.readFileSync('./public/projects/' + projetos, 'utf8'));      
    for(var i=0;i<json.quantidade;i++){
        session    
            .run('CREATE(n:Nó_Projeto{nome:{nome},proponente:{proponente},segmento:{segmento},area:{area},UF:{UF},ano_projeto:{ano_projeto},valor_projeto:{valor_projeto},valor_solicitado:{valor_solicitado},valor_captado:{valor_captado},valor_aprovado:{valor_aprovado},valor_proposta:{valor_proposta}}) RETURN n.nome', {
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
        session

            console.log(json.projetos[i].nome);
        }
    }
        res.send("teste projetos");
});


module.exports = router;