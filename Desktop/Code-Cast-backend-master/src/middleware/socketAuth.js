const jwt = require('jsonwebtoken')

const socketAuth = async (token) => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        return decode
    }
    catch (e) {
        return new Error('authentication failed')
    }
}

module.exports = socketAuth