import { connect } from "../database.js";
import ApiError from "../error/api.error.js";
import { CDB , investor_list,investor_user } from "../constant.js";
import { query } from "express";
import bcrypt from 'bcrypt'
const saltRounds = 8;
import { options } from "../index.js";
import jwt from 'jsonwebtoken'

export const inv_signup = async(req, res,next) => {
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
export const inv_login = async (req, res, next) => {
    const { email, password,id } = req.body;
    console.log(req.body);
    try {
        const querySpec = {
            query: "SELECT c.id,c.email ,c.hashedpass from c where c.email = @email",
            parameters: [{
                name: "@email",
                value: email
            }],
        };
        console.log(querySpec);
        const dbconnect = await connect(CDB, investor_user);
        const { resources: existingUsers } = await dbconnect.container.items
            .query(querySpec)
            .fetchAll();
        console.log(existingUsers);
        if (existingUsers.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const user = existingUsers[0];
        const match = await bcrypt.compare(password, user.hashedpass);
        if (!match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        jwt.sign({ user }, options.key, { algorithm: 'ES256', expiresIn: '1h' }, (err, token) => {
            if (err) {
                next(new ApiError(500, "Internal Server Error", [], err.stack));
            } else {
                res.send({ token } );
            }
        });
    } catch (err) {
        next(new ApiError(500, "Internal Server Error", [], err.stack));
    }
};
