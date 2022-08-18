const mongoose = require('mongoose');

const Connect = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/dotstaxi", {
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = Connect;