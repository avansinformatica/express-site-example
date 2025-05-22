const logger = require('../../config/logger')
const db = require('../db/dao/mysql-db')

const rentalService = {
    create: (item, callback) => {
        logger.info('create item', item)
        database.add(item, (err, data) => {
            if (err) {
                logger.info(
                    'error creating item: ',
                    err.message || 'unknown error'
                )
                callback(err, null)
            } else {
                logger.trace(`item created with id ${data.id}.`)
                callback(null, {
                    message: `item created with id ${data.id}.`,
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
                'SELECT * from `rental` ' +
                    'INNER JOIN `inventory` ON `rental`.`inventory_id` = `inventory`.`inventory_id` ' +
                    'INNER JOIN `film` ON `inventory`.`film_id` = `film`.`film_id` ' +
                    'INNER JOIN `customer` ON `rental`.`customer_id` = `customer`.`customer_id` ' +
                    'INNER JOIN `staff` ON `rental`.`staff_id` = `staff`.`staff_id` ' +
                    'INNER JOIN `store` ON `staff`.`store_id` = `store`.`store_id` ' +
                    'INNER JOIN `address` ON `store`.`address_id` = `address`.`address_id` ' +
                    'INNER JOIN `city` ON `address`.`city_id` = `city`.`city_id` ' +
                    'INNER JOIN `country` ON `city`.`country_id` = `country`.`country_id` ;',
                function (error, results, fields) {
                    connection.release()
                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results[0])
                        callback(null, {
                            message: `Found ${results.length} items.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getOne: (rental_id, callback) => {
        logger.info('getOne rental_id:', rental_id)

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT * from `rental` ' +
                    'INNER JOIN `inventory` ON `rental`.`inventory_id` = `inventory`.`inventory_id` ' +
                    'INNER JOIN `film` ON `inventory`.`film_id` = `film`.`film_id` ' +
                    'INNER JOIN `customer` ON `rental`.`customer_id` = `customer`.`customer_id` ' +
                    'INNER JOIN `staff` ON `rental`.`staff_id` = `staff`.`staff_id` ' +
                    'INNER JOIN `store` ON `staff`.`store_id` = `store`.`store_id` ' +
                    'INNER JOIN `address` ON `store`.`address_id` = `address`.`address_id` ' +
                    'INNER JOIN `city` ON `address`.`city_id` = `city`.`city_id` ' +
                    'INNER JOIN `country` ON `city`.`country_id` = `country`.`country_id` ' +
                    'WHERE `rental`.`rental_id` = ?',
                [rental_id],
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

module.exports = rentalService
