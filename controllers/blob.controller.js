import { BlobServiceClient, BlobServiceClient,StorageSharedKeyCredential } from '@azure/storage-blob';

import {connect } from "../database.js"

import {blob_pdf_cont ,blob_excel_cont } from '../constant.js' ;

const accountName = 'investorfiles1';

const accountKey = process.env.BLOB_ACC_KEY

const excel_container = blob_excel_cont

const pdf_container = blob_pdf_cont

// Create a BlobServiceClient object

const crediantial = new StorageSharedKeyCredential(accountName , accountKey)

const BlobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`)
