import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { CDB, ai_Profile, aicite_ic,all_sectors, business_news, patent_IC , invester_user,investor_list, } from "../constant.js";


import {EmailClient} from '@azure/communication-email'

import { options } from "../index.js";

import bcrypt from 'bcrypt'
const saltRounds = 8;
import jwt from 'jsonwebtoken'
import { query } from "express";

export const industrial_portfolio = async (req, res, next) => {
  try {
    const sterm = req.query.sterm;
    console.log(sterm);
    const num = req.query.value;
    const querySpec = {
      query:
        "SELECT TOP @keyword1 * FROM c WHERE c.summary_IC IN(@keyword2) ORDER BY c.Unique_date_time DESC",
      parameters: [
        {
          name: "@keyword1",
          value: parseInt(num),
        },
        {
          name: "@keyword2",
          value: sterm,
        },
      ],   };

     console.log(querySpec);

    const dbconnect = await connect(CDB, aicite_ic);
    const { resources } = await dbconnect.container.items
    
      .query(querySpec)
      .fetchAll();
    res.send(resources);
  } catch (err) {
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
};


export const main_sector = async (req, res , next) =>{
  try {


    const querySpec= {
      query :  'SELECT TOP 56 c.Main,c.Sectors_Url FROM c'
    }
    const dbconnect = await connect(CDB,all_sectors);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);    

    

  }catch (err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}

export const cnews = async (req , res , next ) =>{
  try{
    const sterm = req.query.sterm;
    console.log(sterm);    
    const querySpec = {
      query:
        `SELECT  * FROM c WHERE  STARTSWITH(c.id, @keyword2)`,
      parameters: [
        
         {
          name: "@keyword2",
          value: sterm,
        },
      ],  
     };
     console.log(querySpec);
    const dbconnect = await connect(CDB,  );
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}


export const getarts = async (req , res , next ) =>{
  try{
    const sterm = req.query.sterm;
    
    const trimmedInput = sterm.replace(/"/g, "");
    const art=trimmedInput.split(",")
    console.log(sterm);
    
    const querySpec = {
      query:
        `SELECT * FROM c where ARRAY_CONTAINS( @keyword1, c.Art_Id )`,
      parameters: [
          {
          name: "@keyword1", 
          value: art,
        },
      ],  
     };
     console.log(querySpec);
    const dbconnect = await connect(CDB, aicite_ic);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    console.log(resources);
    res.send(resources);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}

export const funding = async (req , res , next ) =>{
  try{
    const sterm = req.query.sterm;
    console.log(sterm);    
    const querySpec = {
      query:
        `SELECT TOP 100 c.Art_Id,c.Headline,c.url,c.image,c.summary_of_article,c.summary_IC, c.published_date,c.published_date_time,c.Unique_date_time,c.id,c.Aicite_Sectors,c.Funding_Alert FROM c order by c.Unique_date_time desc`,
      parameters: [
        
         {
          name: "@keyword2",
          value: sterm,
        },
      ],  
     };
     console.log(querySpec);
    const dbconnect = await connect(CDB, aicite_ic);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}

export const news_intel = async (req, res, next) => {
    try{

      const querySpec= {
        query: `SELECT TOP 100 * from c where c.esg_category != 'NON ESG' order by c.Unique_date_time desc`
      }
      const dbconnect = await connect(CDB,aicite_ic);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  export const news = async (req , res , next ) =>{
    try{
      const sterm = req.query.sterm;
      console.log(sterm);    
      const querySpec = {
        query:
          `SELECT TOP 100 c.Art_Id,c.Headline,c.url,c.image,c.summary_of_article,c.summary_IC, c.published_date,c.published_date_time,c.Unique_date_time,c.id,c.Aicite_Sectors FROM c order by c.Unique_date_time desc`,
        // parameters: [
          
        //    {
        //     name: "@keyword2",
        //     value: sterm,
        //   },
        // ],  
       };
       console.log(querySpec);
      const dbconnect = await connect(CDB, aicite_ic);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  // -------------------------------------------------------------
  export const getids = async (req , res , next ) =>{
    try{
      const sterm = req.query.sterm;
      console.log(sterm);    
      const querySpec = {
        query:
          `SELECT * FROM c where c.ORG LIKE @keyword`,
        parameters: [
          
           {
            name: "@keyword",
            value: sterm,
          },
        ],  
       };
       console.log(querySpec);
      const dbconnect = await connect(CDB, business_news);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  // -------------------------------------------------------------------
  export const mca_cin_info = async (req , res , next ) =>{
    try{
      const sterm = req.query.sterm;
      console.log(sterm);    
      const querySpec = {
        query:
          `SELECT * FROM c WHERE c.MCA_CIN = @keyword`,
        parameters: [
          
           {
            name: "@keyword",
            value: sterm,
          },
        ],  
       };
       console.log(querySpec);
      const dbconnect = await connect(CDB, ai_Profile);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
// ------------------------------------------------------------------------------------
  export const patentsearch = async (req, res, next) => {
    try{

      const sterm = req.query.sterm;
      const trimmedInput = sterm.replace(/"/g, "");
    const art=trimmedInput.split(",")
  
    console.log(art);    
    const querySpec = {
      query:
        `SELECT * FROM c where ARRAY_CONTAINS( @keyword,c.id) `,
      parameters: [
        
         {
          name: "@keyword",
          value: art,
        },
      ], 
      }
      console.log(querySpec);
      const dbconnect = await connect(CDB,patent_IC);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }

  //--------------------------------------------------------------------------
  export const business_id = async (req, res, next) => {
    try{

      const sterm = req.query.sterm;
      const trimmedInput = sterm.replace(/"/g, "");
    const art=trimmedInput.split(",")
  
    console.log(art);    
    const querySpec = {
      query:
        `SELECT * FROM c where ARRAY_CONTAINS( @keyword,c.Output_CIN) `,
      parameters: [
        
         {
          name: "@keyword",
          value: art,
        },
      ], 
      }
      console.log(querySpec);
      const dbconnect = await connect(CDB,business_news);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }


  // ---------------------------------------------------------------------------------------------------------
  export const inv_regist = async (req, res, next) => {
    try {
        const { first_name, last_name, email, company, phone, password, username, id, gstin ,site } = req.body;

        const querySpec = {
            query: "SELECT * from c where c.email = @keyword",
            parameters: [
                {
                    name: "@keyword",
                    value: email,
                },
            ],
        };

        const dbconnect = await connect(CDB, invester_user);
        const { resources: existingInvestors } = await dbconnect.container.items.query(querySpec).fetchAll();
        console.log(existingInvestors);
        if (existingInvestors.length > 0) {
          
            return res.send("email id already exist");
        }

        const hashedpass = await bcrypt.hash(password, saltRounds);

        const investor = { first_name, last_name, email, company, phone, hashedpass, username, id, gstin  ,site};
        await dbconnect.container.items.upsert(investor);
        console.log(email);
        console.log(first_name);

        // await sendmail(email, first_name).then
        // (console.log("emailsent"))
        // .catch((err)=>{
        //   console.log(err);
        // })
        await sendmail(email,first_name)
        
        jwt.sign({ email, hashedpass }, options.key, { algorithm: 'RS256', expiresIn: '1h' }, (err, token) => {
            
          if (err) {
                next(new ApiError(500, "Internal Server Error", [], err.stack));
            } else {
                res.send({ token });
            }
        });

    } catch (err) {
        next(new ApiError(500, "internal server error", [], err.stack));
    }
} 
// ---------------------------------------------------------------------------------------
export const proposed_investor = async (req, res, next) => {
  try {
      const sterm = req.query.sterm;
      console.log(sterm);

      const querySpec = {
          query: `SELECT * FROM c where c.id =@keyword`,
          parameters: [
              {
                  name: "@keyword",
                  value: sterm,
              },
          ],
      };

      console.log(querySpec);

      const dbconnect = await connect(CDB, investor_list);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();

      if (resources.length <= 0) {
          res.send("No proposed investors found");
          return;
      }

      const tempOBJ = {};
      const proposedInvestor = resources[0].proposed_Investor;

      if (proposedInvestor && Object.keys(proposedInvestor).length > 0) {
          const investorKeys = Object.keys(proposedInvestor);
          const filteredInvestors = {};

          investorKeys.forEach(investor => {
              if (proposedInvestor[investor].website !== "NO") {
                  filteredInvestors[investor] = proposedInvestor[investor];
              }
          });

          const filteredInvestorKeys = Object.keys(filteredInvestors);

          if (filteredInvestorKeys.length > 0) {
              filteredInvestorKeys.slice(0, 3).forEach(investor => tempOBJ[investor] = filteredInvestors[investor]);
              resources[0].proposed_Investor = tempOBJ;
              res.send(resources);
              return;
          }
      }

      res.send("No proposed investors found with valid websites");
  } catch (err) {
      next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
// ----------------------------------------------------------------------------------------
    export const investor_download = async (req , res , next ) =>{
      try{
        const sterm = req.query.sterm;
        console.log(sterm);    
        const querySpec = {
          query:
            `SELECT * FROM c where c.email =@keyword`,
          parameters: [
            
             {
              name: "@keyword",
              value: sterm,
            },
          ],  
         };
         console.log(querySpec);

        const dbconnect = await connect(CDB, investor_list);
        const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
        if (resources.length <=0)
        {
          res.send("no proposed inv")
        }
        const tempOBJ = {};
        if (resources[0].proposed_Investor !== null && resources[0].proposed_Investor !== 'undefined') {
            const list = Object.keys(resources[0].proposed_Investor);
            if (list.length > 3) {
                list.slice(0, 3).forEach(item => tempOBJ[item] = resources[0].proposed_Investor[item]);
                resources[0].proposed_Investor = tempOBJ;
	        
        res.send(resources);
            }
          }

	else{
	res.send("no proposed investor found")
}
      }
    
  
  

      catch(err){
        next(new ApiError(500, "Internal Server Error", [], err.stack));
      }
    }
    // -----------------------------------------------------------------------------------------------
export const confirm_user = async (req,res,next)=>{
 
    try {
      const {mca_company_name, email , company_id } = req.body
      console.log(req.body);
      const querySpec = {
        query: `SELECT * from c where c.email = @keyword` , 
        parameters:[
          {
            name: "@keyword" ,
            value: email,
          },
        ],
      }
      console.log(querySpec)
      const dbconnect = await connect(CDB ,invester_user );
      console.log("database connected");

      const {resources: existingUsers } = await dbconnect.container.items.query(querySpec).fetchAll();
      const existingUser = existingUsers[0];
      if (!existingUser) {
        return res.status(404).send('User not found');
      }
      const updatedUser = {
        id: existingUser.id,
        ...existingUser,
        mca_company_name: mca_company_name,
        company_id: company_id,
      };
      // const investor = {...existingInvestors, company_id, mca_company_name};
      await dbconnect.container.items.upsert(updatedUser);
      res.send("user updated")
          
    }
    catch(err){
      next(new ApiError(500 , "internal server error" , [] ,err.stack));
    }
  }
  







    export const inv_user_detail = async(req,res,next)=> {
  const {email } = req.body;
  try{
    const querySpec = {
      query: "SELECT * FROM c WHERE c.email = @keyword",
      parameters:[{
        name: "email",
        value: email
      }],
    };
    console.log(querySpec);
    const dbconnect = await connect(CDB , investor_user);
    const {resources: existingUsers}= await dbconnect.container.items
    .query(querySpec)
    .fetchAll();
    console.log(existingUsers);
    res.send(existingUsers)

  }
  catch(err){
    next (new ApiError(500 ,"internal server error",[],err.stack))

  }
};

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// --------------------------------------------------------------------------------------------------

export const i_regist = async (req ,res ,next) =>{
  try {
    const {first_name , last_name , email , company , phone , password , username , id ,gstin } = req.body
    console.log(req.body);
    const querySpec = {
      query: `SELECT c.id from c where c.id = @keyword` , 
      parameters:[
        {
          name: "@keyword" ,
          value: id,

        },

      ],
    }
    console.log(querySpec)
     const dbconnect = await connect(CDB ,investor_list );
     console.log("database connected");
     const {resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    console.log(resources)
     const investor = {id, first_name, last_name, email, company, phone, password, username,gstin};
    await dbconnect.container.items.upsert(investor);

    
    res.send("data saved successfully");
  }
  catch(err){
    next(new ApiError(500 , "internal server error" , [] ,err.stack));
  }

   }


  //---------------------------------------------------------------------

export const inv_login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const querySpec = {
            query: "SELECT c.id,c.email ,c.hashedpass from c where c.email = @email",
            parameters: [{
                name: "@email",
                value: email
            }],
        };
        console.log(querySpec);
        const dbconnect = await connect(CDB, invester_user);
        const { resources: existingUsers } = await dbconnect.container.items
            .query(querySpec)
            .fetchAll();
        console.log(existingUsers);
        if (existingUsers.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const user = existingUsers[0];
        const match = await bcrypt.compare(password, user.hashedpass);
        if (!match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        jwt.sign({ user }, options.key, { algorithm: 'RS256', expiresIn: '1h' }, (err, token) => {
            if (err) {
                next(new ApiError(500, "Internal Server Error", [], err.stack));
            } else {
                res.send({ token });
            }
        });
    } catch (err) {
        next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
};
//------------------------------------------------------------
//-------------------------------------------------------------
 export const user_final = async(req,res,next)=> {
try {
        const email = req.query.email;

     //   const database = cosmosClient.database(databaseId);
       // const container = database.container(containerId);

        const querySpec = {
            query: "SELECT * FROM c WHERE c.email = @keyword",
            parameters: [{ 
                name: "@keyword", 
                value: email 
            }]
        };
        // console.log(querySpec);
        const dbconnect = await connect(CDB , invester_user);
        const { resources:existingUser } = await dbconnect.container.items.query(querySpec).fetchAll();
        console.log(existingUser);
         
          
         res.send(existingUser)
        // console.log(existingUser);
               
    } catch (error) {
        console.error("Error querying Cosmos DB:", error);
        res.status(500).send("Error querying Cosmos DB databasee");
    }
}

// ---------------------------------------------------------------------------------------------------------

export const testRoute = async (req, res, next) => {
  try {
    
    
    console.log("test route");
    res.send("Test route executed successfully");
  } catch (err) {
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}

// ----------------------------------------------------


export const leading_sectors = async (req, res , next) =>{
  try {


    const querySpec= {
      query: "SELECT c.Sectors,c.Deal_Id, c.Patent_SOS, c.Application_No_List, ARRAY_LENGTH(c.Deal_Id) AS Length FROM c WHERE c.Sector_Id NOT LIKE '%.%'"

    }
    const dbconnect = await connect(CDB,all_sectors);
    const { resources :unsortedResults } = await dbconnect.container.items.query(querySpec).fetchAll();
    const sortedResults = unsortedResults.sort((a, b) => b.Length - a.Length);
    
    var trimmedresult = sortedResults.map((investor)=>{
      if(Array.isArray(investor.Deal_Id))
        {

          return {
           ...investor,
           Deal_Id: investor.Deal_Id.slice(0,10)
         }
        }
   
   });
   
   res.send(trimmedresult)
    

  }catch (err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
// ----------------------------------------------------------------------------------
async function sendmail(email,name) {
  
  console.log(email);
  const connectionString = "endpoint=https://newemail.unitedstates.communication.azure.com/;accesskey=DWH1kigwxmYsXCesRCajzbxVsZIlW1/XSgcogT5AY2FwDr3pLpId8q/Fn8l4AjP1jwbMrDgodmMQRKxFDUxUbA==";
  const client = new EmailClient(connectionString);
  const emailMessage = {
      senderAddress: "DoNotReply@factacy.ai",
      content: {
          subject: "Welcome To StartupInvestor.ai",
          html:`<html>
 
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        body {
            margin: 0;
            background-color: #f0f1f2;
        }
 
        table {
            border-spacing: 0;
        }
 
        td {
            padding: 0;
        }
 
        img {
            border: 0;
        }
 
        .wrapper {
            width: 100%;
            table-layout: fixed;
            /* background-color: #f0f1f2; */
            background-color: #fff;
            padding-bottom: 60px;
        }
 
        .main {
            background-color: #fff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a1b;
        }
 
        .two-columns {
            text-align: center;
        }
 
        .two-columns .column {
            /* width: 100%; */
            /* max-width: 300px; */
            display: inline-block;
            vertical-align: top;
            text-align: center;
        }
    </style>
</head>
 
<body>
    <center class="wrapper">
        <table class="main" style="width: 100%; padding: 12px;">
            <!-- LOGO SECTION -->
            <tr>
                <td style=" padding: 14px 0 14px;">
                    <table style="width: 100%;">
                        <tr>
                            <td class="two-columns">
                                <table class="column">
                                    <tr>
                                        <td>
                                            <img src="https://factacymain.blob.core.windows.net/asset/Factacy-Blue-Logo.jpg" alt="Factacy-log"
                                                style="height: 36px; margin: 0 auto;">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- BANNER IMAGE -->
            <tr>
                <td style=" text-align: center;">
                    <!-- <a href="" style="text-align: center; margin: 0 auto;"><img src="./assets/lock.svg" alt=""></a> -->
                    <table class="column" style=" display: inline-block; vertical-align: top; text-align: center;">
                        <tr>
                            <td>
                                <img src="https://factacymain.blob.core.windows.net/asset/welcome.jpg" style=" margin: 0 auto; width: 200px ;" alt="">
                            </td>
                        </tr>
                    </table>
 
                </td>
            </tr>
            <!-- HEADING -->
            <tr>
                <td style=" text-align: center;">
                    <!-- <a href="" style="text-align: center; margin: 0 auto;"><img src="./assets/lock.svg" alt=""></a> -->
                    <table class="column" style=" display: inline-block; vertical-align: top; text-align: center;">
                        <tr>
                            <td>
                                <h1 class="heading" style="font-size: 24px; font-weight: 800;">Welcome to the Startupinvestors.ai!</h1>
                            </td>
                        </tr>
                    </table>
 
                </td>
            </tr>
            <!-- PARAGRAPH TEXT -->
            <tr>
                <td style="padding: 0px 18px 8px 0px;">
                    <!-- <a href="" style="text-align: center; margin: 0 auto;"><img src="./assets/lock.svg" alt=""></a> -->
                    <p>Hi <span style="font-weight: 600;">${name}</span>,</p>
                    <p style="margin-top: 0; font-size: 16px; font-weight: 500;">Thank you for signing up on StartupInvestor.ai. We're here to help you discover the investors that match your needs.</p>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="column" style=" display: inline-block; vertical-align: top;">
                        <tr>
                            <td>
                                <div class="thanks" style="padding: 0px 18px 36px 0px;">
                                    <p style=" margin: 0; font-size: 14px;">Best,</p>
                                    <h5 style=" margin: 0; font-size: 18px;">Team Factacy</h5>
                                </div>
                            </td>
                        </tr>
                    </table>
 
                </td>
            </tr>
            <!-- HORIZONTAL BAR -->
            <tr>
                <td height="2px" style="background-color: gray;"></td>
            </tr>
            <!-- FOOTER SECTION -->
            <tr>
                <td style="text-align: center; padding: 18px; padding-top: 24px;">
                    <table class="column" style=" display: inline-block; vertical-align: top; text-align: center;">
                        <tr>
                            <td>
                                <p class=" paragraph-two" style=" color: white; text-align: center; color: gray;">
                                    If you have any questions about the information provided or need any assistance, please don't hesitate to reach out to us at
                                    <a href="mailto:connect@factacy.ai"
                                        style=" color: #1476BF; text-align: center; text-decoration: none; text-decoration: underline;">connect@factacy.ai
                                    </a>
                                    We are here to help you every step of the way.
                                </p>
                            </td>
                        </tr>
                    </table>
 
                </td>
            </tr>
            <!-- SOCIAL ICONS -->
            <tr>
                <td style="text-align: center;">
                    <table class="column" style=" display: inline-block; vertical-align: top; text-align: center; ">
                        <tr>
                            <td>
                                <diV class="social-parent"
                                    style="display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 0;">
                                    <a href="https://twitter.com/FactacyAI/" target="_blank">
                                        <img style="height: 20px;" class=" social-icon" src="https://factacymain.blob.core.windows.net/asset/x.jpg" alt="X">
                                    </a>
                                    <a href="https://www.facebook.com/factacydotAI/" target="_blank">
                                        <img style="height: 20px;" class=" social-icon" src="https://factacymain.blob.core.windows.net/asset/facebook.jpg"
                                            alt="facebook">
                                    </a>
                                    <a href="https://www.linkedin.com/company/factacy/" target="_blank">
                                        <img style="height: 20px;" class=" social-icon" src="https://factacymain.blob.core.windows.net/asset/linkedin.jpg"
                                            alt=" linkedin">
                                    </a>
                                </diV>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
 
</html>`,
          
      },
      recipients: {
          to: [{ address: email }],
      },
  };
  try {
    const poller = await client.beginSend(emailMessage);
    await poller.pollUntilDone();
    console.log("email done");
    
    return true;
} catch (err) {
    console.error('Error sending email:', err);
    return false;
}
};
