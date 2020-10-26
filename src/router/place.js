const express=require('express')
const multer =require('multer')
const sharp=require('sharp')
const router=new express.Router()
const Places=require('../models/places')
const connection=require('../db/sequelize')

const upload=multer({
  limits:{
      fileSize:1000000
  },
  fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
         return cb(new Error('please upload an image'))
      }
      cb(undefined,true)
  }
})
router.post('/places',upload.single('image'),async(req,res)=>{

  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  const place1={
    name:req.body.name,
    image:buffer
  }
 
  const existingPlace=await Places.findOne({where:{name:req.body.name}})
  if(existingPlace){
    return res.status(400).send({error:'Place already exist!'})  }

  try{
      const place=await Places.build(place1)
      const savedPlace=await place.save()
      res.send(savedPlace)
  }catch(e){
    res.status(400).send(e) 
   }
})

router.get('/places',async(req,res)=>{
  try{
    const places=await Places.findAll()
    res.send(places)
  }catch(e){
    res.status(500).send({error:e.message})
  }

})

router.put('/places/:id',upload.single('image'),async(req,res)=>{
  const updates=Object.keys(req.body)
  const allowedUpdates=['image','name']
  const isValidUpdate=updates.every((update)=> allowedUpdates.includes(update))
  if(!isValidUpdate){
      return res.status(404).send({error:"invalid Update!"})
  }
  try{
    const place=await Places.findByPk(req.params.id)

    if(!place){
      return res.status(400).send()
    }

    if(req.file){
      console.log("fdghj")
      const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
      place.image=buffer 
    }
   
    updates.forEach((update)=>{
      place[update]=req.body[update]
      })
      
  await place.save()
  res.send(place)
} catch(e){
  res.status(500).send(e)
  }
})

router.delete('/places/:id',async(req,res)=>{
  try{
    const place=await Places.findByPk(req.params.id)
    if(!place){
      return res.status(400).send({error:"no such a place!"})
    }
   await place.destroy()
    res.send()
}catch(e){
  res.status(500).send({error:e.message})
}
})

router.delete('/places',async(req,res)=>{
  try{
    Places.destroy({where:{}})
  res.send()
}catch(e){
  res.status(500).send(e)
}
})


router.delete('/places/image/:id',async(req,res)=>{
  try{
    const place=await Places.findByPk(req.params.id)
    
    if(!place){
      return res.status(400).send({error:'no such a place!'})
    }
    
    place.image=null
    const savedPlace=await place.save()
    res.send(savedPlace)


  }catch(e){
    res.status(500).send(e)
  }
})




router.get('/places/:id/image',async(req,res)=>{
  try{
  const place = await Places.findByPk(req.params.id)
  
  if(!place||!place.image){
      throw new Error("No Image !")
  }
  res.set('Content-Type','image/PNG')     //responce header to tell browser the type
  res.send(place.image)
}catch(e){
  res.status(400).send({error:"no image!"})
}
})




module.exports=router