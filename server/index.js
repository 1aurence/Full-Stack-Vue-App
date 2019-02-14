require('dotenv').config()
require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const UserRoutes = require('./routes/api/user')
const PostRoutes = require('./routes/api/post')
const FriendRoutes = require('./routes/api/friend')

app.use(bodyParser.json())
app.use(cors())

app.use('/api/user', UserRoutes)
app.use('/api/post', PostRoutes)
app.use('/api/friend', FriendRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(port, () => console.log(`Listening on port ${port}`))