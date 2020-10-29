const express = require('express')
const router = new express.Router()
const comment=require('../controllers/comments_controller')
const Places=require('../models/places')
const Comments=require('../models/comments_reviews')
const comments = require('../models/comments_reviews')

Places.hasMany(Comments)
Comments.belongsTo(Places)

//get all comments of a place
router.get('/comments/:id',comment.get)

//add comment
router.post('/comments',comment.create)

//update comment
router.put('/comments/:id',comment.update)

//delete comment
router.delete('/comments/:id',comment.delete)

//delete all lace comments
router.delete('/place_comments/:place_id',comment.deleteAll)
module.exports=router