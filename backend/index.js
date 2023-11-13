
const express = require('express')
const cors = require('cors');
require('dotenv').config();

const usersRoute = require('./routes/users')
const reportsRoute = require('./routes/reports')

const app = express();
app.use(cors())
app.use(express.json());

const connection = require('./databaseConfig/db')


const PORT = process.env.PORT_NUMBER

if (connection){
    app.listen(PORT, () => {
        console.log('Connected and app is running on port ', PORT)
    })
}

app.use('/api/users', usersRoute)
app.use('/api/reports', reportsRoute)

