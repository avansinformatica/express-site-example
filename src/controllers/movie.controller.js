// const Book = require("../models/book.model");
const dbPool = require('../db/dao/mysql-db')
const logger = require('../../config/logger')
const movieService = require('../services/movie.service')

const movieController = {
    list: (req, res, next) => {
        logger.info('movieController.list() called')

        // Connectie met de database maken
        dbPool.getConnection((err, connection) => {
            if (err) {
                logger.error('Error getting connection from pool: ', err)
                return res
                    .status(500)
                    .send('Error getting connection from pool')
            }

            // Hier kun je de database-query uitvoeren
            const sql = 'SELECT * FROM film LIMIT 10' // Voorbeeldquery, pas aan naar behoefte
            connection.query(sql, (err, results) => {
                // Verbinding teruggeven aan de pool
                connection.release()

                if (err) {
                    logger.error('Error executing query: ', err)
                    return res.status(500).send('Error executing query')
                }

                // Hier kun je de resultaten verwerken
                logger.info(`Found ${results.length} movies.`)
                logger.info('Results: ', results[0])

                const view = 'movie/movie_list'
                const model = {
                    title: 'List of Movies',
                    message: 'it works!',
                    movieList: results
                }
                // Render de view met de resultaten
                res.render(view, model)
            })
        })
    },

    readOne: (req, res, next) => {
        logger.info(
            `movieController.readOne for film_id ${req.params.film_id} called`
        )

        movieService.getOne(req.params.film_id, (err, result) => {
            if (err) {
                logger.error('Error getting movie: ', err)
                return res.status(500).send('Error getting movie')
            }

            if (result && result.data && result.data.length > 0) {
                const model = {
                    pageTitle: result.data[1].title,
                    movie: result.data[0][0],
                    rentalHistory: result.data[1]
                }
                const view = 'movie/movie_details'
                logger.info('Movie found: ', model.movie.title)
                res.render(view, model)
            } else {
                logger.warn('Movie not found')
                res.status(404).send('Movie not found')
            }
        })
    },

    createGet: (req, res, next) => {
        logger.info('movieController.createGet() called')
        res.render('moviecreate', {
            title: 'Create a Movie',
            movie: {
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

module.exports = movieController
