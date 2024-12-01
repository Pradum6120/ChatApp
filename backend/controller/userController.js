import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {generateToken} from "../jwt/jsonWebToken.js";

const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = await generateToken(newUser._id);

    if (newUser) {
      return res.status(200).json({
        message: "User created successfully",
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
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const user = await User.findOne({ email });
    const comparepassword = await bcrypt.compare(password, user.password);

    if (!user || !comparepassword) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const token = await generateToken(user._id)
    return res.status(200).json({
        message: "login successfully",
        token 
    })
  } catch (error) {
    return res.status().json({
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
