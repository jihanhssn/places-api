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
    let existingPlace = await Places.findOne({ where: { name: place1.name } })
    if (existingPlace) {
        throw new ErrorHandler(404, "place already exist!")
    }
    if (file) {
        // const buffer = await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
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

//list place comments
place_dao.listComments = async (place_id) => {
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    return await Comments.findAll({ where: { place_id: place_id } })
}

//update place
place_dao.update = async (place_id, placeData) => {
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

    const existingPlace = await Places.findOne({ where: { name: placeData.name } })
    if (existingPlace) {
        throw new ErrorHandler(400, "place already exist")
    }
    updates.forEach((update) => {
        place[update] = placeData[update]
    })
    return await place.save()
}

//delete place
place_dao.delete = async (place_id) => {
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
    return await place.destroy()
}

//delete all places
place_dao.deleteAllPlaces = async () => {
    const images = fs.readdirSync(dir)
    const places = await Places.findAll()
    console.log(places)
    if (places.length == 0) {
        return "no place found!"
    }
    for (let place of places) {
        for (let image of images) {
            if (image == place.image) {
                fs.unlinkSync(dir + '/' + image)
            }
        }
    }
    return Places.destroy({ where: {} })
}

//delete place image
place_dao.deleteImage = async (place_id) => {
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
    place.image = null
    return await place.save()
}

//explore place image
place_dao.getImage = async (place_id) => {
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
place_dao.updateImage = async (place_id, file) => {
    console.log(file)
    const place = await Places.findByPk(place_id)
    if (!place) {
        throw new ErrorHandler(404, "not found")
    }
    // const buffer = await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const images = fs.readdirSync(dir)
    for (let image of images) {
        if (image == place.image) {
            fs.unlinkSync(dir + '/' + image)
        }
    }
    place.image = file.filename
    return await place.save()
}
module.exports = place_dao
