var assert = require('chai').assert;
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var request = require('request');
var wagner = require('wagner-core');
var bodyparser = require('body-parser');

var URL_ROOT = 'http://localhost:3000';

describe('Testing database', function() {
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
        {_id: "Test3", object1: {item1: "item9", item2: "item2"}},
        {_id: "Test4", object1: {item1: "item1", item2: "item2"}},
        {_id: "Test5", object1: {item1: "item9", item2: "item2"}, num: 999},
        {_id: "Test6", object1: {item1: "item9", item2: "item2"}, num: 999},
        {_id: "Test7", object1: {item1: "item9", item2: "item2"}, num: 998},
        {_id: "Test8", object1: {item1: "item9", item2: "item2"}, num: 999}
    ];

    ModelTest.create(modelTest, function(error) {
      assert.ifError(error);
      done();
    });


  });


  it('Test findOne', function(done) {

        ModelTest.findOne({ _id: "Test1"}, function(err, model){
              if(err)
                  return done(err);

              assert.deepEqual(model._id, "Test1");
              done();


        });
    
  });

  it('Test findMany', function(done) {
      ModelTest.find({ "object1.item1": "item1"}, function(err, model){
              if(err)
                  return done(err);

              assert.equal(model.length , 3);
              done();


        });
    
  });

  it('Test Update One', function(done) {

      ModelTest.findOne({ _id: "Test1"}, function(err, model){
              if(err)
                  return done(err);
              
              model._id = "itemUpdated";

              model.save(function(err, modUpdated){
                    if(err)
                      return done(err);

                    assert.equal(modUpdated._id , "itemUpdated");
                    done();
              });
              
        });
    
  });

  it('Test Update Many', function(done) {

      ModelTest.update({ num: 999},{num: 777},{multi: true}, function(err, numAffected){
              if(err)
                  return done(err);
              
              assert.equal(numAffected.n, 3);
              done();
              
        });
    
  });

  it('Test remove', function(done) {
       ModelTest.find({num: 999}).remove().exec(function(err, numAffected){
              if(err)
                  return done(err);
              
              assert.equal(numAffected.result.n, 3);
              done();
              
        });
    
  });

 

});