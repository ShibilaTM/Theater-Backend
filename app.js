const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
require('./Config/db')


const app = express()
app.use(morgan('dev'))
app.use(cors())
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
const userRoutes= require('./routes/userRoutes')
app.use('/user',userRoutes)

const moviePage = require('./routes/moviePageRoutes')
app.use('/page',moviePage)

const adminRoutes = require('./routes/adminRoutes')
app.use('/admin',adminRoutes)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})