const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser');

const app = express()
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`TeamWork app listening on port ${port}`)
})

const UserRoute = require('./routes/userRoute')
const ClassRoute = require('./routes/classRoute')
const ClassCategoriesRoute = require('./routes/classCategoriesRoute')
const {logRequest} = require('./middlewares/log')


app.use(logRequest)
app.use(express.json())
app.use('/auth', UserRoute)
app.use('/classes/',ClassRoute)
app.use('/class_categories/',ClassCategoriesRoute)