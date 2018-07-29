const mongoose=require('mongoose');
const tokenSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: { 
        type: String,
         required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            expires:86400 // 24 hours
        }
},{ versionKey: false });
var TokenModel=mongoose.model('tokens',tokenSchema);
module.exports=TokenModel;