import ApiError from "../error/api.error.js";

import { connect } from "../database.js";

import { cdb, aicite_ic } from "../constant.js";
import { application } from "express";

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

    const dbconnect = await connect(cdb, aicite_ic);
    const { resources } = await dbconnect.container.items
      .query(querySpec)
      .fetchAll();
    res.send(resources);
  } catch (err) {
    next(new ApiError(500, "Internal Server Error", [], err.stack));
  }
};

export const deal = async ( req , res )=> {
  try{  


    

  }catch (err){
    req.send("Erro")
  }
}