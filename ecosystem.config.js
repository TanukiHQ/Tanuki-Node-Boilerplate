const config = require('./config.json')
const npmConfig = require('./package.json')

module.exports = {
    apps: [{
        name: config.app.name,
        script: './' + npmConfig.main,
        // env_production: {
        //     NODE_ENV: 'production',
        // },
        // env_development: {
        //     NODE_ENV: 'development',
        // },
    }],
}
