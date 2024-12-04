import bcrypt from "bcrypt";
import UserModel from '../model/User.js'
import  createSecretToken  from '../utils/SecretToken.js';
// import {body} from 'express-validator';
const saltRounds = 10;

const signup = async (req,res,next)=>{
    try{
        let {name,email,password} = req.body;

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
          return res.status(400).json({msg : 'Email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = await UserModel.create({
          name : `${name}`,
          email : `${email}`,
          password : `${hashedPassword}`
        });
        res.status(201).json({message : "User signed in successfully", user})
    }catch(error){
        res.json(error);
    }
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.json({ message:" Incorrect email or password " });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.json({ message: "The password is invalid" });
      }

      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({ message: "User logged in successfully", data: "Success", userId: user._id });  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

 export {login , signup}