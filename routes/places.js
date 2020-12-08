const express = require('express')
const router = new express.Router()
const place = require('../controllers/place_controller')
const upload = require('../controllers/place_uploads')

//get all places
router.get('/places', place.list);

//create place
router.post('/places', upload.single('image'), place.create);

//update place
router.put('/places/:id', place.update);

//delete place
router.delete('/places/:id', place.delete);

//delete all places
router.delete('/places', place.deleteAllPlaces)


//delete place image
router.delete('/places/image/:id', place.deleteImage)

//explore image
router.get('/places/:id/image', place.getImage)

//update image
router.put('/places/image/:id', upload.single('image'), place.updateImage)

module.exports = router