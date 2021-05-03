'use strict'

const mongoose=require('mongoose')
const Schema = mongoose.Schema

const acerca= new Schema({
    institucion:{type:String},
    descripcion:{type:String},
    mision:{type:String},
    vision:{type:String}
})
module.exports=mongoose.model('acerca',acerca)

