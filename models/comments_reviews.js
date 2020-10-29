const Sequelize = require('sequelize')
const connection = require('../db/sequelize')

const comments = connection.define('comments', {
    place_id: {
        allowNull: false,
        type: Sequelize.UUID
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = comments