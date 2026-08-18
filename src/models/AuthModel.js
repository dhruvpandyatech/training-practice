import mongoose, { mongo } from "mongoose";

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        maxLength:64,
        required:true,
        trim:true
    },
     email:{
        type:String,
        unique:true,
        maxLength:264,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin','seller'],
        required:true,
        trim:true,
        maxLength:10,
        default:'user'
    },
    password:{
        type:String,
        minLength:6,
        maxLength:128,
        required:true
    }
});

const AuthModel = mongoose.model('auth',authSchema);
export default AuthModel;