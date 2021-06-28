const https = require('https')
const fs = require('fs')
const httpsServer = require('../server')
const axios = require('axios').default;

const HTTPS_AGENT = new https.Agent({
    rejectUnauthorized: false,
    key: fs.readFileSync('cert/client-key.pem'),
    cert: fs.readFileSync('cert/client-crt.pem'),
    ca: fs.readFileSync('cert/ca-crt.pem')
})
const DEFAULT_PORT = 8000
const DEFAULT_HOST = 'https://localhost:8000'

describe('server.js', () => {

    beforeEach(() => {
        httpsServer.start(DEFAULT_PORT)
    })

    it('should reply hello world', async () => {
        const res = await axios.get(DEFAULT_HOST, {httpsAgent: HTTPS_AGENT})
        expect(res.data).toEqual("Hello World\n")
    })

    it('should not complete', async() => {
        const getWithoutCert = async () => await axios.get(DEFAULT_HOST)
        await expect(getWithoutCert()).rejects.toThrow()
    })

    afterEach(() => {
        httpsServer.stop()
    })
})
