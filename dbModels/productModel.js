import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    SKU:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:100,
        minLength:2
    },
    
    price:{
        type:Number,
        required:true,
        trim:true,
        min:0
    },

    category:{
        type:String,
        enum:["Clothing","Books","Gadgets","Sports"],        
        required:true,
        trim:true,
        minLength:2,
        maxLength:64,
    }

})

export const ProductModel = mongoose.model("product",productSchema);