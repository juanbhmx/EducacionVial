'use strict'

const mongoose=require('mongoose')
const Schema = mongoose.Schema

const contacto= new Schema({
    Desarrollador:{type:String},
    Email:{type:String},
    Telefono:{type:String},
    Direccion:{type:String}   
})
module.exports=mongoose.model('contacto',contacto)

