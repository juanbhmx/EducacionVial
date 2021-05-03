'use strict'

const mongoose=require('mongoose')
const Schema = mongoose.Schema

const Image= new Schema({
    fileName:{type:String},
    descripcion:{type:String},
    urlFile:{type:String},
    dateUpload:{type:Date,default: Date.now()},
    
})
module.exports=mongoose.model('Image',Image)

