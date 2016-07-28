var mongoose = require('mongoose');

var modelTestSchema = {
  _id:          { type: String },
  object1:      { item1: String,item2: String },
  arrayObject:  [{ type: String }],
  date:         { type: Date, default: Date.now },
  flag:         Boolean,
  num:          Number
};

module.exports = new mongoose.Schema(modelTestSchema);
module.exports.modelTestSchema = modelTestSchema;