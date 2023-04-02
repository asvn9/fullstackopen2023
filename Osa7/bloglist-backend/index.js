const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const config = require('./utils/config')
const server = http.createServer(app)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})