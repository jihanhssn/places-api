const express = require('express')
const router = new express.Router()
const comment=require('../controllers/comments_controller')



//get all comments of a place
router.get('/comments/:id',comment.get)

//read place comments
router.get('/place_comments/:id', comment.listComments)

//add comment
router.post('/comments',comment.create)

//update comment
router.put('/comments/:id',comment.update)

//delete comment
router.delete('/comments/:id',comment.delete)

//delete all lace comments
router.delete('/place_comments/:place_id',comment.deleteAll)
module.exports=router