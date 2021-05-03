'use strict'

const mongoose= require('mongoose')
const{mongoDB}=require('./data')

mongoose.connect(mongoDB.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db=>console.log(`Conexion establecida`))
    .catch(err => console.log(`problemas ${err}`))
