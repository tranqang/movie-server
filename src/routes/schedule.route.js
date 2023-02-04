const express=require('express')

const router=express.Router()
const scheduleController=require('../controllers/schedule.controller')

router.get('/allChairs',scheduleController.getAllChairs)
router.get('/amount',scheduleController.getAmount)
router.get('/report',scheduleController.getReport)
router.post('/bookingChairs',scheduleController.bookingChairs)
router.get('/chairsByScheduleId/:scheduleId',scheduleController.getChairsByScheduleId)
router.get('/timeTypeSchedule/:scheduleId',scheduleController.getTimeTypeSchedule)
router.get('/:scheduleId',scheduleController.getScheduleById)
router.post('/',scheduleController.createSchedule)
router.put('/',scheduleController.updateSchedule)
router.get('/',scheduleController.getSchedules)
router.delete('/',scheduleController.deleteSchedule)


module.exports=router