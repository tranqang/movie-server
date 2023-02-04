const express=require('express')
const multer = require('multer');

const router=express.Router()
const movieController=require('../controllers/movie.controller')
router.get('/categories',movieController.getCategories)
router.get('/languages',movieController.getLanguages)
router.get('/formats',movieController.getFormats)
router.get('/countries',movieController.getCountries)
router.get('/:movieId/categories',movieController.getCategoriesByMovieId)
router.get('/:movieId',movieController.getMovieById)
router.get('/',movieController.getMovies)
router.post('/',movieController.createMovie)
router.put('/',movieController.updateMovie)
router.delete('/',movieController.deleteMovie)

module.exports=router