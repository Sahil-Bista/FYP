import bcrypt from "bcrypt";
import UserModel from "../model/User.js";
import createSecretToken from "../utils/SecretToken.js";

const saltRounds = 10;

const signup = async (req, res) => {
  try {
    console.log(req.body);
    let { name, email, password, role } = req.body;
    const regexUserEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!regexUserEmail.test(email)) {
      console.log("invalid email");
      return res
        .status(401)
        .json({ msg: "User email domain must be @gmail.com" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ msg: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await UserModel.create({
      name: `${name}`,
      email: `${email}`,
      password: `${hashedPassword}`,
      role: `${role}`,
    });
    res.status(201).json({ msg: "User signed in successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: " Incorrect email or password " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect email or password" });
    }
    const token = createSecretToken({ userId: user._id, userRole: user.role });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({
        msg: "User logged in successfully",
        data: "Success",
        userId: user._id,
        userRole: user.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const logout = async(req,res)=>{
  try{
    res.clearCookie("token",{
      httpOnly:false,
      secure : true,
      sameSite:"None",
    });
    res.status(200).json({msg:"User logged out successfully"});

  }catch(error){
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      _id: { $ne: new Types.ObjectId(req.userId) },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
export { login, signup, getAllUsers, getSpecificUser, logout };
