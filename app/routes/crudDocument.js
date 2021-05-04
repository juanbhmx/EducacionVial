'use strict'

const router=require('express').Router()
const Document = require('../models/document')
const storage=require('../config/multer')
const multer= require('multer')

const uploader=multer({storage})

router.post('/UpDocument',uploader.single('file'),async(req,res)=>{
    const {file,body}= req
    if(file && body){
        const newDocument = new Document({
            fileName:body.name,
            descripcion:body.descripcion,
            urlFile:`http://localhost:4000/${file.filename}`
        })
        await newDocument.save()
        res.json({
            newDocument:newDocument
        })
    }
})

router.post('/UpdateDocument',uploader.single('file'),async(req,res)=>{
   const id=req.body.id
   const updateDate={
    fileName:req.body.name,
    descripcion:req.body.descripcion
   }
   Document.findByIdAndUpdate(id,{$set:updateDate})
   .then(()=>{
       res.json({
           message:"actualizado"
       })
   })
  
})


router.get('/downloadDocument', async(req,res)=>{
    const documents=await Document.find()
    res.json(documents)
})


router.get('/delDocument/:id', async(req,res)=>{
    const fileName= req.params.id  
    console.log(fileName)
    try{
        const Doc = await Document.findByIdAndDelete({_id:fileName})

        if(Doc){
            console.log("eliminado")
        }else{
            console.log("no eliminado")
        }

    }catch(error){
        console.log(error)
    }
})



module.exports=router