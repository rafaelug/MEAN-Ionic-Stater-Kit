/*
Aqui se agregan los modelos a wagner para hacerlos accesibles en el codigo sin necesidad
llamar require
*/

var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/test');

  wagner.factory('db', function() {
    return mongoose;
  });

  var Category =
    mongoose.model('Category', require('./models/category'), 'categories');
  var User =
    mongoose.model('User', require('./models/user'), 'users');
  var ModelTest =
    mongoose.model('ModelTest', require('./models/modelTest'), 'modelTest');

  var models = {
    Category: Category,
    User: User,
    ModelTest: ModelTest
  };

  // DRY-ness, para registrar los modelos.
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  wagner.factory('Product', require('./models/product'));

  return models;
};
