
const express = require('express')
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/students')

const app = express();
app.use(cors())
const connection = require('./databaseConfig/db')


const PORT = process.env.PORT_NUMBER

if (connection){
    app.listen(PORT, () => {
        console.log('Connected and app is running on port ', PORT)
    })
}


app.use('/api/students', studentRoutes)
