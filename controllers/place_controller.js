const path = require('path')
const placeServices = require('../services/places_services')
const { setResponse, setErrorResponse } = require('../handlers/response')

//create place
exports.create = async (req, res) => {
    try {
        const place = await placeServices.create(req.body, req.file)
        setResponse(res, 200, "create place", place)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res, 500, e.message)
    }
}


//read all places
exports.list = async (req, res) => {
    try {
        const places = await placeServices.list()
        setResponse(res, 200, "list places", places)
    } catch (e) {
        if (e.statusCode, e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}

//read place comments
exports.listComments = async (req, res) => {
    try {
        const place_comments = await placeServices.listComments(req.params.id, res)
        setResponse(res, 200, "list place comments", place_comments)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}


//update place
exports.update = async (req, res) => {
    try {
        const updatedPlace = await placeServices.update(req.params.id, req.body)
        setResponse(res, 200, 'update place', updatedPlace)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }

}


//delete place
exports.delete = async (req, res) => {
    try {
        const deletePlace = await placeServices.delete(req.params.id)
        setResponse(res, 200, "delete place", deletePlace)

    } catch (e) {
        if (e.statusCode, e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}


//delete all places
exports.deleteAllPlaces = async (req, res) => {
    try {
        const deletedPlaces = await placeServices.deleteAllPlaces()
        setResponse(res, 200, "delete all places", deletedPlaces)
    } catch (e) {
        setErrorResponse(res, e.message)
    }
}


//delete place image
exports.deleteImage = async (req, res) => {
    try {
        const place = await placeServices.deleteImage(req.params.id)
        setResponse(res, 200, 'delete place image ', place)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)
        }
        setErrorResponse(res)
    }
}


//explore place image
exports.getImage = async (req, res) => {
    try {
        const image = await placeServices.getImage(req.params.id)
        res.set('Content-Type', 'image/PNG' || 'image/jpeg' || 'image.jpg')     //responce header to tell browser the type
        res.sendFile(path.join(__dirname, `../public/${image}`))
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)

        }
        console.log(e)
        setErrorResponse(res)
    }
}

//update place image
exports.updateImage = async (req, res) => {
    try {
        const updatedImage = await placeServices.updateImage(req.params.id, req.file)
        setResponse(res, 200, "update place image", updatedImage)
    } catch (e) {
        if (e.statusCode && e.message) {
            return setErrorResponse(res, e.statusCode, e.message)

        }
        setErrorResponse(res, e.message)
    }
}