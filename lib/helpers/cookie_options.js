// cookieParser: Cookie schema
const StdCookie = {
    httpOnly: true,
    secure: true,
    signed: true,
    domain: `.${config.webserver.domain}`,
    maxAge: 2678400000, // 31 days
    path: '/',
}

// cookieParser: Cookie schema
const GenkanCookie = {
    httpOnly: true,
    secure: true,
    signed: true,
    domain: `.${config.webserver.domain}`,
    maxAge: 2678400000, // 31 days
    path: '/',
}


// cookieParser: Cookie schema for notifications
const NotificationCookie = {
    httpOnly: true,
    secure: true,
    signed: true,
    domain: `.${config.webserver.domain}`,
    maxAge: 5000, // 5 seconds
    path: '/',
}

module.exports = {
    StdCookie,
    GenkanCookie,
    NotificationCookie,
}
