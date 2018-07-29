const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PasswordFormatSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
  }, { versionKey: false });
  var PasswordFormatModel=mongoose.model('predefinedPasswords',PasswordFormatSchema);
  module.exports=PasswordFormatModel