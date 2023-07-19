// Importing packages
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
// port number
const port = 3000
// importing files
const wordsRoute = require('./Routes/wordsRoute');
const rankRoute = require('./Routes/rankRoute');

// essential middlewares (to work on browsers)
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // HTTP request logger middleware

// routing middlewares (to handle different routes)
app.use('/words',wordsRoute)
app.use('/rank',rankRoute)

// Global Error Handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        status:statusCode,
        message:err?.message,
        errors:err.errors || []
    })
})

// app listening on chosen port number
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})