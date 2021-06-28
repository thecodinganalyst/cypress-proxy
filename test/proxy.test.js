const proxyServer = require('../proxy.js')
const httpsServer = require('../server.js')
const axios = require('axios').default

describe('proxy.js', () => {
    it('should return hello world', async () => {
        httpsServer.start(8000)
        proxyServer.start(9000)
        const res = await axios.get('http://localhost:9000/')
        expect(res.data).toEqual('Hello World\n')
        proxyServer.stop()
        httpsServer.stop()
    })
})