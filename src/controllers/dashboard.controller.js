// const dbPool = require('../db/dao/mysql-db')
const logger = require('../../config/logger')

const dashboardController = {
    index: (req, res, next) => {
        logger.info('dashboardController.index() called')

        // Simulate database calls with static data
        const [numMovies, numActors, numStudios] = [
            1000, // Book.countDocuments({}).exec(),
            256, // BookInstance.countDocuments({}).exec(),
            126 // BookInstance.countDocuments({ status: "Available" }).exec(),
        ]

        res.render('dashboard', {
            title: 'Local Library Home',
            numMovies,
            numActors,
            numStudios,
            message: 'Server is up and running!'
        })
    }
}

module.exports = dashboardController
