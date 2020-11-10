const { ErrorHandler } = require('../handlers/errorHandler')
const db=require('../models/index')
const Comments=db.comments
const Places=db.places
const comments_dao={}

//read comment
comments_dao.get=async(comment_id)=>{
    const comment=await Comments.findByPk(comment_id)
    if(!comment){
        throw new ErrorHandler(404,"not found!")
    }
    return comment
}

//create comment
comments_dao.create=async(comment1)=>{
    const place = await Places.findByPk(comment1.place_id)
    if (!place) {
        throw new ErrorHandler(404, "you cannot comment on a place that does not exist!")
    }
    const comment = Comments.build(comment1)
    return await comment.save()
}

//update comment
comments_dao.update=async(comment_id,commentData)=>{
    const updates = Object.keys(commentData)
    const allowedUpdates = ['comment']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        throw new ErrorHandler(404, "invalid update!")
    }
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found")
    }
    updates.forEach((update) => {
        comment[update] = commentData[update]
    })
    return await comment.save()
}


//delete comment
comments_dao.delete=async(comment_id)=>{
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found!")
    }
    return await comment.destroy()
}

//delete all comments
comments_dao.deletAll=async()=>{
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, 'no place found')
    }
    return await Comments.destroy({where:{place_id:place_id}})
}

module.exports=comments_dao
