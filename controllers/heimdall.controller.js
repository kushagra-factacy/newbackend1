import ApiError from "../error/api.error.js";
import { connect } from "../database.js";
import { HEIMDALL,CDB,aicite_user, deal_id,heimdall_v2,investor_id,patent,trending_news,person_all, person ,investor_list } from "../constant.js";

/*--------------------------------------------------------------------------------------------*/

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

  /*-----------------------------------------------------------------------------*/
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

  /*-------------------------------------------------------------------*/
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
  
  // ---------------------------------------------------------------------------------//

  export const investor_alt = async (req, res, next) => {
    try{

      const sterm = req.query.sterm;
      const trimmedInput = sterm.replace(/"/g, "");
    const art=trimmedInput.split(",")
  
    console.log(art);    
    const querySpec = {
      query:
        `SELECT * FROM c where ARRAY_CONTAINS( [@keyword],c.id) `,
      parameters: [
        
         {
          name: "@keyword",
          value: art,
        },
      ], 
      }
      console.log(querySpec);
      const dbconnect = await connect(HEIMDALL,deal_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }

  // -------------------------------------------------------------------------------------------------------//
  


  export const seed_info_detail = async (req, res, next) => {
    try{
      const seed = req.query.input
      //const value = req.query.number
      const querySpec= {
        query: `SELECT TOP 20 * FROM c WHERE c.Corrected_Series =${seed} AND (c.Status = 'Updated' OR c.Status = 'Confirmed')`
      }
      const dbconnect = await connect(HEIMDALL,deal_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }

  // ------------------------------------------------------------------------------------------------
  export const investor = async (req, res, next) => {
    try{

      const sterm = req.query.sterm;
      const trimmedInput = sterm.replace(/"/g, "");
    const art=trimmedInput.split(",")
      console.log(sterm);    
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
      const dbconnect = await connect(HEIMDALL,investor_id);
      const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
      console.log(resources);
      res.send(resources);
    }catch(err){
      next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
  }
  //--------------------------------------------------------------------------------------------
  
export const topinvestor = async(req,res,next)=>{
  const Sector = req.query.sector;
  // console.log(Sector);
  try {
    const querySpec = {
      query: 'SELECT TOP 5 c.Corrected_Investors FROM c WHERE CONTAINS(c.All_Sectors, @sector) AND c.Status = "Confirmed"',
      parameters: [
        { name: '@sector', value: Sector }
      ]
    };
    // console.log(querySpec);
  let investorNames =[] ;
  const dbconnect = await connect(HEIMDALL,deal_id);
   const {resources : items } = await dbconnect.container.items.query(querySpec).fetchAll();
  //  console.log(items);
   items.map(item =>{
    item.Corrected_Investors.forEach(investor => {
        investorNames.push(investor[1]);
    });
});
investorNames= investorNames.filter(investor=>investor !== 'UNDISCLOSED' )
investorNames= investorNames.slice(0,3)
  //  console.log(investorNames)
   let investorData = [];
   for (let i = 0 ; i<=3 ;i++)
   {
      //  console.log(investorNames[i]);
       const querySpec2 = {
          query: `SELECT c.proposed_Investor['${investorNames[i]}'] FROM c`
      };
      // console.log(querySpec2);
      const dbconnect = await connect(CDB, investor_list);

      let {resources: investor} = await dbconnect.container.items.query(querySpec2).fetchAll();
      let filteredInvestor = investor.filter(newinvestor => Object.keys(newinvestor).length !== 0);

    if (filteredInvestor.length > 0) {
        investorData.push(filteredInvestor[0]);
    }
}
res.send(investorData);
}catch(err){
  next(new ApiError(500, "Internal Server Error", [], err.stack));
}
}
// -----------------------------------------------------------------------------
export const leading_investor = async (req, res, next) => {
  try{

     
  const querySpec = {
    query:
      `SELECT  c.Investor, c.id,c.Investor_Bio,c.Investor_Deal_Ids, ARRAY_LENGTH(c.Investor_Deal_Ids) as length FROM c WHERE ARRAY_LENGTH(c.Investor_Deal_Ids) >= 50 AND c.Investor != "UNDISCLOSED" `,
     
    }
    const dbconnect = await connect(HEIMDALL,investor_id);
    const { resources:unsortedResults } = await dbconnect.container.items.query(querySpec).fetchAll();
    const sortedResults = unsortedResults.sort((a, b) => b.Length - a.Length);
    var trimmedresult = sortedResults.map((investor)=>{
      return {
       ...investor,
       Investor_Deal_Ids:investor.Investor_Deal_Ids.slice(0,10)
     }
   
   })
    res.send(trimmedresult);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
// -----------------------------------------------------------------------------

export const company_deals = async (req, res, next) => {
  try{

    const inputRefIds= req.query.input;
  
    const RefIdsArray=inputRefIds.split(",").map(item=>'"' + item +'"').join(',');

  // console.log(RefIdsArray);    
  const querySpec = {
    query: `SELECT * FROM c where ARRAY_CONTAINS( [${RefIdsArray}],c.Reference_Id)`,
    }
    // console.log(querySpec);
    const dbconnect = await connect(HEIMDALL,deal_id);
    const { resources:data } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(data);
  }catch(err){
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
}
