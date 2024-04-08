
import fs from 'fs';
import 'dotenv/config'



import express from 'express';
import userrouter from './router/user.router.js';
import ApiError from './error/api.error.js';
import heimdallrouter from './router/heimdall.router.js';
import financials from './router/financial.router.js';
import cdbrouter from './router/cdb.router.js';
import cors from 'cors';

// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/factoq.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/factoq.com/fullchain.pem')
//   };

 const app = express();
app.use(cors())
app.use(express.json());
app.use(cors(process.env.CORS_ORIGIN));

app.use('/backend/user', userrouter);
app.use('/backend/heimdall', heimdallrouter);
app.use('/backend/financial', financials);
app.use('/backend/cdb', cdbrouter);



const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
