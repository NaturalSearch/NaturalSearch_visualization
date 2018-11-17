var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
    
    
/* GET home page. */

router.get('/', function (req, res, next) {

    fetch("http://68.183.107.229:8000/proponente/?limit=100&offset=").then((res)=>{
        return res.json();
    }).then((json)=>{
        total = json.count;
        reminder = total % 100;
        total = parseInt(total/100);
        total = total + 1;
        for(let page_number = 0; page_number < total; page_number++) {
            url = "http://68.183.107.229:8000/proponente/?limit=100&offset=" + (page_number*100)
    
            fetch(url).then((res)=>{
                return res.json();
            }).then((json)=>{
                elements_quantity = 100;
                if (json.next == null) {
                    elements_quantity = reminder;
                }
                for(let json_position = 0; json_position < elements_quantity; json_position++) {
                    console.log(json.results[json_position].url);
                }
            })
        }
    })

    res.send("Carregando todos os proponentes!");
});


module.exports = router;
