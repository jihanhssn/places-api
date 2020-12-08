const fs = require('fs')
const sharp = require('sharp')
const dir = './public/'
const path = require('path')
const { ErrorHandler } = require('../handlers/errorHandler')
const db = require('../models/index')
const Places = db.places
const Comments = db.comments
const place_dao = {}

//create place
place_dao.create = async (place1, file) => {
    if (file) {
        place1.image = file.filename
        const place = await Places.build(place1)
        return await place.save()

    }
    const place = await Places.build(place1)
    return await place.save()

}


//read all places
place_dao.list = async () => {
    const places = await Places.findAll({
        include: {
            model: Comments
        }
    })
    return places
}



//update place
place_dao.update = async (place_id, placeData) => {
    return await Places.update({
        name: placeData.name
    }, {
        where: {
            place_id: place_id
        }
    })
}

//delete place
place_dao.delete = async (place_id) => {
    return await Places.destroy({
        where: {
            place_id: place_id
        }
    })
}

//delete all places
place_dao.deleteAllPlaces = async () => {
    return await Places.destroy({ where: {} })
}

//delete place image
place_dao.deleteImage = async (place) => {
    return await place.save()
}


//update place image
place_dao.updateImage = async (place) => {
    return await place.save()
}
module.exports = place_dao
