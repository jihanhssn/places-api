const comments_dao = require('../data_access/comments_dao')
const commentsDAO=require('../data_access/comments_dao')
let comments_service = {}

//read a comment
comments_service.get = async (comment_id) => {
    const comment=commentsDAO.get(comment_id)
    return comment

}

//add comment
comments_service.create = async (comment1) => {
    const comment= commentsDAO.create(comment1)
    return comment
    
}

//update comment
comments_service.update = async (comment_id, commentData) => {
    const updatedComment=commentsDAO.update(comment_id, commentData)
    return updatedComment
}

//delete comment
comments_service.delete = async (comment_id) => {
    const deletedComment=commentsDAO.delete(comment_id)
    return deletedComment
}

//delete all place comments
comments_service.deleteAll = async (place_id) => {
    const comments=comments_dao.deleteAll(place_id)
    return comments
}


module.exports = comments_service