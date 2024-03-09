import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { FINANCIAL, cap_tables  } from "../constant.js";

//export default router;


export const fin = async (req, res, next) =>{
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
     };
     console.log(querySpec);
    const dbconnect = await connect(FINANCIAL,cap_tables);
    const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
    res.send(resources);
    }catch(err){
        next(new ApiError(500, "Internal Server Error", [], err.stack));
    }


}