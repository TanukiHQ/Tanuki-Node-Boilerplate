const enforceLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).send('Not Logged In')
    }
}

const enforceNoLogin = (req, res, next) => {
    if (!req.session.user) {
        next()
    } else {
        res.status(401).send('Already Logged In')
    }
}

module.exports = {
    enforceLogin,
    enforceNoLogin,
}
