const mongoose = require('mongoose')

// Connection URL
const connectDb = async () => {
    try {
        const result = await mongoose.connect(process.env.DB_URL)
        console.log("Database connect success")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb