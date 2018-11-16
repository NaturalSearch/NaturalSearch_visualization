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
      nodes.push({ id: r.id, nome: r.properties.nome, group: 0,group_color:3, length_node: 25,distance_link:100});
      //nodes.push({ id: 1, area: r.properties.tipo_pessoa, group: 0 });
      //nodes.push({ id: 2, uf: r.properties.uf, group: 0 });
      //nodes.push({ id: 3, area: r.properties.municipio, group: 0 });
    }
  });
  //read Projetos in json
  while (i < count){
    json_neo4j.data[i].graph.nodes.forEach(function (r) {
      if (r.labels == "Nó_Projeto") {
        nodes.push({ id: r.id, nome: r.properties.nome, group: i+1,group_color:4,length_node:20});
        nodes.push({ id: "area"+i, area: r.properties.area, group: i+1,group_color:5,length_node:15});
        nodes.push({ id: "valor"+i, valor_aprovado: r.properties.valor_aprovado, group: i+1,group_color:6,length_node:15});
        nodes.push({ id: "UF"+i, UF: r.properties.UF, group: i+1,group_color:7,length_node:15});
        nodes.push({ id: "proponente"+i, proponente: r.properties.proponente, group: i+1,group_color:8,length_node:15});
        nodes.push({ id: "segmento"+i, segmento: r.properties.segmento, group: i+1,group_color:9,length_node:15});
        nodes.push({ id: "ano_projeto"+i, ano_projeto: r.properties.ano_projeto, group: i+1,group_color:10,length_node:15 });
        nodes.push({ id: "valor_proposta"+i, valor_proposta: r.properties.valor_proposta, group: i+1,group_color:11,length_node:15 });
        nodes.push({ id: "valor_projeto"+i, valor_projeto: r.properties.valor_projeto, group: i+1,group_color:12,length_node:15 });
        nodes.push({ id: "valor_solicitado"+i, valor_solicitado: r.properties.valor_solicitado, group: i+1,group_color:13,length_node:15 });
        nodes.push({ id: "valor_captado"+i, valor_captado: r.properties.valor_captado, group: i+1,group_color:14,length_node:15 });
        
        links.push({ source: "area"+i, target: r.id, value: 4,distance_link:200});    
        links.push({ source: "valor"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "UF"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "proponente"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "segmento"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "ano_projeto"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "valor_proposta"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "valor_projeto"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "valor_captado"+i, target: r.id, value: 4,distance_link:200});
        links.push({ source: "valor_solicitado"+i, target: r.id, value: 4,distance_link:200});
      }
    });
   //create link to json    
  json_neo4j.data[i].graph.relationships.forEach(function (l) {
    links.push({ source: l.startNode, target: l.endNode, value: 4,distance_link:150});
    
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
