import ApiError from "../error/api.error.js";
import { connect } from "../database.js";
import { HEIMDALL,aicite_user, deal_id,patent,trending_news} from "../constant.js";


export const comp = async (req, res, next) => {
    try{
        const sterm = req.query.sterm;

        const querySpec ={
            "query": "SELECT TOP 1 c.email , c.company_name  FROM c WHERE c.email = @keyword ",
            "parameters": [
                {"name": "@keyword", "value": sterm}
            ]
        }
        console.log(querySpec);
        const dbconnect = await connect(HEIMDALL,aicite_user);
        const {resources} = await dbconnect.container.items.query(querySpec).fetchAll();
        
        if (resources.length == 0){
            res.status(404).send("No user found");
        }
        console.log(resources);
        res.send(resources);
    }
    catch(err){
        next(new ApiError(500, "Internal Server Error", [], err.stack));
    }   
}
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
      const dbconnect = await connect(HEIMDALL, deal_id);
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
        AND c.Status IN('Cofirmed', 'Signal' , 'Updated' ,'VC Fund')`
      }
      //console.log(queryspec); 
      const dbconnect = await connect(HEIMDALL,deal_id);
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
        AND c.Status IN('Cofirmed', 'Signal' , 'Updated' ,'VC Fund')`
      }
      const dbconnect = await connect(HEIMDALL,deal_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch (err){
      
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
        AND c.Status IN('Cofirmed', 'Signal' , 'Updated' ,'VC Fund')`
      }
      const dbconnect = await connect(HEIMDALL,deal_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);     
    }catch (err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  export const trending = async (req, res, next) => {
    try{

      const querySpec= {
        query: `SELECT TOP 2 * FROM c ORDER BY c.published_date DESC`
      }
      const dbconnect = await connect(HEIMDALL,trending_news);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  export const patents = async (req, res, next) => {
    try{

      const sterm = req.query.sterm;
    console.log(sterm);    
    const querySpec = {
      query:
        `SELECT * FROM c WHERE c.MCA_CIN = @keyword `,
      parameters: [
        
         {
          name: "@keyword",
          value: sterm,
        },
      ], 
      }
      const dbconnect = await connect(HEIMDALL,patent);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  export const seed_information = async (req, res, next) => {
    try{

      const querySpec= {
        query: `SELECT TOP 2 * FROM c ORDER BY c.published_date DESC`
      }
      const dbconnect = await connect(HEIMDALL,deal_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }