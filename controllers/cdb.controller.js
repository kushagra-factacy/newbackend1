import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { CDB, aicite_ic,all_sectors, business_news } from "../constant.js";


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
    const dbconnect = await connect(CDB, business_news);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
export const getarts = async (req , res , next ) =>{
  try{
    const sterm = req.query.sterm;
    console.log(sterm);    
    const querySpec = {
      query:
        `SELECT * FROM c where ARRAY_CONTAINS( @keyword1, c.Art_Id )`,
      parameters: [
          {
          name: "@keyword1", 
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

export const funding = async (req , res , next ) =>{
  try{
    const sterm = req.query.sterm;
    console.log(sterm);    
    const querySpec = {
      query:
        `SELECT TOP 100 * FROM c where c.Funding_Alert ='Funding' ORDER BY c.Unique_date_time desc`,
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
