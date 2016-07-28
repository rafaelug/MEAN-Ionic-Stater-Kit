var assert = require('chai').assert;
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var request = require('request');
var wagner = require('wagner-core');
var bodyparser = require('body-parser');

var URL_ROOT = 'http://localhost:3000';

describe('Testing /test route', function() {
  var server;
  var app;

  var ModelTest;

  before(function() {
    app = express();

    // Bootstrap server
    models = require('../models')(wagner);
    dependencies = require('../dependencies')(wagner);

    // Make models available in tests
    var deps = wagner.invoke(function(ModelTest) {
      return {
        ModelTest: ModelTest
      };
    });

    ModelTest = deps.ModelTest;

    app.use(function(req, res, next) {
        next();
    });

    app.use(require('../routes/test')(wagner));

    server = app.listen(3000);

  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure categories are empty before each test
    ModelTest.remove({}, function(error) {
      assert.ifError(error);
      done();
    });
  });

  beforeEach(function(done) {
    var modelTest = [
        {_id: "Test1", object1: {item1: "item1", item2: "item2"}},
        {_id: "Test2", object1: {item1: "item1", item2: "item2"}},
        {_id: "Test3", object1: {item1: "item1", item2: "item2"}},
        {_id: "Test4", object1: {item1: "item1", item2: "item2"}}
    ];

    ModelTest.create(modelTest, function(error) {
      assert.ifError(error);
      done();
    });

  });


  it('Can reach get -> /test', function(done) {
    this.timeout(10000);

    var url = URL_ROOT + '/test/Test1';
    

    request.get(url, function(error, res, body){
        if(error)
          return done(error);

        assert.equal(res.statusCode, 200);  
        assert.deepEqual(body, JSON.stringify({model:'Test1'}));

        done();

    });
    
  });

  it('Null values', function(done) {
    this.timeout(10000);

    var url = URL_ROOT + '/test/#';
    
    request.get(url, function(error, res, body){
        if(error)
          return done(error);

        assert.equal(res.statusCode, status.NOT_FOUND);   
        done();

    });
    
  });

  it('Exploit values', function(done) {
    this.timeout(10000);

    var url = URL_ROOT + '/test/Test1,{}+_)(*&^%$#@)';
    
    request.get(url, function(error, res, body){
        if(error)
          return done(error);

        assert.equal(res.statusCode, status.BAD_REQUEST); 
        done();

    });
    
  });

  it('Large values', function(done) {
    this.timeout(10000);

    var block = "Test1".repeat(100000);
    var url = URL_ROOT + '/test/' + block ;
  
    request.get(url, function(error, res, body){

        assert.equal( error.code, 'ECONNRESET'); 
        
        done();

    });
    
  });

  
});