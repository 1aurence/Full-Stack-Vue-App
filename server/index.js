require('dotenv').config()
require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const UserRoutes = require('./routes/api/user')
app.use(bodyParser.json())
app.use(cors())

app.use('/api/user', UserRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))