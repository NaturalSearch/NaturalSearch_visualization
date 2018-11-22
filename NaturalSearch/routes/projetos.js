var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var fs = require('fs');

link = fs.readFileSync('./NEO4J_LINK.txt', 'utf8');
user_name = fs.readFileSync('./USER_NAME.txt', 'utf8');
password = fs.readFileSync('./PASSWORD.txt', 'utf8');

var driver = neo4j.driver(link, neo4j.auth.basic(user_name, password));
var session = driver.session();
const fetch = require('node-fetch');
    
/* GET home page. */
//Alterar quantidade por count

router.get('/', function (req, res, next) {
    fetch("http://68.183.107.229:8000/projeto/?limit100=&offset=0").then((res)=>{
        return res.json();
    }).then((json)=>{
        total = json.count;
        reminder = total % 100;
        total = parseInt(total/100);
        total = total + 1;

        for(let page_number = 0; page_number < total; page_number++) {
            url = "http://68.183.107.229:8000/projeto/?limit=&offset=" + (page_number*100)
    
            fetch(url).then((res)=>{
                return res.json();
            }).then((json)=>{
                elements_quantity = 100;
                if (json.next == null) {
                    elements_quantity = reminder;
                }
                for(let json_position = 0; json_position < elements_quantity; json_position++) {
                    console.log(json.results[json_position].url);
                        session    
                        .run('MERGE(n:Projeto{nome:{nome},proponente:{proponente},segmento:{segmento}, \
                            area:{area},UF:{UF},ano_projeto:{ano_projeto},valor_projeto:{valor_projeto}, \
                            valor_solicitado:{valor_solicitado},valor_captado:{valor_captado}, \
                            valor_aprovado:{valor_aprovado},valor_proposta:{valor_proposta}}) \
                            RETURN n.nome', {
                            nome: json.results[json_position].nome,
                            proponente:json.results[json_position].proponente,
                            segmento: json.results[json_position].segmento,
                            area: json.results[json_position].area,
                            UF: json.results[json_position].UF,
                            ano_projeto: json.results[json_position].ano_projeto,
                            valor_projeto: json.results[json_position].valor_projeto,
                            valor_solicitado: json.results[json_position].valor_solicitado,
                            valor_captado: json.results[json_position].valor_captado,
                            valor_aprovado: json.results[json_position].valor_aprovado,
                            valor_proposta: json.results[json_position].valor_proposta,
                        });
                        session
                }
            })
        }
    })
        res.send("teste projetos");
});

module.exports = router;
