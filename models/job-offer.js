const { Schema, model } = require('mongoose')

const OfferSchema = Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model('Offer', OfferSchema, 'offers')