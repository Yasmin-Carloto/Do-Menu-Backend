const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true
    },
    phone: { 
        type: Number, 
        required: true
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant
