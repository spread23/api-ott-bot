const Recruiter = require('../models/recruiter')
const bcrypt = require('bcrypt')
const { createToken } = require('../services/jwt')

const recruiterTest =  (req, res) => {
    return res.status(200).json({
        status: 'sucess',
        message: 'Test de recruiter'
    })
}

const register = async (req, res) => {

    const params = req.body

    if (!params.name || !params.lastname || !params.username || !params.email || !params.password) {
        return res.status(400).json({
            status:'error',
            message: 'Faltan parametros'
        })
    }

    try {

        const recruiterFound = await Recruiter.find({
            $or:[
                {email: params.email},
                {username: params.username}
            ]
        })

        if (recruiterFound && recruiterFound.length >= 1) {
            return res.status(200).json({
                status: 'error',
                message: 'El usuario ya existe'
            })
        }

        const pwd = await bcrypt.hash(params.password,10)
        params.password = pwd

        const recruiterToSave = new Recruiter(params)
        const recruiterStorage = await recruiterToSave.save()

        return res.status(200).json({
            status:'success',
            message: 'Registro completo',
            recruiter: recruiterStorage
        })
        

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const params = req.body

    if (!params.email || !params.password) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan parametros'
        })
    }

    try {

        const recruiterFound  = await Recruiter.findOne({
            email: params.email
        })

        if (!recruiterFound) {
            return res.status(400).json({
                status: 'error',
                message: 'El email, no existe'
            })
        }

        const pwd = bcrypt.compareSync(params.password, recruiterFound.password)
        if (!pwd) {
            return res.status(400).json({
                status: 'error',
                message: 'Las contraseña es incorrecta'
            })
        }

        const token = createToken(recruiterFound)

        return res.status(200).json({
            status: 'success',
            message: 'Has hecho login de manera exitosa',
            token
        })

    }  catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports = {
    recruiterTest,
    register,
    login
}