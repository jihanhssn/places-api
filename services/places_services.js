
const sharp = require('sharp')
const db = require('../models/index')
const Places = db.places
const placeDAO = require('../data_access/places_dao')
require('express-async-errors')
let place_service = {}

//create place
place_service.create = async (place1, file) => {
    const place = await placeDAO.create(place1, file)
    return place

}

//read all places
place_service.list = async () => {
    const places = await placeDAO.list()
    return places
}

//list place comments
place_service.listComments = async (place_id) => {
    const place_comments = await placeDAO.listComments(place_id)
    return place_comments
}

//update place
place_service.update = async (place_id, placeData) => {
    const updatedPlace = await placeDAO.update(place_id, placeData)
    return updatedPlace
}

//delete place
place_service.delete = async (place_id) => {
    const deletedPlace = await placeDAO.delete(place_id)
    return deletedPlace
}

//delete all places
place_service.deleteAllPlaces = async () => {
    const deletedPlaces = await placeDAO.deleteAllPlaces()
    return deletedPlaces
}

//delete place image
place_service.deleteImage = async (place_id) => {
    const place = await placeDAO.deleteImage(place_id)
    return place
}

//explore place image
place_service.getImage = async (place_id) => {
    const image = await placeDAO.getImage(place_id)
    return image
}

//update place image
place_service.updateImage = async (place_id, file) => {

    const place = await placeDAO.updateImage(place_id, file)
    return place
}

module.exports = place_service