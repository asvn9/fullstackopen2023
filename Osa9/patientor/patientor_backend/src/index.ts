import express from 'express'
import diagnoseRouter from './routes/diagnoseRoute'
import patientRouter from './routes/patientRoute'

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
const PORT = 3001

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged')
    res.send('pong')
})

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})