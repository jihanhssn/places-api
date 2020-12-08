const { ErrorHandler } = require('../handlers/errorHandler')
const db = require('../models/index')
const Comments = db.comments
const Places = db.places
const comments_dao = {}

//read comment
comments_dao.get = async (comment_id) => {
    const comment = await Comments.findByPk(comment_id)
    if (!comment) {
        throw new ErrorHandler(404, "not found!")
    }
    return comment
}

//list place comments
comments_dao.listComments = async (place_id) => {

    return await Comments.findAll({ where: { place_id: place_id } })
}

//create comment
comments_dao.create = async (comment1) => {
    const comment = await Comments.build(comment1)
    return await comment.save()
}

//update comment
comments_dao.update = async (comment_id, commentData) => {
    return await Comments.update({
        comment: commentData.comment
    }, {
        where: {
            comment_id: comment_id
        }
    })
}


//delete comment
comments_dao.delete = async (comment_id) => {

    return await Comments.destroy({
        where: {
            comment_id: comment_id
        }
    })
}

//delete all comments
comments_dao.deleteAll = async (place_id) => {
    return await Comments.destroy({ where: { place_id: place_id } })
}

module.exports = comments_dao
