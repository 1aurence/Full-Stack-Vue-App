const mongoose = require('mongoose')
const options = {
    useNewUrlParser: true,
    useCreateIndex: true
}
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds221095.mlab.com:21095/vuefstack`,
    options,
    (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Connected to MongoDB')
        }
    });