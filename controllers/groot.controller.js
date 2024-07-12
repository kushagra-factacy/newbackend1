import ApiError from "../error/api.error.js";
import { connect } from "../database.js";

import { Groot_DB , blogs  } from "../constant.js";




// ------------------------------------------------------------
export const daily_summary = async (req, res, next) => {
    const offset  = req.query.OFFSET ;
    const limit = req.query.LIMIT ;

    try{
      const querySpec= {
        query: `SELECT * FROM c  order by  c.Epoch DESC  OFFSET ${offset} LIMIT ${limit}`
      }
      const dbconnect = await connect(Groot_DB,blogs);
      try {
        const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
        
        res.send(resources);
      } catch (err) {
        // Here, we catch and re-throw the error with additional details
        throw new Error(`Error in daily_summary API: ${err.message}`);
      }
    }catch(err){
      // The error caught here will now include which API call failed
      next(new ApiError(500, "Internal Server Error Daily Summary", [], err.stack));
    }
  }


// ----------------------------------------------------------------------------------------
export const summary_search = async (req, res, next) => {
    const id = req.query.id;
    
    try {
      const querySpec = {
        query: `SELECT * FROM c WHERE c.id = "${id}"`
      };
      const dbconnect = await connect(Groot_DB, blogs);
      try {
        const { resources } = await dbconnect.container.items.query(querySpec).fetchAll();
        res.send(resources);
      } catch (err) {
        // Catching and re-throwing the error with additional details
        throw new Error(`Error in summary_search API: ${err.message}`);
      }
    } catch (err) {
      // The error caught here will now include which API call failed
      next(new ApiError(500, "Internal Server Error in summary_search", [], err.stack));
    }
  }
