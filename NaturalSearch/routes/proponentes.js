var express = require('express');
var router = express.Router();
var proponentes = require('../public/javascripts/proponentes.json');
/* GET home page. */
router.get('/', function(req, res, next) {

   //console.log(proponentes.proponentes[0].nome,proponentes.proponentes[0].UF);
   //res.send(proponentes.proponentes[0].nome) ;
    for(i=0;i<=100;i++){
        console.log(proponentes.proponentes[i].nome);
}
});

module.exports = router;