const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    vehicle_name: {
        type: String,
        required: true,
    },
    vehicle_number: {
        type: String,
        required: true,
        unique: true,
    },
    vehicle_model: {
        type: String,
        unique: true,
        required: true
    },
})

module.exports = VehicleModel = mongoose.model('vehicle', vehicleSchema);