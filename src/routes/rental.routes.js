const router = require('express').Router()

const rentalController = require('../controllers/rental.controller')

router.get('/', rentalController.list)

router.get('/create', rentalController.createGet)

// ToDo
// router.post('/create', rentalController.createPost)

// router.get('/:id/delete', rentalController.deleteGet)
// router.post('/:id/delete', rentalController.deletePost)

// router.get('/:id/update', rentalController.updateGet)
// router.post('/:id/update', rentalController.updatePost)

// Deze moet als laatste komen, ivm routing prioriteit
router.get('/:rental_id', rentalController.readOne)

module.exports = router
