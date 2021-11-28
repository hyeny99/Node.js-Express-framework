const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000

//parse form data
app.use(express.urlencoded({encoded: false}))
// parse json
app.use(express.json())


const router_generalData = require('./routes/generalData')

const dbUrl = 'mongodb://localhost:27017/usersdb'

mongoose.connect(dbUrl)
.then(result => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}....`)
    })
    console.log('connected to db')
})
.catch((error) => {
    console.log(error)
})


app.use('/api/v1/salesman', router_generalData)
