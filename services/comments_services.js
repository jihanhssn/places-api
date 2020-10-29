const Places = require('../models/places')
const Comments = require('../models/comments_reviews')
const {ErrorHandler} = require('../handlers/errorHandler')
let comments_service = {}

//read a comment
comments_service.get = async (comment_id) => {
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found")
    }
    return comment

}

//add comment
comments_service.create = async (comment1) => {

    const place = await Places.findByPk(comment1.place_id)
    if (!place) {
        throw new ErrorHandler(404, "you cannot comment on a place that does not exist!")
    }
    const comment = Comments.build(comment1)
    return await comment.save()

}

//update comment
comments_service.update = async (comment_id, commentData) => {
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
comments_service.delete = async (comment_id) => {
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found!")
    }
    return await comment.destroy()

}

//delete all place comments
comments_service.deleteAll = async (place_id) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, 'no place found')
    }
    // const comments=await Comments.findAll({where:{place_id}})
    // if(comments.length==0){
    //     throw new ErrorHandler(404,'no comments!')
    // }
    return await Comments.destroy({where:{place_id:place_id}})
}


module.exports = comments_service