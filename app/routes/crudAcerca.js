'use strict'
const router=require('express').Router()
const storage=require('../config/multer')
const multer= require('multer')
const acerca = require('../models/acerca')
const uploader=multer({storage})

router.post('/InserAcerca',uploader.single('file'),async(req,res)=>{
    const {file,body}= req
    if(body){
        const newAcerca = new acerca({
            institucion:body.institucion,
            descripcion:body.descripcion,
            mision:body.mision,
            vision:body.vision
        })
        await newAcerca.save()
        res.json({
            newAcerca:newAcerca
        })
    }    
})

router.get('/Readacerca', async(req,res)=>{
    const con=await acerca.find()
    res.json(con)
})

router.get('/delAcerca/:id', async(req,res)=>{
    const fileName= req.params.id  
    console.log(fileName)
    try{
        const Img = await acerca.findByIdAndDelete({_id:fileName})

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