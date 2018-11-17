var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'eps'));
var session = driver.session();
var fs = require('fs');
const fetch = require('node-fetch');
    
/* GET home page. */
//Alterar quantidade por count

router.get('/', function (req, res, next) {
    fetch("http://68.183.107.229:8000/projeto/?limit=&offset=0").then((res)=>{
        return res.json();
    }).then((json)=>{
        total = json.count;
        reminder = total % 100;
        total = parseInt(total/100);
        total = total + 1;

        for(let page_number = 0; page_number < total; page_number++) {
            url = "http://68.183.107.229:8000/projeto/?limit=&offset=" + (page_number*100)
    
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

        res.send("teste projetos");
});


module.exports = router;