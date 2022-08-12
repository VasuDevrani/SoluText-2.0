const mongoose = require("mongoose");

const TranslateSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  oriText: {
    type: String,
    require: true,
  },
  transText: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true
  },
  to:{
    type: String,
    require: true
  }
});

const TransModel = mongoose.model("TransModel", TranslateSchema);

module.exports = TransModel;
