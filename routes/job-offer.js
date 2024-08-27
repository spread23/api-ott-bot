const express = require('express')
const offerController = require('../controllers/job_offer')

const router = express.Router()

router.get('/offer-test', offerController.offerTest)

module.exports = router