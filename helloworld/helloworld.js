const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode=200) {
    // when readFile() is done reading the file in the path given, it will
    // call our callback that sends server error (500) in case of error, or
    // otherwise sends the given header (e.g. 200 - OK) and the file data
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            return res.end('500 - Internal Server Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })
}

const server =  http.createServer((req, res) => {
    // normalize url by removing querystring, optional trailing slash, and
    // making lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => {
    console.log(`Server started on port ${port}. Press CTRL-C to terminate...`)
})
