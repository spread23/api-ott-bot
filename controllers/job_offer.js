const Offer = require('../models/job-offer')

const offerTest = (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Test for offer'
    })
} 

module.exports = {
    offerTest
}