const User = require('../models/user')
const fs = require('fs')
const path = require('path')

const test = (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Endpoint test de user'
    })
}

const saveForm = async (req, res) => {
    const params = req.body

    if (!params.name || !params.talents || !params.experience || !params.availability) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan parametros'
        })
    }

    try {
        const formToSave = new User(params)
        const formStorage = await formToSave.save()

        return res.status(200).json({
            status: 'success',
            message: 'Formulario guardado con exito',
            form: formStorage
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Error en la consulta'
        })
    }
}

const uploadCv = async (req, res) => {
    const id = req.params.id

    if (!req.file) {
        return res.status(404).json({
            status: 'error',
            message: 'La consulta no contiene archivo'
        })
    }

    const cv = req.file.originalname
    const splitCv = cv.split('\.')
    const extension = splitCv[1]

    if (extension !== 'pdf' && extension !== 'word') {

        const filePath = req.file.path
        fs.unlinkSync(filePath)

        return res.status(400).json({
            status: 'error',
            message: 'La extension no es valida'
        })

    }

    try {


        const userToUpload = await User.findByIdAndUpdate({
            _id: id
        }, { cv: req.file.filename }, { new: true })

        if (!userToUpload) {
            const filePath = req.file.path
            fs.unlinkSync(filePath)

            return res.status(400).json({
                status: 'error',
                message: 'No se pudo actualizar el user'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Se subio el cv de manera exitosa',
            user: userToUpload
        })

    } catch (error) {
        const filePath = req.file.path
        fs.unlinkSync(filePath)

        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const getCv = (req, res) => {
    const file = req.params.file
    const filePath = './uploads/cvs/' + file

    fs.stat(filePath, (error, exists) => {
        if (error || !exists) {
            return res.status(400).json({
                status: 'error',
                message: 'No existe el archivo'
            })
        }
    })

    return res.sendFile(path.resolve(filePath))
}

const uploadVideo = async (req, res) => {
    const id = req.params.id

    if (!req.file) {
        return res.status(404).json({
            status: 'error',
            message: 'La peticion no contiene ningun archivo'
        })
    }

    const file = req.file.originalname
    const fileSplit = file.split('\.')
    const extension = fileSplit[1]

    if (extension  !== 'mp4' && extension !== 'mkv' && extension !== 'avi' && extension !== 'mov') {
        const filePath = req.file.path
        fs.unlinkSync(filePath)

        return res.status(400).json({
            status: 'error',
            message: 'La extension no es valida'
        })
    }

    try {
        
        const userToUpload = await User.findByIdAndUpdate({
            _id: id
        }, { video: req.file.filename }, { new:true })

        if (!userToUpload) {

            const filePath = req.file.path
            fs.unlinkSync(filePath)

            return res.status(404).json({
                status: 'error',
                message: 'El usuario no existe'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'El video ha sido subido con exito',
            user: userToUpload
        })

    } catch (error) {

        const filePath = req.file.path
        fs.unlinkSync(filePath)

        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const getVideo = async (req, res) => {
    const file = req.params.file
    const filePath =  './uploads/videos/' + file

    fs.stat(filePath, (error, exists) => {
        if (error || !exists) {
            return res.status(404).json({
                status: 'error',
                message: 'No existe la ruta al archivo'
            })
        }
    })

    return res.sendFile(path.resolve(filePath))
}

module.exports = {
    test,
    saveForm,
    uploadCv,
    getCv,
    uploadVideo,
    getVideo
}