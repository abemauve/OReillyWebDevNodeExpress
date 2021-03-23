const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

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

app.get('/api/fortunes', handlers.apiFortunes)

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
