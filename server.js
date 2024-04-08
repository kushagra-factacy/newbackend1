import express from 'express'
import router  from './index.js'
import 'dotenv/config'


const app = express()


port = process.env.PORT || 5001

console.log(process.env.PORT);

app.use('/', router)

app.listen(port, (req,res)=>{
    console.log("app is listening on port " ,process.env.PORT);
})

