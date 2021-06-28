/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

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

server.listen(9000)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
