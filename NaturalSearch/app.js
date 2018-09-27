var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

app.use('/static',express.static('public'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/home', function(req, resp) {
  resp.sendFile('home.html', {root: path.join(__dirname, 'views')});
})

app.get('/example', function(req, resp) {
  resp.sendFile('example.html', {root: path.join(__dirname, 'views')});
})

var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j','123'));
var session = driver.session();

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

app.listen(3000, function() {
  console.log('Listening at port 3000');
});