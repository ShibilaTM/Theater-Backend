const mongoose = require('mongoose')
const MONGO_DB_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_DB_URL,{
    dbName:'TheatreBookingDB'
})
.then(()=>{
    console.log('MongoDb connected successfully')
})
.catch(error=>{
    console.log('MongoDB connection is not available'+error)
})