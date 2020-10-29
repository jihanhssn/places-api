const sharp = require('sharp')
const Places = require('../models/places')
const Comments = require('../models/comments_reviews')
const { ErrorHandler } = require('../handlers/errorHandler')
require('express-async-errors')
let place_service = {}

//create place
place_service.create = async (place1, file) => {
    let existingPlace = await Places.findOne({ where: { name: place1.name } })
    if (existingPlace) {
        throw new ErrorHandler(404, "place already exist!")
    }
    if (file) {
        const buffer = await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        place1.image = buffer
        const place = await Places.build(place1)
        const savedPlace = await place.save()
        return savedPlace
    }
    const place = await Places.build(place1)
    const savedPlace = await place.save()
    return savedPlace

}

//read all places
place_service.list = async (req, res) => {
    const places = await Places.findAll()
    return places

}

//list place comments
place_service.listComments = async (place_id) => {

    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    return await Comments.findAll({ where: { place_id: place_id } })
}

//update place
place_service.update = async (place_id, placeData) => {
    const updates = Object.keys(placeData)
    const allowedUpdates = ['name']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        throw new ErrorHandler(400, "invalid update")
    }

    const place = await Places.findByPk(place_id)

    if (!place) {
        throw new ErrorHandler(404, "not found")
    }

    const existingPlace=await Places.findOne({where:{name:placeData.name}})
    if(existingPlace){
         throw new ErrorHandler(400,"place already exist")
    }
    updates.forEach((update) => {
        place[update] = placeData[update]
    })
    return await place.save()
}

//delete place
place_service.delete = async (place_id) => {
    const place = await Places.findByPk(place_id)

    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    return await place.destroy()
}

//delete all places
place_service.deleteAllPlaces = async () => {
    return Places.destroy({ where: {} })
}

//delete place image
place_service.deleteImage = async (place_id) => {

    const place = await Places.findByPk(place_id)

    if (!place) {
        throw new ErrorHandler(404, "not found")
    }

    place.image = null
    return await place.save()


}

//explore place image
place_service.getImage = async (place_id) => {

    const place = await Places.findByPk(place_id)

    if (!place || !place.image) {
        throw new ErrorHandler("No Image !")
    }
    return place
}

//update place image
place_service.updateImage = async (place_id, file) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "no place found")
    }
    const buffer = await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    place.image = buffer
    return await place.save()
}

module.exports = place_service