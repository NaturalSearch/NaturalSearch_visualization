var request = require('supertest');
const assert = require('chai').assert;
var app = require('../app');
var index = require('../routes/index');
//var titleize = require('../routes/index').titleize;
var expect = require('chai').expect;

//get the return of the function of the index.js
function titleize(text) {

  text = text.charAt(0).toUpperCase() + text.slice(1);

  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) === " ") {
      var charToUper = text.charAt(i + 1).toUpperCase();
      var sliceBegin = text.slice(0, (i + 1));
      var sliceEnd = text.slice(i + 2);
      text = sliceBegin + charToUper + sliceEnd;
    }
  }
  return text;
}

describe('Get the urls is working', function () {
  it('test if the index is working', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
  })
  it('test if the example is working', function (done) {
    request(app)
      .get('/example')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
  })
  it('test if the example is not working', function (done) {
    request(app)
      .get('/example404')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
  })
  it('test if the load_json is working', function (done) {
    request(app)
      .get('/load_json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
  })
  /*it('test if the results is working', function (done) {
    request(app)
      .get('/result')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
  })*/
});


describe('Test of the methos into load_json', function () {
  it('Test if the message of load_json is ok ', function () {
    return request(app)
      .get('/load_json')
      .then(function (response) {
        expect(response.text).to.contain('Carregar arquivo');
      })
  });

});

describe('Test of the methos into users', function () {
  it('Test if the message of users is ok ', function () {
    return request(app)
      .get('/users')
      .then(function (response) {
        expect(response.text).to.contain('respond with a resource');
      })
  });

});

describe('Test of the methos into index', function () {
  it('test titleize method', function (done) {
    assert.equal(titleize('teste unitario'), 'Teste Unitario')
    done();
  })
});

