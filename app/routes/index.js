const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const metadata = {
        meta: {
            title: 'Home',
            path: false,
        },
        nav: {
            index: true,
        },
    }
    res.render('index', metadata)
})

router.get('*', (req, res) => {
    const metadata = {
        meta: {
            title: '404',
            path: false,
        },
    }
    res.status = 404
    res.render('404', metadata)
})

module.exports = router
