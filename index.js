
import 'dotenv/config.js';
import express from 'express';
import userrouter from './router/user.router.js';
import ApiError from './error/api.error.js';
import heimdallrouter from './router/heimdall.router.js';
// import financials from './controllers/financial.controller.js';
 import cdbrouter from './router/cdb.router.js';


const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.use('/user', userrouter);
app.use('/heimdall', heimdallrouter);
// app.use('/financials', financials);
app.use('/cdb', cdbrouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});