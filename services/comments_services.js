const comments_dao = require('../data_access/comments_dao')
const commentsDAO = require('../data_access/comments_dao')
const { ErrorHandler } = require('../handlers/errorHandler')
const db = require('../models/index')
const Places = db.places
const Comments = db.comments
let comments_service = {}

//read a comment
comments_service.get = async (comment_id) => {
    const comment = commentsDAO.get(comment_id)
    return comment

}


//list place comments
comments_service.listComments = async (place_id) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    const place_comments = await commentsDAO.listComments(place_id)
    return place_comments
}

//add comment
comments_service.create = async (comment1) => {
    const place = await Places.findByPk(comment1.place_id)
    if (!place) {
        throw new ErrorHandler(404, "you cannot comment on a place that does not exist!")
    }
    const comment = await commentsDAO.create(comment1)
    return comment

}

//update comment
comments_service.update = async (comment_id, commentData) => {
    const updates = Object.keys(commentData)
    const allowedUpdates = ['comment']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidUpdate)
    if (!isValidUpdate) {
        throw new ErrorHandler(404, "invalid update!")
    }
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found")
    }
    const updatedComment = await commentsDAO.update(comment_id, commentData)
    return updatedComment
}

//delete comment
comments_service.delete = async (comment_id) => {
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found!")
    }
    const deletedComment = commentsDAO.delete(comment_id)
    return deletedComment
}

//delete all place comments
comments_service.deleteAll = async (place_id) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, 'no place found')
    }
    const comments = await commentsDAO.deleteAll(place_id)
    return comments
}


module.exports = comments_service