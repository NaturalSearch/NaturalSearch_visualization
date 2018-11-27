var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();


/* GET home page. */
router.get('/', function(req, res, next) {
  search_result = req.query.q;

  session
    .run("MATCH (project:Projeto) RETURN count(distinct project.nome) as Total_Projetos, \
          count(distinct project.proponente) as Total_Proponentes, \
          round(SUM (toFloat(project.valor_captado))) as Total_Captado")
      .then(function(result){
          var list_result = [];
          result.records.forEach(function (record) {
            list_result.push({Total_projetos: record.get('Total_Projetos'),
                              Total_Proponentes: record.get('Total_Proponentes'),
                              Total_Captado: record.get('Total_Captado')
                            });
      //console.log(list_result);  
      });
     
    
    session
    .run("MATCH (project:Projeto) RETURN project.nome as Projeto , project.proponente as Proponente ,  \
          SUM (toFloat(project.valor_captado)) \
          as Total_Captado ORDER BY Total_Captado DESC LIMIT 7")
      .then(function(result2){
    var list_result2 = [];
          result2.records.forEach(function (record) {
            list_result2.push({Projeto: record.get('Projeto'),
                              Proponente: record.get('Proponente'),
                              Total_Captado: record.get('Total_Captado')
                            });
      //console.log(list_result2);  
      });
     
         // % Result AREA
              session
              .run("MATCH (n:Projeto) WITH SUM (toFloat(n.valor_captado)) as Valor_Total_Captado \
                    MATCH (b:Projeto) RETURN b.area as Area, \
                    round((SUM (toFloat(b.valor_captado))) / Valor_Total_Captado * 100) as Percentual order by Area")
              .then(function(result3){
                  var list_result3 = [];
                  for(i=0; i < 8 ;i++){
                      list_result3.push(result3.records[i]._fields[1] );
                  
                  }
                //console.log(list_result3); 
              session.close();
              
              

              // % Result Quantidade de projetos por área
              session
              .run("MATCH (b:Projeto) \
                    RETURN b.area as Area, count(b.nome) as Total_Area order by Area")
              .then(function(result4){
                var list_result4 = [];
                for(i=0; i < 8 ;i++){
                    list_result4.push(result4.records[i]._fields[1] );
                
                } 
                //console.log(list_result4); 
              session.close();
              res.render('index', { list_result: list_result ,  
                                    list_result2: list_result2 , 
                                    list_result3: list_result3 , 
                                    list_result4: list_result4 ,
                                    title: 'Express' });
              })
      })
    })
    })
  .catch(function(err){
  console.log(err);
  });
 
});

module.exports = router;
