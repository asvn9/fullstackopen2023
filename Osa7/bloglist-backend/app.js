const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testingrouter')
    app.use('/api/testing', testingRouter)
}



module.exports = app