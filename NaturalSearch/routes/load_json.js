var express = require('express');
var router = express.Router();
var data_movie = require('../public/javascripts/ligacoes/ligacaoProjProp.json');
/* GET home page. */
router.get('/', function(req, res, next) {
    function idIndex(a,id) {
        for (var i=0;i<a.length;i++) {
          if (a[i].id == id) return i;}
        return null;
      }
    
      // capturar os dados dos filmes
      var nodes=[], links=[];
      data_movie.data[0].forEach(function (row) {
         row.graph.nodes.forEach(function (n) {
           if (idIndex(nodes,n.id) == null)
            group=n.labels[0];
            if (group=="Nó_Proponentes"){
                group=1;
              nome=n.properties.nome
              nodes.push({id:n.id,nome:nome,group:group});
            }else if (group=="Nó_Projeto"){
              group=2;
              proponente=n.properties.proponente;
              nodes.push({id:n.id,proponente:proponente,group:group});
            }
             
         });
         links = links.concat( row.graph.relationships.map(function(r) {
          return {source:r.startNode,target:r.endNode,value:30};
        }));
        viz = {nodes:nodes, links:links};
      });
      
      //create a new file json to use in d3
      var fs = require('fs');
    
      fs.writeFileSync('public/javascripts/ligacoes/ligacao.json', JSON.stringify(viz));
    
        console.log("Arquivo salvo");  
    res.send('Carregar arquivo');
});

module.exports = router;
