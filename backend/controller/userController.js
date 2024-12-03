import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {generateToken} from "../jwt/jsonWebToken.js";

const signup = async (req, res) => {
  const { fullname, username, email, password, profilePhoto, gender} = req.body;

  try {
      const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        sucess: false,
        error: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // profilepicture

     const male = `https://avatar.iran.liara.run/public/boy?username=${username}`
     const female = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      profilePhoto : gender === "male" ? male : female,
      gender
    });

    await newUser.save();

    const token = await generateToken(newUser._id);

    if (newUser) {
      return res.status(200).json({
        message: "User created successfully",
        success: true,
        user: {
          fullname,
          email,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "email and password required" });
    }

    const user = await User.findOne({ email });
    const comparepassword = await bcrypt.compare(password, user.password);

    if (!user || !comparepassword) {
      return res.status(400).json({ 
        success : false,
        error: "invalid email or password" });
    }

    const token = await generateToken(user._id)
    return res.status(200).json({
        message: "login successfully",
        success: true,
        token 
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
        message: "something went wrongg while login",
        error : error.message

    })
  }
};

const getAllUsers = async(req,res)=>{
    try{
      const user = await User.find({
        _id:{$ne: req.user }
      }).select("-password")
      return res.status(200).json({
             message: "all users",
             users : user
      })
    }
    catch(error){
       return  console.log("Error in allUsers Controller: " + error);
    }
}

export {signup, login , getAllUsers};
