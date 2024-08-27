//nodejs dependencies 
const express = require('express')
const cors = require('cors')
const { config } = require('dotenv')

//Router imports
const userRouter = require('./routes/user')
const recruiterRouter = require('./routes/recruiter')
const offerRouter = require('./routes/job-offer')

//Connection import
const connection = require('./database/connection')

config()
connection()

const app = express()
const port = process.env.PORT ?? 3900

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Api routes
app.use('/api/user', userRouter)
app.use('/api/recruiter', recruiterRouter)
app.use('/api/job-offer', offerRouter)


app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Endpoint de prueba'
    })
})

app.listen(port, () => {
    console.log('Server corriendo en el puerto ', port)
})