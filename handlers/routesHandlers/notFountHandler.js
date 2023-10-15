// not foundhandler

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties,callback) => {
    console.log('smple not found')
    callback(404, {
        message: 'your request url not found!'
    })
}

module.exports = handler