const express = require('express')
const morgan = require('morgan')
const connectToDb = require('./Db')
const signup = require('./Routes/signup')
const login = require('./Routes/login')


const app = express()

app.use(morgan('tiny'))
app.use(require('cors')())
app.use(express.json())
app.use('/api', signup)
app.use('/api', login)
app.get('/', (req, res) => {
    res.send("Hello from student management system")
})


app.listen(5000, async () => {
    await connectToDb()
    console.log("Server is running on port 5000")
})


//noumanraees901
//uRETXGkMpg4EspHf