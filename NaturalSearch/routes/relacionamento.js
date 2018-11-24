var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://kunze-vista-teal-jess.graphstory.services/", neo4j.auth.basic("kunze_vista_teal_jess", "MPSbPSW1AuQX5B49eQOPnKPD8Q"));
var session = driver.session();
var fs = require("fs");

/* GET home page. */
router.get('/:proponente', function(req, res, next) {
    var proponente = req.params.proponente;
    //console.log(proponente);

    var result = session
        .run( 
           'MATCH (p:Nó_Proponentes), (pr:Nó_Projeto) WHERE p.nome="'+ proponente +'" AND pr.proponente="'+proponente+'"CREATE (p)-[f:LIGADOS]->(pr) RETURN p,f,pr')            
        .then(function(result){
            var nodes = [], links = [];
            // CREATE NODE PROPONENTE
            result.records[0]._fields.forEach(function (r) {     
                if(r.labels == "Nó_Proponentes"){
                    nodes.push({ id: r.identity.low, nome: r.properties.nome, group: 0, group_color: 3, length_node: 25, distance_link: 100 });
                    //console.log(nodes);
                }                
            });
            //CREATE THE NODES THAT USE THE PROPERTIRES


        });
    session
    //console.log(result); 
    var result = session
    .run(
        'MATCH (:Nó_Proponentes)-[f:LIGADOS]-(:Nó_Projeto)\
        DELETE f'
    )
    session       
    //res.send("funcionou");
    //res.redirect("/load_json")
    // neo4j to D3  
    // var json_neo4j = result;
    // //console.log(json_neo4j);
    // var nodes = [], links = [];
    // ////console.log(count);
    // //create nodes

        
     //result.records._fields[0].properties.forEach(function (r) {
     //    console.log();
     //  if (r.labels == 'Nó_Proponentes') {
    //     nodes.push({ id: r.identity.low, nome: r.properties.nome, group: 0, group_color: 3, length_node: 25, distance_link: 100 });
    //     ////console.log(r.identity.low);
    //   }
    // });
    // for (i = 0; i < count; i++) {
    //   json_neo4j.records[i]._fields.forEach(function (r) {
    //     if (r.labels == 'Nó_Projeto') {
    //       nodes.push({ id: r.identity.low, nome: r.properties.nome, group: i + 1, group_color: 4, length_node: 20 });
    //       nodes.push({ id: "area" + i, area: r.properties.area, group: i + 1, group_color: 5, length_node: 15 });
    //       nodes.push({ id: "valor" + i, valor_aprovado: r.properties.valor_aprovado, group: i + 1, group_color: 6, length_node: 15 });
    //       nodes.push({ id: "UF" + i, UF: r.properties.UF, group: i + 1, group_color: 7, length_node: 15 });
    //       nodes.push({ id: "proponente" + i, proponente: r.properties.proponente, group: i + 1, group_color: 8, length_node: 15 });
    //       nodes.push({ id: "segmento" + i, segmento: r.properties.segmento, group: i + 1, group_color: 9, length_node: 15 });
    //       nodes.push({ id: "valor_proposta" + i, valor_proposta: r.properties.valor_proposta, group: i + 1, group_color: 11, length_node: 15 });
    //       nodes.push({ id: "ano_projeto" + i, ano_projeto: r.properties.ano_projeto, group: i + 1, group_color: 10, length_node: 15 });
    //       nodes.push({ id: "valor_projeto" + i, valor_projeto: r.properties.valor_projeto, group: i + 1, group_color: 12, length_node: 15 });
    //       nodes.push({ id: "valor_solicitado" + i, valor_solicitado: r.properties.valor_solicitado, group: i + 1, group_color: 13, length_node: 15 });
    //       nodes.push({ id: "valor_captado" + i, valor_captado: r.properties.valor_captado, group: i + 1, group_color: 14, length_node: 15 });

    //       links.push({ source: "area"+i, target: r.identity.low, value: 4,distance_link:200});    
    //       links.push({ source: "valor"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "UF"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "proponente"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "segmento"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "ano_projeto"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "valor_proposta"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "valor_projeto"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "valor_captado"+i, target: r.identity.low, value: 4,distance_link:200});
    //       links.push({ source: "valor_solicitado"+i, target: r.identity.low, value: 4,distance_link:200});
    //     }
    //   });

    // }
    // ////console.log(links)
    // ////console.log(nodes);
    // //while (i < count) {
    // for (i = 0; i < count; i++) {
    //   json_neo4j.records[i]._fields.forEach(function (l) {
    //     if (l.type == "LIGADOS") {
    //       links.push({ source: l.start.low, target: l.end.low, value: 4,distance_link:150});
    //     }
    //   });
    // }

    // var convert_to_d3 = { nodes: nodes, links: links };

    // //create json
    // var fs = require('fs');
    // fs.writeFileSync('public/javascripts/d3_prop_proj_teste2.json', JSON.stringify(convert_to_d3));

     res.send("funcionou");      
});

module.exports = router;