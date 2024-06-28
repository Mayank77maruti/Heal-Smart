const jwt = require('jsonwebtoken')
const User = require("./../DB/schema/user")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode._id)
        if (!user) {
            throw new Error()
        }
        req.token = await user.generateAuthToken()
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth