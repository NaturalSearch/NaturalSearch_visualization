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
      var i=0;
     
        data_movie.data[i].graph.nodes.forEach(function (r) {
          //console.log(r.labels);
          if (r.labels=='Nó_Proponentes'){            
            nodes.push({id:r.id,nome:r.properties.nome,group:1});
            nodes.push({id:1,area:r.properties.tipo_pessoa,group:2});
            nodes.push({id:3,uf:r.properties.uf,group:3});
            nodes.push({id:4,area:r.properties.municipio,group:4});
            console.log(nodes);
          }
          else if (r.labels == "Nó_Projeto"){
            //console.log(r.properties.ano_projeto)
          }

          
          res.send('teste');
          //links = links.concat( row.graph.relationships.map(function(r) {
            //return {source:r.startNode,target:r.endNode,value:30};
          });
      
        //viz = {nodes:nodes, links:links};
      });
      
      //create a new file json to use in d3
      //var fs = require('fs');
    
      //fs.writeFileSync('public/javascripts/ligacoes/ligacao.json', JSON.stringify(viz));
    
        //console.log("Arquivo salvo");  
    //res.send('Carregar arquivo');
//});

module.exports = router;
