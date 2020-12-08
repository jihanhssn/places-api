const fs = require('fs')
const dir = './public/'
const db = require('../models/index')
const { ErrorHandler } = require('../handlers/errorHandler')
const Places = db.places
const placeDAO = require('../data_access/places_dao')
require('express-async-errors')
let place_service = {}

//create place
place_service.create = async (place1, file) => {
    let existingPlace = await Places.findOne({ where: { name: place1.name } })
    if (existingPlace) {
        throw new ErrorHandler(404, "place already exist!")
    }
    const place = await placeDAO.create(place1, file)
    return place

}

//read all places
place_service.list = async () => {

    const places = await placeDAO.list()
    return places
}


//update place
place_service.update = async (place_id, placeData) => {
    console.log(placeData)
    const updates = Object.keys(placeData)
    const allowedUpdates = ['name']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidUpdate)
    if (!isValidUpdate) {
        throw new ErrorHandler(400, "invalid update")
    }

    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    if (placeData.name) {
        const existingPlace = await Places.findOne({ where: { name: placeData.name } })
        if (existingPlace) {
            throw new ErrorHandler(404, 'place name already takens')
        }
    }
    const updatedPlace = await placeDAO.update(place_id, placeData)
    return updatedPlace
}

//delete place
place_service.delete = async (place_id) => {
    const place = await Places.findByPk(place_id)

    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    const images = fs.readdirSync(dir)
    for (let image of images) {
        if (image == place.image) {
            fs.unlinkSync(dir + '/' + image)
        }
    }
    const deletedPlace = await placeDAO.delete(place_id)
    return deletedPlace
}

//delete all places
place_service.deleteAllPlaces = async () => {
    const images = fs.readdirSync(dir)
    const places = await Places.findAll()
    if (places.length == 0) {
        throw new ErrorHandler(404, "no place found!")
    }
    for (let place of places) {
        for (let image of images) {
            if (image == place.image) {
                fs.unlinkSync(dir + '/' + image)
            }
        }
    }
    const deletedPlaces = await placeDAO.deleteAllPlaces()
    return deletedPlaces
}

//delete place image
place_service.deleteImage = async (place_id) => {
    const existingPlace = await Places.findByPk(place_id)
    if (!existingPlace) {
        throw new ErrorHandler(404, "not found")
    }
    const images = fs.readdirSync(dir)
    for (let image of images) {
        if (image == existingPlace.image) {
            fs.unlinkSync(dir + '/' + image)
        }
    }
    existingPlace.image = null
    const place = await placeDAO.deleteImage(existingPlace)
    return place
}

//explore place image
place_service.getImage = async (place_id) => {
    const place = await Places.findByPk(place_id)
    if (!place || !place.image) {
        throw new ErrorHandler(404, "No Image !")
    }

    const images = fs.readdirSync(dir)
    for (let image of images) {
        if (image == place.image) {
            return image
        }
    }
}

//update place image
place_service.updateImage = async (place_id, file) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }

    const images = fs.readdirSync(dir)
    for (let image of images) {
        if (image == place.image) {
            fs.unlinkSync(dir + '/' + image)
        }
    }
    place.image = file.filename
    const updatedPlace = await placeDAO.updateImage(place)
    return updatedPlace
}

module.exports = place_service