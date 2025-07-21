const express = require('express')
const router = require('./routes/index')
const fileRouter = require('./routes/file')

const app = express()
app.use(express.json())
app.use('/api', router)
app.use('/api', fileRouter)
app.use('/public', express.static(__dirname + '/public'))

const PORT = process.env.PORT || 3000
app.listen(PORT)