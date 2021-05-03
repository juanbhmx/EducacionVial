'use strict'

const mongoose=require('mongoose')
const Schema = mongoose.Schema

const documents= new Schema({
    fileName:{type:String},
    descripcion:{type:String},
    urlFile:{type:String},
    dateUpload:{type:Date,default: Date.now()},
    
})
module.exports=mongoose.model('documents',documents)

