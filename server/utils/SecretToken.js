import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
 
const createSecretToken = (id,role) =>{
    return jwt.sign({id,role},process.env.SECRET_KEY,{
        expiresIn : 24*60*60
    });
}

const forgetPasswordToken = (id) =>{
    return jwt.sign({id}, process.env.SECRET_KEY,{
        expiresIn:"10m"
    })
}

export  {createSecretToken, forgetPasswordToken};