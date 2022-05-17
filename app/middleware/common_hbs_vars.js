// This middleware loads common variables directly into handlebars without requiring manual declaration.

const commonHbsVars = (req, res, next) => {
    // Populate common variables in handlebars
    res.locals.loggedInUser = req.session.user
    res.locals.errors = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.csurf = req.csrfToken()
    res.locals.debugEnv = process.env['APP_DEBUG_MODE']
    next()
}

module.exports = commonHbsVars
