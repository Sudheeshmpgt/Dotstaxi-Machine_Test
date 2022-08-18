const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles:{
        type:String,
        enum:["user","admin","super_admin"],
        default:"user"
    }
})

module.exports = UserModel = mongoose.model('user', userSchema);