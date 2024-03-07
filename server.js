const express = require ('express')
const router = require('./index')
require('dotenv').config({path: './.env'})


const app = express()


port = process.env.PORT || 2000

console.log(process.env.PORT);

app.use('/', router)

app.listen(port, (req,res)=>{
    console.log("app is listening on port " ,process.env.PORT);
})

