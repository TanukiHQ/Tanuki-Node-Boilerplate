const mongoose = require('mongoose')
const config = require('../config')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`${config.services.mongo.host}/${config.services.mongo.database}${config.services.mongo.options}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch((err) => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
