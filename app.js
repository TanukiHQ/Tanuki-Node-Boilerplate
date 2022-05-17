// Load environment
const config = require('./app/config')

// Express
const express = require('express')
const app = express()
app.use('/', express.static('public'))
app.use('/third_party', express.static('third_party'))

// Random generator
const { random } = require('./app/utils/random')

// Session
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
app.use(cookieParser(config.app.secret))
app.use(session({
    secret: config.app.secret,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
    store: new MongoStore({ mongoUrl: `${config.services.mongo.host}/${config.services.mongo.database}${config.services.mongo.options}` }),
    unset: 'destroy',
    genid: (req) => {
        return random()
    },
}))

// Flash
const flash = require('connect-flash')
app.use(flash())

// BodyParser
app.use(express.urlencoded({ extended: true }))

// Csurf: CSRF protection
const csrf = require('csurf')
app.use(csrf({ cookie: true }))

// Rate limiting
const RateLimit = require('express-rate-limit')
app.use(new RateLimit({
    windowMs: 1*60*1000,
    max: 80,
    message: `<title>429 - ${config.app.name}</title><p style="font-family: Arial"><b>429 — Too many requests</b><br>Please try again in a moment.<p><p style="font-family: Arial"><small>Why am I seeing this: You are sending too many requests.<br>We limit the number of requests a user can make to manage server load.</small></p>`,
}))

// Handlebars
const exphbs = require('express-handlebars')
const hbsIntHelpers = require('./app/helpers/handlebars')
app.set('views', [`views`])
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: `views/layouts`,
    helpers: {
        hbsIntHelpers,
    },
}))

// Routes
require('./app/routes')(app)

const webserver = () => {
    app.listen(config.webserver.port, (err) => {
        if (err) {
            console.log(`\x1b[1m\x1b[2m[WEBSERVER] - \x1b[0m\x1b[1m\x1b[31m\x1b[5mFAILED\x1b[0m\x1b[31m: Unable to bind to port 5000. Could there possibly be another instance alive?\x1b[0m`)
            process.exit(1)
        }
        console.log(`\x1b[1m\x1b[2m[WEBSERVER] - \x1b[1m\x1b[34mOK\x1b[0m: Webserver binded on port ${config.webserver.port} | http://${config.webserver.webAddress}\x1b[0m`)
    })
}

