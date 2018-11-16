var express = require('express');
var router = express.Router();
const request = require('request');



/* GET home page. */

router.get('/', function(req, res, next) {
    request('http://68.183.107.229:8000/projeto/?limit=100&offset=100',function (error, response, body){
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode); 
        var json = JSON.parse(body);
        
        console.log(json.count);
        console.log('projetos_id:', json.results);
    })
  res.render('projetos', { title: 'Express' });
});

module.exports = router;