import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { CDB, ai_Profile, aicite_ic,all_sectors, business_news, patent_IC , investor_list } from "../constant.js";


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
      const {first_name , last_name , email , company , phone , password , username , id } = req.body
      console.log(req.body);
      const querySpec = {
        query: `SELECT * from c where c.id = @keyword` , 
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
      const {resources: existingInvestors } = await dbconnect.container.items.query(querySpec).fetchAll();
      console.log(existingInvestors)
      const existingInvestor = existingInvestors[0] || {};
      const investor = {...existingInvestor, first_name, last_name, email, company, phone, password, username};
      await dbconnect.container.items.upsert(investor);

      res.send("data saved successfully");
    }
    catch(err){
      next(new ApiError(500 , "internal server error" , [] ,err.stack));
    }
  }
  
  
// ---------------------------------------------------------------------------------------
     export const proposed_investor = async (req , res , next ) =>{
      try{
        const sterm = req.query.sterm;
        console.log(sterm);    
        const querySpec = {
          query:
            `SELECT * FROM c where c.id =@keyword`,
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
        res.send(resources);
      }catch(err){
        next(new ApiError(500, "Internal Server Error", [], err.stack));
      }
    }
    
  
     
    // -----------------------------------------------------------------------------------------------


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    //   try{

  //     const sterm = req.query.sterm;
  //     const trimmedInput = sterm.replace(/"/g, "");
  //   const art=trimmedInput.split(",")
  
  //   console.log(art);    
  //   const querySpec = {
  //     query:
  //       `SELECT * FROM c where ARRAY_CONTAINS( @keyword,c.id) `,
  //     parameters: [
        
  //        {
  //         name: "@keyword",
  //         value: art,
  //       },
  //     ], 
  //     }
  //     console.log(querySpec);
  //     const dbconnect = await connect(CDB,all_sectors);
  //     const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
  //     res.send(resources);
  //   }catch(err){
  //     next(new ApiError(500, "Internal Server Error", [], err.stack));
  //   }
  // }

// --------------------------------------------------------------------------------------------------

export const i_regist = async (req ,res ,next) =>{
  try {
    const {first_name , last_name , email , company , phone , password , username , id } = req.body
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
     const investor = {id, first_name, last_name, email, company, phone, password, username};
    await dbconnect.container.items.upsert(investor);

    
    res.send("data saved successfully");
  }
  catch(err){
    next(new ApiError(500 , "internal server error" , [] ,err.stack));
  }

   }


  //---------------------------------------------------------------------

  
