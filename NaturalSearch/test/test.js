var request = require('supertest');
const assert = require('chai').assert;
var app = require('../app');
var index = require('../routes/index').get_proponente;
//var titleize = require('../routes/index').titleize;
var expect = require('chai').expect;
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://pat-dorris-springs-black.graphstory.services:7687", neo4j.auth.basic("pat_dorris_springs_black", "sfbzr75A1wvkMnGBWpdn8X5bCPi4q"));
var session = driver.session();



describe('Get the urls is working', function () {
  it('test if the status code of index is 200', function (done) {
    this.timeout(10000);
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        console.log(res.body)
        if (err) return done(err);
        done()
      });
  })
})
describe('Get the method index function', function () {
  it('test the method ', function (done) {
    this.timeout(10000);
    var request = {
      query: { q: 'teste' }
    }, response = {
      render: function (view, data) {
        try {
          expect(view).to.equal('index')
          expect(data.title).to.equal("Express")
          expect(data.list_result[0].Total_projetos.low).to.equal(87354)
          expect(data.list_result.length).to.equal(1)
          done()
        }
        catch(err){
          done(err)

        }
      }
    }
    index(request, response)
  })

  /*  
    it('test if the results is working', function (done) {
      request(app)
        .get('/result')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done()
        });
    })
   
  }); */

  describe('Test of the methos into users', function () {
    it('Test if the message of users is ok ', function () {
      return request(app)
        .get('/users')
        .then(function (response) {
          expect(response.text).to.contain('respond with a resource');
        })
    });

  });
})  
