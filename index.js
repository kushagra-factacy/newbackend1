import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;
import fs from 'fs';
import 'dotenv/config'



import express from 'express';
import userrouter from './router/user.router.js';
import ApiError from './error/api.error.js';
import heimdallrouter from './router/heimdall.router.js';
import financials from './router/financial.router.js';
import cdbrouter from './router/cdb.router.js';
import striperouter from './router/stripe.router.js';
import blobrouter from './router/blob.router.js'
import cors from 'cors';
import bodyParser from 'body-parser';


      export const options = {
          key: fs.readFileSync('/etc/letsencrypt/live/factoq.com-0001/privkey.pem'),
          cert: fs.readFileSync('/etc/letsencrypt/live/factoq.com-0001/fullchain.pem')
        };
if (cluster.isPrimary) {
    // Fork workers equal to the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
 // Listen for worker exit event and fork a new worker if one exits
 cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
}
  else {
      
       const app = express();
      app.use(cors())
      app.use(express.json());
      app.use(bodyParser.json())
      app.use(cors(process.env.CORS_ORIGIN));
      
      app.use('/backend/user', userrouter);
      app.use('/backend/heimdall', heimdallrouter);
      app.use('/backend/financial', financials);
      app.use('/backend/cdb', cdbrouter);
      app.use('/backend/stripe' , striperouter);
      app.use('/backend/blob' , blobrouter);
      
      
      
      
      const port = process.env.PORT ;
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  }

