const mongoose = require('mongoose')

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI, {
        // useNewUrlParser: true,       // deprecated
        // useUnifiedTopology: true,    // deprecated
    }).then(data => {
        console.log(`MongoDB is connected with server ${data.connection.host}`)
    })
}


module.exports = connectDatabase