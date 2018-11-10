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
            nodes.push({id:2,uf:r.properties.uf,group:3});
            nodes.push({id:3,area:r.properties.municipio,group:4});
            
          }
          else if (r.labels == "Nó_Projeto"){
            nodes.push({id:r.id,nome:r.properties.nome,group:5});  
            nodes.push({id:5,area:r.properties.area,group:6});
            nodes.push({id:6,valor_aprovado:r.properties.valor_aprovado,group:7});
            nodes.push({id:7,UF:r.properties.UF,group:8});
            nodes.push({id:8,proponente:r.properties.proponente,group:9});
            nodes.push({id:9,segmento:r.properties.segmento,group:10});
            nodes.push({id:10,ano_projeto:r.properties.ano_projeto,group:11});
            nodes.push({id:11,valor_proposta:r.properties.valor_proposta,group:12});
            nodes.push({id:12,valor_projeto:r.properties.valor_projeto,group:13});
            nodes.push({id:13,valor_solicitado:r.properties.valor_solicitado,group:14});            
            nodes.push({id:14,valor_captado:r.properties.valor_captado,group:15});
          }
          
          
          
          //links = links.concat( row.graph.relationships.map(function(r) {
            //return {source:r.startNode,target:r.endNode,value:30};
          });
          console.log(nodes);
  res.send('teste');  
        //viz = {nodes:nodes, links:links};
      });
      
      //create a new file json to use in d3
      //var fs = require('fs');
    
      //fs.writeFileSync('public/javascripts/ligacoes/ligacao.json', JSON.stringify(viz));
    
        //console.log("Arquivo salvo");  
    //res.send('Carregar arquivo');
//});

module.exports = router;
