if (!process.env['APP_CONFIG_LOADED']) {
    try {
        loadedEnvironment = require('./config.json')
    } catch (error) {
        console.error('Warning: Couldn\'t load configuration file. Missing or invalid? Application will continue to run with an empty configuration.')
        loadedEnvironment = {}
    }
    process.env['APP_CONFIG_LOADED'] = true
}

module.exports = loadedEnvironment
