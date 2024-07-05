import axios from "axios"
import ApiError from "../error/api.error.js";

export const hellosolr = async(req,res,next)=>{
    try{
        
        console.log("hello")
        res.send("hello")
        
    }
    catch(err) {
        next(new ApiError(500, "Internal Server Error", [], err.stack));

}
}


export const grootsearch = async(req,res,next)=>{
    try {
        var alias ;
        var name =  alias =`"${(req.query.input)}"`;
        // console.log(alias);
        // name = `"${name}"`
        // var alias=`${name}`
        

        axios.get(`http://74.249.50.68:8983/solr/grootcore/select?q=ALIAS:${alias} OR NAME:${name}`).then((response)=> {
        
        console.log(response.data);
        res.send(response.data.response.docs)

        })

    }
    catch(err) {
        next(new ApiError(500, "Internal Server Error", [], err.stack));

    }
}
// -------------------------------------------------------------------------

export const factacy_patent = async(req,res,next)=>{
    try {
        var name = `"${(req.query.name)}"`;
        axios.get(`http://74.249.50.68:8983/solr/alpha/select?q=Factacy_Patent_IC:${name}`).then((response)=> {
        res.send(response.data.response.docs)
        })

    }
    catch(err) {
        next(new ApiError(500, "Internal Server Error", [], err.stack));

    }
}