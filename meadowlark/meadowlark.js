const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// main route
app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

// about route
app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})


// custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// custom 500 page
app.use((err, res, req, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Internal Server Error')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
