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
app.use(csrf({ cookie: false }))

// Rate limiting
const RateLimit = require('express-rate-limit')
app.use(new RateLimit({
    windowMs: 1*60*1000,
    max: config.webserver.maxRequestsPerMinute,
    message: `<title>429 - ${config.app.name}</title><p style="font-family: Arial"><b>429 — Too many requests</b><br>Please try again in a moment.</p>`,
}))

// Handlebars
const exphbs = require('express-handlebars')
app.set('views', [`views`])
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: `views/layouts`,
    helpers: require('./app/helpers'),
}))

// Detect debugger
const inspector = require('inspector')
const debugMode = inspector.url() !== undefined
process.env['APP_DEBUG_MODE'] = debugMode ? 'true' : 'false'

// Populate handlebars variable with session data
const commonHbsVars = require('./app/middleware/common_hbs_vars')
app.use(commonHbsVars)

// Routes
require('./app/routes')(app)

const webserver = () => {
    app.listen(config.webserver.port, (err) => {
        if (err) {
            throw err
        }
        console.log(`Started: Webserver binded on port ${config.webserver.port} | http://${config.webserver.webAddress}`)
    })
}

webserver()
