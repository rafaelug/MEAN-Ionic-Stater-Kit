var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
var api = express.Router();

  api.use(bodyparser.json());

  api.get('/test/:id', wagner.invoke(function(ModelTest, Security) {
    return function(req, res) {
      
      var input = Security.inputCheck('Alphanumeric', req.params.id) ? req.params.id : false;
      

      if(input){
         ModelTest.findOne({ _id: input}, function(error, model) {
            if (error) {
              return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: error.toString() });

            }
            if (!model) {
              return res.
                status(status.NOT_FOUND).
                json({ error: 'Not found' });
            }

            res.json({model:model._id});
      });

      }else{
          res.json({ model: "error" });

      }
     


    };
  }));


return api;

}