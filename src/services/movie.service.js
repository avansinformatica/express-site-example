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
                // first query
                'SELECT ' +
                    'film.film_id, film.title, film.description, film.release_year, film.language_id, film.original_language_id, ' +
                    'film.rental_duration, film.rental_rate, film.length, film.replacement_cost, film.rating, ' +
                    'film.special_features, film.last_update as film_last_update, ' +
                    'category.name AS category_name, ' +
                    'language.name AS language_name, ' +
                    'store.last_update AS store_last_update, ' +
                    'address.address AS store_address, address.address2 AS store_address2, ' +
                    'address.district AS store_district, address.postal_code AS store_postal_code, ' +
                    'address.phone AS store_phone, ' +
                    'city.city_id, city.city AS store_city, ' +
                    'country.country_id, country.country AS store_country ' +
                    'FROM `film` ' +
                    'JOIN `film_category` ON `film`.`film_id` = `film_category`.`film_id` ' +
                    'JOIN `category` ON `category`.`category_id` = `film_category`.`category_id` ' +
                    'JOIN `language` ON `film`.`language_id` = `language`.`language_id` ' +
                    'JOIN `inventory` ON `film`.`film_id` = `inventory`.`film_id` ' +
                    'JOIN `store` ON `inventory`.`store_id` = `store`.`store_id` ' +
                    'JOIN `address` ON `store`.`address_id` = `address`.`address_id` ' +
                    'JOIN `city` ON `address`.`city_id` = `city`.`city_id` ' +
                    'JOIN `country` ON `city`.`country_id` = `country`.`country_id` ' +
                    'WHERE film.film_id=?; ' +
                    // second query
                    'SELECT rental.rental_id, rental.rental_date, rental.return_date, rental.last_update, inventory.film_id ' +
                    'FROM `rental` ' +
                    'INNER JOIN `inventory` ON `rental`.`inventory_id` = `inventory`.`inventory_id` ' +
                    'INNER JOIN `film` ON `inventory`.`film_id` = `film`.`film_id` ' +
                    'WHERE inventory.film_id=? ;',
                [film_id, film_id],
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
