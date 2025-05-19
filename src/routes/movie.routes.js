const router = require('express').Router()

const movieController = require('../controllers/movie.controller')

router.get('/', movieController.list)

router.get('/create', movieController.createGet)

// ToDo
// router.post('/create', movieController.createPost)

// router.get('/:id/delete', movieController.deleteGet)
// router.post('/:id/delete', movieController.deletePost)

// router.get('/:id/update', movieController.updateGet)
// router.post('/:id/update', movieController.updatePost)

// Deze moet als laatste komen, ivm routing prioriteit
router.get('/:film_id', movieController.readOne)

module.exports = router
