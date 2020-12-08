const commentService = require('../services/comments_services')

const { setResponse, setErrorResponse } = require('../handlers/response')


//read a comment
exports.get = async (req, res) => {
    try {
        const comments = await commentService.get(req.params.id)
        return setResponse(res, 200, "list comments", comments)
    } catch (e) {
        if (e.message && e.statusCode) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res, e.message)
    }
}



//read place comments
exports.listComments = async (req, res) => {
    try {
        const place_comments = await commentService.listComments(req.params.id, res)
        setResponse(res, 200, "list place comments", place_comments)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}


//add comment
exports.create = async (req, res) => {
    try {
        const comment1 = {
            place_id: req.body.place_id,
            comment: req.body.comment
        }
        const comment = await commentService.create(comment1)
        return setResponse(res, 200, 'create comment', comment)
    } catch (e) {
        if (e.message && e.statusCode) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}

//update comment
exports.update = async (req, res) => {
    try {
        const comment = await commentService.update(req.params.id, req.body)
        setResponse(res, 200, 'update comment', comment)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res, e.message)
    }
}

//delete comment
exports.delete = async (req, res) => {
    try {
        const deletedComment = await commentService.delete(req.params.id)
        setResponse(res, 200, 'delete comment', deletedComment)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}

//delete all place comments
exports.deleteAll = async (req, res) => {
    try {
        const deletedCommets = await commentService.deleteAll(req.params.place_id)
        setResponse(res, 200, "delaet place comments", deletedCommets)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}
