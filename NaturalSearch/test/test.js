var request = require('supertest');
var app = require('../app');
  
describe('Get the urls is working', function(){
    it('test if the index is working', function(done){
      request(app)
        .get('/')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
    it('test if the example is working', function(done){
        request(app)
          .get('/example')
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            done()
          });
      })
      it('test if the load_json is working', function(done){
        request(app)
          .get('/load_json')
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            done()
          });
      })
      it('test if the results is working', function(done){
        request(app)
          .get('/result')
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            done()
          });
      })
    });


  