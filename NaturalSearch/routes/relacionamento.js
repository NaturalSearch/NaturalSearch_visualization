var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');

        // get the data from neo4j
        
        session{
        $.ajax({
            url: "http://localhost:7474/db/data/transaction/commit",
            type: 'POST',
            data: JSON.stringify({ "statements": [{ "MATCH (p:Nó_Proponentes), (pr:Nó_Projeto) WHERE p.nome= "Marco de Vita Campos"
                                                             AND pr.proponente= "Marco de Vita Campos"
                                                             MERGE (p)-[f:LIGADOS]->(pr) RETURN p, f, pr": $('null').val() }] }),                
            contentType: 'application/json',
            accept: 'application/json; charset=UTF-8',
            success: function () { },
            error: function (jqXHR, textStatus, errorThrown) { $('#messageArea').html('<h3>' + textStatus + ' : ' + errorThrown + '</h3>') },
            complete: function () { }
        }).then(function (data) {

        }session



http -b -j localhost:7474/db/data/transaction/commit statements:='[{"statement": "MATCH (p:Nó_Proponentes), (pr:Nó_Projeto)\nWHERE p.nome=\"Marco de Vita Campos\" AND pr.proponente=\"Marco de Vita Campos\"\nMERGE (p)-[f:LIGADOS]->(pr)\nRETURN p, f, pr"", "parameters": { null }]'