const  mongoose = require('mongoose')
const  { config } = require('dotenv')

config()
mongoose.set('strictQuery')

const connection = async () => {
    try {
        mongoose.connect(process.env.DB_URI)
        console.log('Te has conectado de manera satisfactoria a  la DB')
    } catch (error) {
        console.log('No se pudo conectar a la DB')
    }
}

module.exports = connection