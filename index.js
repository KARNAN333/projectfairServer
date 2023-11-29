// Loads .env contents into process.env by default
require("dotenv").config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
// const appMiddleware = require("./Middlewares/appMiddleware")
require("./DB/connection")

// Creates an Express applicatioon
const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`project fair server started at port: ${PORT} and waiting for client requests...`);
})

// http get resolving  to http://localhost:4000/
pfServer.get('/',(erq,res)=>{
    res.send(`<h1>project fair server started and waiting for client request...</h1>`)
})

