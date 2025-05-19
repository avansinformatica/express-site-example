const router = require('express').Router()

const movieController = require('../controllers/movie.controller')

router.get('/', movieController.list)
router.get('/list', movieController.list)

module.exports = router
