const jwt = require('jwt-simple')
const moment =  require('moment')
const { config } = require('dotenv')

config()

const secretKey = process.env.SECRET_KEY

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        talent: user.talent,
        experience: user.experience,
        availability: user.availability,
        iat: moment().unix(),
        exp: moment().add(30, 'days')
    }

    return jwt.encode(payload, secretKey)
}

module.exports = {
    createToken,
    secretKey
}