import { createSecretToken } from '../utils/SecretToken.js';
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
        const token = createSecretToken(user._id)
        res.cookie("token",token,{
          withCredentials : true,
          httpOnly : false,
        });
        res.status(201).json({message : "User signed in successfully", user})
        next();
    }catch(error){
        res.json(error);
    }
}

export default signup;