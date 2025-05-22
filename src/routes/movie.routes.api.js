const router = require('express').Router()

const movieController = require('../controllers/movie.controller')

// Deze moet als laatste komen, ivm routing prioriteit
router.get('/:film_id', movieController.readOne)    

module.exports = router
