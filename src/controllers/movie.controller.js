// const Book = require("../models/book.model");
const dbPool = require('../db/dao/mysql-db')
const logger = require('../../config/logger')

const moviesController = {
    // Deze wordt niet gebruikt, maar is een voorbeeld van hoe je een controller kunt maken
    index_not_used: (req, res, next) => {
        const [
            numBooks,
            numBookInstances,
            numAvailableBookInstances,
            numAuthors
        ] = [
            5, // Book.countDocuments({}).exec(),
            12, // BookInstance.countDocuments({}).exec(),
            7, // BookInstance.countDocuments({ status: "Available" }).exec(),
            4 // Author.countDocuments({}).exec(),
        ]

        res.render('index', {
            title: 'Local Library Home',
            book_count: numBooks,
            book_instance_count: numBookInstances,
            book_instance_available_count: numAvailableBookInstances,
            author_count: numAuthors,
            genre_count: 0, // Placeholder
            message: 'it works!'
        })
    },

    list: (req, res, next) => {
        logger.info('moviesController.list() called')

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
                logger.info('Example result: ', results[0])

                // Render de view met de resultaten
                res.render('movielist', {
                    title: 'List of Movies',
                    message: 'it works!',
                    movieList: results
                })
            })
        })
    }
}

module.exports = moviesController
