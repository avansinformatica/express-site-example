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

                // Render de view met de resultaten
                res.render('movielist', {
                    title: 'List of Movies',
                    message: 'it works!',
                    movieList: results
                })
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
                const movie = result.data[0]
                logger.info('Movie found: ', movie.title)
                res.render('moviedetails', {
                    title: movie.title,
                    movie: movie
                })
            } else {
                logger.warn('Movie not found')
                res.status(404).send('Movie not found')
            }
        })
    },

    createGet: (req, res, next) => {
        logger.info('movieController.createGet() called')
        res.render('error', {
            title: 'Not implemented',
            status: 501,
            message: 'This feature is not implemented yet.'``
        })
    }
}

module.exports = movieController
