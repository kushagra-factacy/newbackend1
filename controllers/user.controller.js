import ApiError from "../error/api.error.js";


export const isignup = async(req, res,next) => {
    // isignup logic here
    try{
        // res.send('isignup route')
        // console(req.body)
        res.send("hello");
        // const {  email, password } = req.body;
        // console.log(email, password);
        // res.send("User Registered", email, password);
    }
    catch(err){
        next(new ApiError(500, "Internal Server Error",[], err.stack)) ;
    }
    
};

export const tsignup = (req, res) => {
    // tsignup logic here
    res.send('tsignup route');
};

export const tlogin = (req, res) => {
    // tlogin logic here
    res.send('tlogin route');
};

export const ilogin = (req, res) => {
    // ilogin logic here
    res.send('ilogin route');
};