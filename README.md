# cypress-proxy

This is a demonstration to setup a proxy server in cypress, in order to allow testing in a corporate scenario when the endpoint is https instead of http. 

To access https server, the client will need to have a certificate in order to create a secure channel with the https server. So the solution is to create a proxy server in the cypress plugin, and inject the certificate in the proxy server. Then instead of calling to the https server, we call the proxy server instead. 

The main solution is just the file in cypress/plugins/index.js, the other files are created to demonstrate the creation of the https server, the proxy server, and how to generate the necessary certificates for this demonstration to work.

## Steps to test the cypress plugin

Prerequisite: Run `yarn install` to install the necessary dependencies.

1. In a terminal, run `node index.js`. This will start our endpoint https://localhost:8000/
2. In another terminal, run `npx cypress open` to open the cypress window, then click on the `server.spec.js` to run the sole cypress test.

* In the corporate environment, the ca field is probably not needed, as the certificate will be provided and installed in your development environment. For the purpose of this demonstration, I am only using a self signed certificate, and having the ca defined here helps to get the self-signed certificates pass the security checks.

## Steps to test

1. Run the 8 .sh scripts to generate the CA, server and client certs. 
2. Run `jest test/server.test.js` to test the https server is running and accessible at https://localhost:8000.
3. Run `jest test/proxy.test.js` to start the https server at port 8000, and proxy http server at port 9000, and test that accessing http://localhost:9000/ will proxy the request to https://localhost:8000/.

