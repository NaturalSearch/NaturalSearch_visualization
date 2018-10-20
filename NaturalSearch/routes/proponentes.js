var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');
    
    
/* GET home page. */
router.get('/', function (req, res, next) {

    for (let count = 1; count <=443; count++) {
        
        var proponentes ='proponentes'+count+'.json';   
        json = JSON.parse(fs.readFileSync('./public/javascripts/' + proponentes, 'utf8'));  
        //console.log(json.proponentes[99].nome);  
        //fs.writeFileSync('public/javascripts/funciona_please.json', JSON.stringify(json));
        
        for(let i=0;i<=99;i++){
            
            nome=json.proponentes[i].nome;
            tipo_pessoa=json.proponentes[i].tipo_pessoa;
            uf = json.proponentes[i].UF;
            municipio =json.proponentes[i].municipio;
            
            session
                .run('CREATE(n:Teste3{tipo_pessoa:{tipo_pessoa},uf:{uf},municipio:{municipio},nome:{nome}}) RETURN n.nome', {
                    tipo_pessoa: tipo_pessoa,
                    uf: uf,
                    municipio: municipio,
                    nome: nome
                })
                .then(function (result) {
                    session.close();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
     //   for(let i=0;i<prop.quantidade;i++){

       // nome = proponentes.proponentes[i].nome;
        //console.log.nome()
        //tipo_pessoa = proponentes.proponentes[i].tipo_pessoa;
        //uf = proponentes.proponentes[i].UF;
        //municipio = proponentes.proponentes[i].municipio;
        //console.log(nome);
        //console.log(nome);
        //console.log(tipo_pessoa);
        //console.log(uf);
        //console.log(municipio);
    //    }    
    
        /*
        proponentes.proponentes.map(
            item => {
                nome = item.nome;
                tipo_pessoa = item.tipo_pessoa;
                uf = item.UF;
                municipio = item.municipio;
                console.log(nome);
                session
                    .run('CREATE(n:Teste1{tipo_pessoa:{tipo_pessoa},uf:{uf},municipio:{municipio},nome:{nome}}) RETURN n.nome', {
                        tipo_pessoa: tipo_pessoa,
                        uf: uf,
                        municipio: municipio,
                        nome: nome
                    })
                    .then(function (result) {
                        session.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            }
        );
        */
    
    //res.redirect("/");

});

module.exports = router;