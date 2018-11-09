var express = require('express');
var router = express.Router();
var data_movie = require('../public/javascripts/movie_complete.json');
/* GET home page. */
router.get('/', function(req, res, next) {
    function idIndex(a,id) {
        for (var i=0;i<a.length;i++) {
          if (a[i].id == id) return i;}
        return null;
      }
    
      
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
      
      var fs = require('fs');
    
      fs.writeFileSync('public/javascripts/graph_d3.json', JSON.stringify(viz));
    
        console.log("Arquivo salvo");  
    res.send('Carregar arquivo');
});

module.exports = router;
