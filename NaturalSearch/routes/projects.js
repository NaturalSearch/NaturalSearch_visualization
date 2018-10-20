var express = require('express');
var router = express.Router();
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("neo4j", "eps"));
const session = driver.session();

router.get('/', function(req, res, next) {
  var fs = require('fs');
  var json;

  for (var i = 1; i <= 2; i++) {
    file_name = "projetos" + i + ".json";
    json = JSON.parse(fs.readFileSync('./projetos/' + file_name, 'utf8'));
    for (var j = 0; j < json.quantidade ; j++) {
      session.run(
        'CREATE (a:Project {projetos_id: $projetos_id, ' +
          'area: $area, ' +
          'segmento: $segmento, ' +
          'valor_aprovado: $valor_aprovado, ' +
          'cgccpf: $cgccpf, ' +
          'ano_projeto: $ano_projeto, ' +
          'UF: $uf, ' +
          'enquadramento: $enquadramento, ' +
          'valor_proposta: $valor_proposta, ' +
          'valor_projeto: valor_projeto, ' +
          'valor_solicitado: $valor_solicitado, ' +
          'mecanismo: $mecanismo, ' +
          'nome: $nome, ' +
          'data_inicio: data_inicio, ' +
          'proponente: $proponente, ' +
          'valor_captado: $valor_captado, ' +
          'PRONAC: $pronac,  ' +
          'municipio: $municipio,  ' +
          'data_termino: $data_termino})',
        {projetos_id: json.projetos[j].projetos,
          area: json.projetos[j].area,
          segmento: json.projetos[j].segmento,
          valor_aprovado: json.projetos[j].valor_aprovado,
          cgccpf: json.projetos[j].cgccpf,
          ano_projeto: json.projetos[j].ano_projeto,
          uf: json.projetos[j].UF,
          enquadramento: json.projetos[j].enquadramento,
          valor_proposta: json.projetos[j].valor_proposta,
          valor_projeto: json.projetos[j].valor_projeto,
          valor_solicitado: json.projetos[j].valor_solicitado,
          mecanismo: json.projetos[j].mecanismo,
          nome: json.projetos[j].nome,
          data_inicio: json.projetos[j].data_inicio,
          proponente: json.projetos[j].proponente,
          valor_captado: json.projetos[j].valor_captado,
          pronac: json.projetos[j].PRONAC,
          municipio: json.projetos[j].municipio,
          data_termino: json.projetos[j].data_termino}
      );
      console.log(json.projetos[j].nome);
    }
  }
  session.close();
  driver.close();
  res.send("fdp do cacete!!!!!");
});


/*
const personName = 'Alice';
const resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: personName}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});
*/
module.exports = router;
