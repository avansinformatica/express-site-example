// const Book = require("../models/book.model");
const dbPool = require('../db/dao/mysql-db')
const logger = require('../../config/logger')
const rentalService = require('../services/rental.service')

const rentalController = {
    list: (req, res, next) => {
        logger.info('rentalController.list() called')

        rentalService.getAll((err, result) => {
            if (err) {
                logger.error('Error getting rentals: ', err)
                return res.status(500).send('Error getting rental')
            }

            if (result && result.data && result.data.length > 0) {
                const model = {
                    pageTitle: 'List of Rentals',
                    rentals: result.data
                }
                const view = 'rental/rental_list'
                logger.info(model.rentals.length, `rentals found`)
                res.render(view, model)
            } else {
                logger.warn('rentals not found')
                res.status(404).send('rental not found')
            }
        })
    },

    readOne: (req, res, next) => {
        const rental_id = req.params.rental_id
        logger.info(`rentalController.readOne for film_id ${rental_id} called`)

        rentalService.getOne(rental_id, (err, result) => {
            if (err) {
                logger.error('Error getting rental: ', err)
                return res.render('error', {
                    message: 'Error getting rental',
                    error: err.message
                })
            }

            if (result && result.data && result.data.length > 0) {
                const model = {
                    pageTitle: 'Rental Details',
                    rental: result.data[0]
                }
                const view = 'rental/rental_details'
                logger.info('rental found: ', model.rental.title)
                res.render(view, model)
            } else {
                logger.warn('rental not found')
                return res.render('error', {
                    message: 'Rental not found',
                    error: {
                        status: 404,
                        message: 'Rental not found'
                    }
                })
            }
        })
    },

    createGet: (req, res, next) => {
        logger.info('rentalController.createGet() called')
        res.render('rentalcreate', {
            title: 'Create a rental',
            rental: {
                title: 'Blade Runner',
                description: '',
                release_year: '',
                language_id: '',
                rental_duration: '',
                rental_rate: '',
                length: '',
                replacement_cost: '',
                rating: '',
                special_features: ''
            },
            status: 200
        })
    }
}

module.exports = rentalController
