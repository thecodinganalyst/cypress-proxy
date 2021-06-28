const http = require('http')
const httpProxy = require('http-proxy')
const fs = require('fs')

const proxyServer = httpProxy.createProxyServer({
    target: {
        protocol: 'https:',
        host: 'localhost',
        port: '8000',
        cert: fs.readFileSync('cert/client-crt.pem'),
        key: fs.readFileSync('cert/client-key.pem'),
        ca: fs.readFileSync('cert/ca-crt.pem')
    },
    changeOrigin: true,
    secure: false
})

const server = http.createServer((req, res) => {
    proxyServer.web(req, res)
})

function start(port){
    server.listen(port)
}

function stop(){
    server.close()
}

module.exports.start = start
module.exports.stop = stop