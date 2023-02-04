const express=require('express')

const router=express.Router()
const cinemaController=require('../controllers/cinema.controller')
router.get('/:cinemaId/rooms',cinemaController.getRoomsByCinemaId)
router.get('/cinemaByCityId/:cityId',cinemaController.getCinemaByCityId)
router.get('/rooms/:roomId',cinemaController.getCinemaByRoomId)
router.get('/cities',cinemaController.getCities)
router.post('/rooms',cinemaController.addRoom)
router.get('/:cinemaId',cinemaController.getCinemaById)
router.get('/',cinemaController.getCinemas)
router.post('/',cinemaController.createCinema)
router.put('/',cinemaController.updateCinema)
router.delete('/',cinemaController.deleteCinema)

module.exports=router