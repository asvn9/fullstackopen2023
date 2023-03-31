const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    const token = getTokenFrom(request)
    request.token = token
    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            const user = await User.findById(decodedToken.id)

            if (user) {
                request.user = user
            } else {
                return response.status(401).json({ error: 'token invalid - user not found' })
            }
        } catch (error) {
            return response.status(401).json({ error: 'Unauthorized' })
        }
    }
    next()
}
module.exports = {
    tokenExtractor, userExtractor
}