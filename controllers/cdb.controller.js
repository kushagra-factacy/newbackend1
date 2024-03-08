import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { cdb, aicite_ic, deal_id, heimdall, all_sectors } from "../constant.js";

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
      ],
    };

    // console.log(querySpec);

    const dbconnect = await connect(cdb, aicite_ic);
    const { resources } = await dbconnect.container.items
      .query(querySpec)
      .fetchAll();
    res.send(resources);
  } catch (err) {
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
};
export const deal = async ( req , res , next )=>{
  try{

    const sterm = req.query.sterm;
    console.log(sterm);
    const num = req.query.value;
    const querySpec ={
    query: "SELECT * FROM c  order by c._ts desc",
        parameters: [
                     {
                    name: '@keyword',
                    value: sterm
             }
        ]

      };
    const dbconnect = await connect(heimdall, deal_id);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch (err){
    console.log("Internal server error");
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  
  }
}
export const deal30 = async ( req, res , next ) => {
  try{

    //console.log("ready to execute") 
    const querySpec= {
      query: `SELECT  c.id, c.Output_CIN,  c.Legal_Name, c.Art_Id , c.date,  c.Corrected_Investee,
      c.Corrected_Amount, c.Corrected_Series, c.Corrected_Investors, c.Corrected_Vision,
      c.Status, c.Sector, c.Sector_Classification, c.Unique_date_time FROM c
      WHERE DateTimeDiff("day", c.published_date, GetCurrentDateTime()) <= 30
      AND c.Status != 'Invalid Article'`
    }
    //console.log(queryspec); 
    const dbconnect = await connect(heimdall,deal_id);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch(err){
   console.log("Error")
   next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
export const deal60 = async (req , res , next) =>{
  try{

    //console.log("container and database ready to work");
    const querySpec= {
      query: `SELECT  c.id, c.Output_CIN,  c.Legal_Name, c.Art_Id , c.date,  c.Corrected_Investee,
      c.Corrected_Amount, c.Corrected_Series, c.Corrected_Investors, c.Corrected_Vision,
      c.Status, c.Sector, c.Sector_Classification, c.Unique_date_time FROM c
      WHERE DateTimeDiff("day", c.published_date, GetCurrentDateTime()) <= 60
      AND c.Status != 'Invalid Article'`
    }
    const dbconnect = await connect(heimdall,deal_id);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
  }catch (err){
    console.log("Error");
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
export const deal90 = async (req , res ,next) => {
  try{

   //   console.log("container and database ready to work");
    const querySpec= {
      query: `SELECT  c.id, c.Output_CIN,  c.Legal_Name, c.Art_Id , c.date,  c.Corrected_Investee,
      c.Corrected_Amount, c.Corrected_Series, c.Corrected_Investors, c.Corrected_Vision,
      c.Status, c.Sector, c.Sector_Classification, c.Unique_date_time FROM c
      WHERE DateTimeDiff("day", c.published_date, GetCurrentDateTime()) <= 90
      AND c.Status != 'Invalid Article'`
    }
    const dbconnect = await connect(heimdall,deal_id);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);     
  }catch (err){
    console.log("Error");
  }
}
export const main_sector = async (req, res , next) =>{
  try {


    const querySpec= {
      query :  'SELECT TOP 56 c.Main,c.Sectors_Url FROM c'
    }
    const dbconnect = await connect(cdb,all_sectors);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);    
    
  }catch (err){
    console.log("Error")
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}