//packges
var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','eps'));
var session = driver.session();
var url = require('url');

//define static engine
app.use('/static',express.static('public'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//
function titleize(text) {
  // change the first letter to upper.
  text = text.charAt(0).toUpperCase() + text.slice(1);

  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) ===" ") {
        var charToUper = text.charAt(i+1).toUpperCase();
        var sliceBegin = text.slice(0, (i+1));
        var sliceEnd = text.slice(i + 2);
        text = sliceBegin + charToUper + sliceEnd;
    }
  }
  return text;
}


//actions
app.get('/result', function(req, resp) {
  resp.sendFile('result.html', {root: path.join(__dirname, 'views')});

})

app.get('/home', function(req, resp) {
  resp.sendFile('home.html', {root: path.join(__dirname, 'views')});
  console.log(req.query.q);
  search_result = req.query.q;
  
  if(search_result!=null){
    search_result=titleize(search_result);
    console.log(search_result);
  }
  
  //uppercase the first letter of some words
  session
  .run("MATCH (p:Person) WHERE ANY(prop in keys(p) where TOSTRING(p[prop]) CONTAINS '"+ search_result+ "')RETURN p;")
  .then(function(result){
    result.records.forEach(function(record){
      list_result = [];
      list_result.push(record._fields[0].properties.name,
                       record._fields[0].properties.born.low);
      console.log(list_result);  
    });
  })
  .catch(function(err){
    console.log(err);
  });
})


app.get('/example', function(req, resp) {
  resp.sendFile('example.html', {root: path.join(__dirname, 'views')});
})


//console.log(JSON.stringify(test));
var data_movie = require('./public/img/movie_complete.json');

app.get('/load', function(req, res){
  
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
      return {source:r.startNode,target:r.endNode,value:30};
    }));
    viz = {nodes:nodes, links:links};
  });
  
  //create a new file json to use in d3
  var fs = require('fs');

  fs.writeFileSync('public/img/graph_d3.json', JSON.stringify(viz));

    console.log("Arquivo salvo");
}); 




app.listen(3000, function() {
  console.log('Listening at port 3000');
});