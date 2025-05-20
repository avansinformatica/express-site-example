const logger = require('../../config/logger')
const db = require('../db/dao/mysql-db')

const movieService = {
    create: (user, callback) => {
        logger.info('create user', user)
        database.add(user, (err, data) => {
            if (err) {
                logger.info(
                    'error creating user: ',
                    err.message || 'unknown error'
                )
                callback(err, null)
            } else {
                logger.trace(`User created with id ${data.id}.`)
                callback(null, {
                    message: `User created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        logger.info('getAll')

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT id, firstName, lastName FROM `user`',
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} users.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getOne: (film_id, callback) => {
        logger.info('getOne film_id:', film_id)

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT * FROM `film` ' +
                    'INNER JOIN `film_category` ON `film`.`film_id` = `film_category`.`film_id` ' +
                    ' JOIN `category` ON `category`.`category_id` = `film_category`.`category_id` where film.film_id=?',
                [film_id],
                function (error, results, fields) {
                    connection.release()

                    if (error && error.sqlMessage) {
                        logger.error(error.sqlMessage)
                        callback(error.sqlMessage, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} film.`,
                            data: results
                        })
                    }
                }
            )
        })
    }
}

module.exports = movieService
