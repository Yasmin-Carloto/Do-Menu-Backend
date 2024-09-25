const mongoose = require("mongoose")

module.exports = coneectToDatabase = () => {
    return mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
}