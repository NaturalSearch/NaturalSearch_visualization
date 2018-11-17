var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
    
    
/* GET home page. */

router.get('/', function (req, res, next) {

    fetch("http://68.183.107.229:8000/proponente/?limit=100&offset=0").then((res)=>{
        return res.json();
    }).then((json)=>{
    total = json.count;
    reminder = total % 100;
    total = parseInt(total/100);
    total = total + 1;
    for(let page_number = 0; page_number < total; page_number++) {
        url = "http://68.183.107.229:8000/proponente/?limit=100&offset=0" + (page_number*100)
            fetch(url).then((res)=>{
            return res.json();
        }).then((json)=>{
            console.log(json.results[0].url);
            console.log(json.results[1].url);
            //console.log(json);
            //console.log("outro");
        })
    }
})

    res.send("vai funcionar caramba");
});


module.exports = router;
