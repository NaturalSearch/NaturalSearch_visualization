var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var fs = require('fs');

link = fs.readFileSync('./NEO4J_LINK.txt', 'utf8');
user_name = fs.readFileSync('./USER_NAME.txt', 'utf8');
password = fs.readFileSync('./PASSWORD.txt', 'utf8');

var driver = neo4j.driver(link, neo4j.auth.basic(user_name, password));
var session = driver.session();
var fs = require("fs");

function get_relacionamento(req, res, next) {
    var proponente = req.params.proponente;

    var result = session
        .run(
            'MATCH (p:Proponentes), (pr:Projeto) WHERE p.nome="' + proponente + '" AND pr.proponente="' + proponente + '"CREATE (p)-[f:LIGADOS]->(pr) RETURN p,f,pr')
        .then(function (result) {
            var nodes = [], links = [];
            var count = result.summary.counters._stats.relationshipsCreated;
            result.records[0]._fields.forEach(function (r) {
                if (r.labels == "Proponentes") {
                    nodes.push({ id: r.identity.low, nome: r.properties.nome, group: 0, group_color: 3, length_node: 25, distance_link: 100 });
                }
            });
            for (i = 0; i < count; i++) {
                result.records[i]._fields.forEach(function (r) {
                    if (r.labels == 'Projeto') {
                        nodes.push({ id: r.identity.low, nome: r.properties.nome, group: i + 1, group_color: 4, length_node: 20 });
                        nodes.push({ id: "area" + i, area: r.properties.area, group: i + 1, group_color: 5, length_node: 15 });
                        nodes.push({ id: "valor" + i, valor_aprovado: "R$ " + r.properties.valor_aprovado.toString(), group: i + 1, group_color: 6, length_node: 15 });
                        nodes.push({ id: "UF" + i, UF: r.properties.UF, group: i + 1, group_color: 7, length_node: 15 });
                        nodes.push({ id: "segmento" + i, segmento: r.properties.segmento, group: i + 1, group_color: 9, length_node: 15 });
                        nodes.push({ id: "ano_projeto" + i, ano_projeto: r.properties.ano_projeto, group: i + 1, group_color: 10, length_node: 15 });
                        nodes.push({ id: "valor_projeto" + i, valor_projeto: "R$ " + r.properties.valor_projeto.toString(), group: i + 1, group_color: 12, length_node: 15 });
                        nodes.push({ id: "valor_solicitado" + i, valor_solicitado: "R$ " + r.properties.valor_solicitado.toString(), group: i + 1, group_color: 13, length_node: 15 });
                        nodes.push({ id: "valor_captado" + i, valor_captado: "R$ " + r.properties.valor_captado.toString(), group: i + 1, group_color: 14, length_node: 15 });

                        links.push({ source: "area" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "valor" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "UF" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "segmento" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "ano_projeto" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "valor_projeto" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "valor_captado" + i, target: r.identity.low, value: 4, distance_link: 200 });
                        links.push({ source: "valor_solicitado" + i, target: r.identity.low, value: 4, distance_link: 200 });
                    }
                });
            }

            //CREATE LINKS THAT USE NODES TO LINK
            for (i = 0; i < count; i++) {
                result.records[i]._fields.forEach(function (l) {
                    if (l.type == "LIGADOS") {
                        links.push({ source: l.start.low, target: l.end.low, value: 4, distance_link: 150 });
                        //console.log(links)
                    }
                });
            }
            var convert_to_d3 = { nodes: nodes, links: links };
            //var rendering = res.render('example',{title:'Express'});
            var fs = require('fs');
            var nome_arq = 'd3_prop_proj_' + randomIntInc(0,100000) + '.json';
            var arquivo = 'public/javascripts/' + nome_arq;


            //fs.writeFileSync('public/javascripts/d3_prop_proj_teste3.json', JSON.stringify(convert_to_d3))
            function createD3Mode(segunds, convert_to_d3) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(convert_to_d3)
                    }, segunds * 1000)
                })
            }

            var filetod3 = "../static/javascripts/" + nome_arq;
            createD3Mode(3, fs.writeFileSync(arquivo, JSON.stringify(convert_to_d3)))
                .then((convert_to_d3) => convert_to_d3)
                .then(res.render('relacionamento', { title: filetod3}))
                .catch(function (err) {
                    console.log(err);
                });
        });

    session
    var result = session
        .run(
            'MATCH (:Proponentes)-[f:LIGADOS]-(:Projeto)\
        DELETE f'
        )
    session

}

function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

router.get('/:proponente', get_relacionamento)
module.exports = {
    relacionamentoRoutes: router,
    get_relacionamento: get_relacionamento
}
