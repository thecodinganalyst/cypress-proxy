const fs = require('fs')
const https = require('https')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log(new Date() + ' ' + req.socket.remoteAddress + ' ' + req.method + ' ' + req.url)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('Hello World\n')
    res.end()
})

const server = https.createServer({
    key: fs.readFileSync('cert/server-key.pem'),
    cert: fs.readFileSync('cert/server-crt.pem'),
    ca: fs.readFileSync('cert/ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: true
}, app)

function start(port){
    server.listen(port)
}

function stop(){
    server.close()
}

module.exports.start = start
module.exports.stop = stop
