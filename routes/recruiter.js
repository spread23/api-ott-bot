const express = require('express')
const recruiterController = require('../controllers/recruiter')

const router = express.Router()

router.get('/test-recruiter', recruiterController.recruiterTest)
router.post('/register', recruiterController.register)
router.post('/login', recruiterController.login)

module.exports = router
