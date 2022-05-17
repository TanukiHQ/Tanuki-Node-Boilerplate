// This file loads all modules in the current directory

const modules = require('require-dir-all')('./', {
    recursive: true,
})

module.exports = modules
