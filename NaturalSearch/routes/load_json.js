var express = require('express');
var router = express.Router();
var data_movie = require('../public/javascripts/ligacoes/ligacaoProjProp.json');
/* GET home page. */
router.get('/', function (req, res, next) {
  function idIndex(a, id) {
    for (var i = 0; i < a.length; i++) {
      if (a[i].id == id) return i;
    }
    return null;
  }

  // create a json file to convert to d3 format
  var nodes = [], links = [];
  var i = 0;
  var count = data_movie.stats.relationships_created;
  //read Proponentes in json
  data_movie.data[i].graph.nodes.forEach(function (r) {
    if (r.labels == 'Nó_Proponentes') {
      nodes.push({ id: r.id, nome: r.properties.nome, group: 0 });
      nodes.push({ id: 1, area: r.properties.tipo_pessoa, group: 0 });
      nodes.push({ id: 2, uf: r.properties.uf, group: 0 });
      nodes.push({ id: 3, area: r.properties.municipio, group: 0 });
    }
  });
  //read Projetos in json
  while (i < count){
    data_movie.data[i].graph.nodes.forEach(function (r) {
      if (r.labels == "Nó_Projeto") {
        nodes.push({ id: r.id, nome: r.properties.nome, group: i+1 });
        nodes.push({ id: 5, area: r.properties.area, group: i+1 });
        nodes.push({ id: 6, valor_aprovado: r.properties.valor_aprovado, group: i+1});
        nodes.push({ id: 7, UF: r.properties.UF, group: i+1});
        nodes.push({ id: 8, proponente: r.properties.proponente, group: i+1});
        nodes.push({ id: 9, segmento: r.properties.segmento, group: i+1 });
        nodes.push({ id: 10, ano_projeto: r.properties.ano_projeto, group: i+1 });
        nodes.push({ id: 11, valor_proposta: r.properties.valor_proposta, group: i+1 });
        nodes.push({ id: 12, valor_projeto: r.properties.valor_projeto, group: i+1 });
        nodes.push({ id: 13, valor_solicitado: r.properties.valor_solicitado, group: i+1 });
        nodes.push({ id: 14, valor_captado: r.properties.valor_captado, group: i+1 });
      }
    });
  i++;
  }    
  
  //links = links.concat( row.graph.relationships.map(function(r) {
  //return {source:r.startNode,target:r.endNode,value:30};
  
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
