// declaração de packges
var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();

//definição de arquivos html e staticos
app.use('/static',express.static('public'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//actions
app.get('/home', function(req, resp) {
  resp.sendFile('home.html', {root: path.join(__dirname, 'views')});
})

app.get('/example', function(req, resp) {
  resp.sendFile('example.html', {root: path.join(__dirname, 'views')});
})

app.get('/', function(req, res){
  session
    .run("MATCH (n) RETURN n LIMIT 25")
    .then(function(result){
      result.records.forEach(function(record){
        //console.log(JSON.stringify(record));
      });
    })
    .catch(function(err){
      console.log(err);
    });
  res.send('Ae carai');
});

var test = require('./public/img/movie.json');
//console.log(JSON.stringify(test));


app.get('/teste', function(req, res){
  
  function idIndex(a,id) {
    for (var i=1;i<a.length;i++) {
      if (a[i].id == id) return i;}
    return null;
  }
  var nodes=[], links=[];
  test.results[0].data.forEach(function (row) {
     row.graph.nodes.forEach(function (n) {
       if (idIndex(nodes,n.id) == null)
        nodes.push({id:n.id,label:n.labels[0],title:n.properties.name});
     });
     links = links.concat( row.graph.relationships.map(function(r) {
       return {start:idIndex(nodes,r.startNode),end:idIndex(nodes,r.endNode),type:r.type};
     }));
  });
  res.send('porraaa')
  viz = {nodes:nodes, links:links};
  
  //create a new file json to use in d3
  var fs = require('fs');

  fs.writeFileSync('movied3.json', JSON.stringify(viz));

    console.log("Arquivo salvo");
}); 




app.listen(3000, function() {
  console.log('Listening at port 3000');
});