const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
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
        default:""
    },
    title:{
        type:String,
        default:""
    },
    username:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastModifiedOn: {
        type: Date,
        default: Date.now()
    }

}, { versionKey: false });
module.exports = PasswordSchema;