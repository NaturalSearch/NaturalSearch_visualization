var express = require('express');
var router = express.Router();
var json_neo4j = require('../public/javascripts/ligacoes/ligacaoProjProp.json');
/* GET home page. */
router.get('/', function (req, res, next) {
  // read nodes in json
  var nodes = [], links = [];
  var i = 0;
  var count = json_neo4j.stats.relationships_created;
  //read Proponentes in json
  json_neo4j.data[i].graph.nodes.forEach(function (r) {
    if (r.labels == 'Nó_Proponentes') {
      nodes.push({ id: r.id, nome: r.properties.nome, group: 0 });
      nodes.push({ id: 1, area: r.properties.tipo_pessoa, group: 0 });
      nodes.push({ id: 2, uf: r.properties.uf, group: 0 });
      nodes.push({ id: 3, area: r.properties.municipio, group: 0 });
    }
  });
  //read Projetos in json
  while (i < count){
    json_neo4j.data[i].graph.nodes.forEach(function (r) {
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
   //create link to json    
  json_neo4j.data[i].graph.relationships.forEach(function (l) {
    links.push({ source: l.startNode, target: l.endNode, value: 2});
  }); 
  i++;
  }
  var convert_to_d3= {nodes:nodes, links:links};
  
  //create json
  var fs = require('fs');
    
      fs.writeFileSync('public/javascripts/d3_prop_proj.json', JSON.stringify(convert_to_d3));
    
  //links = links.concat( row.graph.relationships.map(function(r) {
  //return {source:r.startNode,target:r.endNode,value:30};
res.send('Arquivo criado com sucesso');
        //viz = {nodes:nodes, links:links};
});

//create a new file json to use in d3
//var fs = require('fs');

//fs.writeFileSync('public/javascripts/ligacoes/ligacao.json', JSON.stringify(viz));

//console.log("Arquivo salvo");  
//res.send('Carregar arquivo');
//});

module.exports = router;
