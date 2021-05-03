'use strict'
const router=require('express').Router()
const storage=require('../config/multer')
const multer= require('multer')
const contacto = require('../models/contacto')
const uploader=multer({storage})

router.post('/InserContacto',uploader.single('file'),async(req,res)=>{
    const {file,body}= req
    if(body){
        const newContacto = new contacto({
            Desarrollador:body.Desarrollador,
            Email:body.Email,
            Telefono:body.Telefono,
            Direccion:body.Direccion
        })
        await newContacto.save()
        res.json({
            newContacto:newContacto
        })
    }    
})

router.get('/Readcontacto', async(req,res)=>{
    const con=await contacto.find()
    res.json(con)
})

router.get('/delContacto/:id', async(req,res)=>{
    const fileName= req.params.id  
    console.log(fileName)
    try{
        const Img = await contacto.findByIdAndDelete({_id:fileName})

        if(Img){
            console.log("eliminado")
        }else{
            console.log("no eliminado")
        }
    }catch(error){
        console.log(error)
    }
})

module.exports=router