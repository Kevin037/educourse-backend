const express = require('express')

const app = express()
const port = 4200

app.listen(port, () => {
  console.log(`TeamWork app listening on port ${port}`)
})

const UserRoute = require('./routes/user')
const {logRequest} = require('./middlewares/log')


app.use(logRequest)
app.use(express.json())
app.use('/users', UserRoute)