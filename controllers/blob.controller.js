import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import ApiError from "../error/api.error.js";

import fs from 'fs'

export const fetchFile = async (req,res,next)=>{
    try{
      const account = 'investorfiles1';
      const accountKey = 'lZ6VhuEsafrw3PlAGw57E64pL0sUOMWA2thVLNfxIv+PgEf+QZHJfwGStq3Oh8W970Nf49LI9wSw+AStynZ9RA==';
      const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
      const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
      );
      const filename = req.query.filename;
      console.log(filename)
      const containerName = 'excel-files'; // Specify the name of your Azure Storage container
    
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(filename);
      
      const downloadBlockBlobResponse = await blobClient.download(0);
      const readStream = downloadBlockBlobResponse.readableStreamBody;
    
      if (!readStream) {
        res.status(500).send('Error downloading file');
        return;
      }
    
        // Set the content type to 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' for .xlsx files
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    readStream.pipe(res);
      
    
    }
    catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }

  
export const sectorfile = async (req,res,next)=>{
    try{
      const account = 'factacymain';
      const accountKey = 'qGGfAfoDJ7s8BekXWk1RXv1pGswqjwnvHfmlJnlID3WAqD4rxbsFrzXjziIcA9fKe2IEmJgeLm0n+AStFMOCUQ==';
      const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
      const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
      );
      
      const sector = req.query.sector;
      console.log(sector)
      const containerName = 'sectorwise-investor-files'; // Specify the name of your Azure Storage container
    
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(`Excel_files/${sector}`);
      console.log(blobClient)
      const downloadBlockBlobResponse = await blobClient.download(0);
      const readStream = downloadBlockBlobResponse.readableStreamBody;
    
      if (!readStream) {
        res.status(500).send('Error downloading file');
        return;
      }
    
        // Set the content type to 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' for .xlsx files
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    readStream.pipe(res);
      
    
    }
    catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
    

export const confirmsector = async(req,res,next)=>{
  const sector = req.query.sector;
    console.log(`Requested sector: ${sector}`);

    fs.readFile('./public/sector.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while reading the file.');
        }

        try {
            const sectors = JSON.parse(data);
            const sectorData = sectors[sector];

            if (!sectorData) {
                return res.status(404).send('Sector not found.');
            }

            res.json(sectorData);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('An error occurred while parsing the file.');
        }
    });
  }

