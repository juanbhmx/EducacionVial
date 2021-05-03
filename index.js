'use strict'

const express=require('express')
const port=(process.env.PORT || 4000)
const path=require('path')
const cors=require('cors')

const app =express()
require('./app/config/connection')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'/app/upload')))
app.use('/', require('./app/routes/Uploadimage'))
app.use('/', require('./app/routes/crudDocument'))
app.use('/', require('./app/routes/crudContacto'))
app.use('/', require('./app/routes/crudAcerca'))

app.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }else{
        console.log(`Server running on port ${port}`)
    }
})