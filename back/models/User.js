const mongoose=require('mongoose');
const PasswordSchema=require('./PasswordObject');
const UserSchema=new mongoose.Schema({
    isVerified:{
        type:Boolean,
        default:false
    },
    resendAllowed:{
        type:Boolean,
        default:true
    },
    name:{
        type:String,
        default:"User"
    },
    accountType:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String
    },
    passwords:{
        type:[PasswordSchema],
        default:[],
    }
},{ versionKey: false });
var UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;