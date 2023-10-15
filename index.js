/**
 * Title: uptime monitoring application
 * Description: A restful api to monitor up or down time of user defined links
 * author: jihad hossain
 * date: 16-10-23
 */

const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes')


// app dependency
const app = {};

// configuration
app.config = {
    port: 3000
}

//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    })
}

app.handleReqRes = handleReqRes;

app.createServer();