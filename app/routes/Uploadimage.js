'use strict'
const router=require('express').Router()
const Image = require('../models/image')
const User = require('../models/usuario')
const storage=require('../config/multer')
const multer= require('multer')
const uploader=multer({storage})

router.post('/login',uploader.single('file'),async(req,res)=>{
    const userData = {
        email: req.body.email,
        password: req.body.password
      }
     User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server error!');
    
        if (!user) {
          // email does not exist
          res.send({ message: 'Datos Incorrectos' });
        } else {
          const resultPassword=userData.password;
          if (resultPassword) {     
            const dataUser = {
              name: user.name,
              email: user.email,
            }
            res.send({ dataUser });
          } else {
            // password wrong
            res.send({ message: 'Datos Incorrecto' });
          }
        }
      });
    
})
  
  

router.post('/upload',uploader.single('file'),async(req,res)=>{
    const {file,body}= req

    if(file && body){
        const newImage = new Image({
            fileName:body.name,
            descripcion:body.descripcion,
            urlFile:`http://localhost:4000/${file.filename}`
        })
        await newImage.save()
        res.json({
            newImage:newImage
        })
    }
    
})



router.get('/download', async(req,res)=>{
    const images=await Image.find()
    res.json(images)
})

router.get('/delete/:id', async(req,res)=>{
    const fileName= req.params.id  
    console.log(fileName)
    try{
        const Img = await Image.findByIdAndDelete({_id:fileName})

        if(Img){
            console.log("eliminado")
        }else{
            console.log("no eliminado")
        }
    }catch(error){
        console.log(error)
    }
})

router.post('/UpdatePicture',uploader.single('file'),async(req,res)=>{
  const id=req.body.id
  const updateDate={
   fileName:req.body.name,
   descripcion:req.body.descripcion
  }
  Image.findByIdAndUpdate(id,{$set:updateDate})
  .then(()=>{
      res.json({
          message:"actualizado"
      })
  })
})





module.exports=router