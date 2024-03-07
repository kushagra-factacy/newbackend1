
import 'dotenv/config'



import express from 'express';
import userrouter from './router/user.router.js';
import ApiError from './error/api.error.js';
import heimdallrouter from './router/heimdall.router.js';
// import financials from './controllers/financial.controller.js';
 import cdbrouter from './router/cdb.router.js';
 import cors from 'cors';


 const app = express();
app.use(express.json());
app.use(cors(process.env.CORS_ORIGIN));

app.use('/user', userrouter);
app.use('/heimdall', heimdallrouter);
// app.use('/financials', financials);
app.use('/cdb', cdbrouter);



const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});