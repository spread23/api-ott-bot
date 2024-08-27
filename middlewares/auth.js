const jwt = require('jwt-simple')
const moment = require('moment')
const { secretKey } = require('../services/jwt')

exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: 'error',
            message:'La consulta no tiene la autorizacion de la cabecera'
        })
    }

    const token = req.headers.authorization.replace(/["']+/g, "")

    try {

        const payload = jwt.decode(token, secretKey)

        if (payload.exp <= moment().unix()) {
            return res.status(401).json({
                status:'error',
                message: 'El token ya ha expirado'
            })
        }

        req.user = payload

    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: 'Error en la codificacion del token'
        })
    }

    next()
}