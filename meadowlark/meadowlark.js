const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()
app.disable('x-powered-by')

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections)
                this._sections = {}
            else
                this._sections[name] = options.fn(this)
            return null
        },
    },
  }))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(weatherMiddleware)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// main route
app.get('/', handlers.home)

// about route
app.get('/about', handlers.about)

// see headers transmitted to the browser
app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
      .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// API - fortunes
app.get('/api/fortunes', handlers.apiFortunes)

// newsletter signup - normal 
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// newsletter signup - Fetch API
app.get('/newsletter-fetchapi-signup', handlers.newsletterSignupViaFetchAPI)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)


// Vacation photo contest submission page
app.get('/vacation-photo', handlers.vacationPhoto)

// Vacation photo form POST route
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.message })
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})

// Vacation photo thank you page
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoThankYou)



// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`)
    })
} else {
    module.exports = app
}
