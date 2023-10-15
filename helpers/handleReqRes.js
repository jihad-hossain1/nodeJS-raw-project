
// dependency
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} =require('../handlers/routesHandlers/notFountHandler')

// module scaffolding
const handler = {}

//handle request response
handler.handleReqRes = (req, res) => {
    // request handling

    // get the url and parse it
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/, '');
    const method = req.method.toLowerCase()
    const quaryStringObject = parsedUrl.query;
    const headersObjec = req.headers;

    const requestProperties = {
        parsedUrl,path,trimmedPath,method,quaryStringObject,headersObjec
    }
    
    const decoder = new StringDecoder('utf-8')
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === 'number' ? statusCode : 500; 

        payload = typeof (payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        //return the final response
        res.writeHead(statusCode);
        res.end(payloadString)
    })



    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
        console.log(realData)
    })

    req.on('end', () => {
        realData += decoder.end()
        console.log(realData)
        //response handle
        res.end('hello world ,who')
    })

}

module.exports = handler