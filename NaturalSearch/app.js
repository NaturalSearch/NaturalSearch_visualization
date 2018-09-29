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

var data_movie = require('./public/img/movie_complete.json');

//console.log(JSON.stringify(test));


app.get('/teste', function(req, res){
  
  function idIndex(a,id) {
    for (var i=0;i<a.length;i++) {
      if (a[i].id == id) return i;}
    return null;
  }

  // capturar os dados dos filmes
  var nodes=[], links=[];
  data_movie.results[0].data.forEach(function (row) {
     row.graph.nodes.forEach(function (n) {
       if (idIndex(nodes,n.id) == null)
        group=n.labels[0];
        if (group=="Movie"){
            group=1;
          title=n.properties.title
          nodes.push({id:n.id,title:title,group:group});
        }else if (group=="Person"){
          group=2;
          name=n.properties.name;
          nodes.push({id:n.id,name:name,group:group});
        }
         
     });
     links = links.concat( row.graph.relationships.map(function(r) {
      return {source:r.startNode,target:r.endNode,value:20};
    }));
    viz = {nodes:nodes, links:links};
  });
  
  
  res.send("poraaa");
  
  //create a new file json to use in d3
  var fs = require('fs');

  fs.writeFileSync('movied3.json', JSON.stringify(viz));

    console.log("Arquivo salvo");
}); 




app.listen(3000, function() {
  console.log('Listening at port 3000');
});