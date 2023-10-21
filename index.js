const express = require('express')
const morgan = require('morgan')
const connectToDb = require('./Db')
const signup = require('./Routes/signup')
const login = require('./Routes/login')
const student=require('./Routes/student')
const teacher=require('./Routes/teacher')

const app = express()

app.use(morgan('tiny'))
app.use(require('cors')())
app.use(express.json())
app.use('/api', signup)
app.use('/api', login)
app.use('/api',student)
app.use('/api',teacher)
app.get('/', (req, res) => {
    res.send("Hello from student management system")
})

app.listen(5000, async () => {
    await connectToDb()
    console.log("Server is running on port 5000")
})
