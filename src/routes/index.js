const express = require('express')
const router = express.Router()
const logger = require('../../config/logger')
const dashboardController = require('../controllers/dashboard.controller')

// GET home page.
router.get('/', function (req, res) {
    logger.info('GET /')
    res.redirect('/dashboard')
})

// GET home page.
router.get('/dashboard', dashboardController.index)

module.exports = router
