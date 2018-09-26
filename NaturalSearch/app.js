var express = require('express');
var path = require('path');
var app = express();
app.use('/static',express.static('public'))

app.get('/home', function(req, resp) {
  resp.sendFile('home.html', {root: path.join(__dirname, 'views')});
})

app.get('/example', function(req, resp) {
  resp.sendFile('example.html', {root: path.join(__dirname, 'views')});
})
app.listen(3000, function() {
  console.log('Listening at port 3000');
});