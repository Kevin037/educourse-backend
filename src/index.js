const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`TeamWork app listening on port ${port}`)
})

const UserRoute = require('./routes/user')
const {logRequest} = require('./middlewares/log')


app.use(logRequest)
app.use(express.json())
app.use('/users', UserRoute)