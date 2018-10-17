var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();
var proponentes = require('../public/javascripts/proponentes.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    list_proponentes = []
   //console.log(proponentes.proponentes[0].nome,proponentes.proponentes[0].UF);
   //res.send(proponentes.proponentes[0].nome) ;
    for(i=0;i<=100;i++){
        //console.log(proponentes.proponentes[i].nome);
        nome = proponentes.proponentes[i].nome;
        tipo_pessoa =proponentes.proponentes[i].tipo_pessoa;
        uf = proponentes.proponentes[i].UF;
        municipio =proponentes.proponentes[i].municipio;
        list_proponentes.push(nome,tipo_pessoa,uf,municipio);
        
        session
            .run("CREATE(n:Proponentes{nome:{nome}}) RETURN n.nome",{nome:nome})
            .then(function(result){
                res.redirect('/');
                session.close();
            })
            .catch(function(err){
                console.log(err);
            });
        //res.redirect("/");     
        //res.send(list_proponentes);
        //console.log(list_proponentes);
    }


});

module.exports = router;