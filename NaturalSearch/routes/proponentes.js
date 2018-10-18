var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var proponentes = require('../public/javascripts/proponentes.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    list_proponentes = []
    /*
    //console.log(proponentes.proponentes[0].nome,proponentes.proponentes[0].UF);
    //res.send(proponentes.proponentes[0].nome) ;
    for (i = 0; i <= 99; i++) {
        //console.log(proponentes.proponentes[i].nome);
        nome = proponentes.proponentes[i].nome;
        tipo_pessoa = proponentes.proponentes[i].tipo_pessoa;
        uf = proponentes.proponentes[i].UF;
        municipio = proponentes.proponentes[i].municipio;
        list_proponentes.push(nome, tipo_pessoa, uf, municipio);
    */
    proponentes.proponentes.map(
        item => {
            nome = item.nome;
            tipo_pessoa = item.tipo_pessoa;
            uf = item.UF;
            municipio = item.municipio;

            console.log(nome);
            console.log(tipo_pessoa);
            console.log(uf);
            console.log(municipio);

            session
                .run('CREATE(n:Proponentes_salic_parcial{tipo_pessoa:{tipo_pessoa},uf:{uf},municipio:{municipio},nome:{nome}}) RETURN n.nome', {
                    tipo_pessoa: tipo_pessoa,
                    uf: uf,
                    municipio: municipio,
                    nome: nome
                })
                .then(function (result) {
                    console.log(list_proponentes);
                    session.close();
                })
                    .catch(function (err) {
                    console.log(err);
                    });

        }
    );
    res.redirect("/");     
    
});

module.exports = router;