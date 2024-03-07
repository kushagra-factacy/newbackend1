import ApiError from "../error/api.error.js";
import { connect } from "../database.js";
import { heimdall,aicite_user } from "../constant.js";


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
        const dbconnect = await connect(heimdall,aicite_user);
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